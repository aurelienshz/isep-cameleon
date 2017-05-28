package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.DocumentUploadDTO;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.exception.StorageFileNotFoundException;
import com.cameleon.chameleon.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("/document")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

//    @PostMapping
//    @ResponseBody
//    public DocumentUploadDTO handleFileUpload(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal User user) {
//        return documentService.storeAndCreateDTO(file, user);
//    }
//
//    @GetMapping("/")
//    public String listUploadedFiles(Model model) throws IOException {
//        // TODO return list of files uploaded by this user
//        return null;
//    }

    @GetMapping("/download/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = documentService.loadAsResource(filename);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
