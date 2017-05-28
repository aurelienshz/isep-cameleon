package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.DocumentUploadDTO;
import com.cameleon.chameleon.data.entity.Document;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.DocumentRepository;
import com.cameleon.chameleon.exception.StorageException;
import com.cameleon.chameleon.exception.StorageFileNotFoundException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class DocumentService {
    private final Path rootLocation = Paths.get("chameleon-uploads");

    @Autowired
    private DocumentRepository documentRepository;

    @PostConstruct
    public void init() {
        if (Files.exists(rootLocation))
            return;

        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

    public DocumentUploadDTO storeAndCreateDTO(MultipartFile file, User owner) {
        Document document = store(file, owner);
        return createUploadDtoFromDocument(document);
    }

    public Document store(MultipartFile file, User owner) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
            }


            String extension = FilenameUtils.getExtension(file.getOriginalFilename());
            System.out.println(extension);

            String filename = generateRandomFilename(extension);
            Path savingPath = this.rootLocation.resolve(filename);

            // Super-solid future proofing against generating two identical UUIDs (and winning the lottery,
            // and seeing an unicorn on the same day)
            while (Files.exists(savingPath)) {
                filename = generateRandomFilename(extension);
                savingPath = this.rootLocation.resolve(filename);
            }

            Files.copy(file.getInputStream(), savingPath);

            Document document = new Document();
            document.setPath(filename);
            document.setUploadedBy(owner);

            documentRepository.save(document);

            return document;
        } catch (IOException e) {
            throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

    private String generateRandomFilename(String extension) {
        UUID uuid = UUID.randomUUID();
        return uuid.toString() + "." + extension;
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(path -> this.rootLocation.relativize(path));
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    private Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("Could not read file: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public DocumentUploadDTO createUploadDtoFromDocument(Document document) {
        DocumentUploadDTO dto = new DocumentUploadDTO();

        dto.setPath(document.getPath());
        dto.setDocumentId(document.getId());

        return dto;
    }
}
