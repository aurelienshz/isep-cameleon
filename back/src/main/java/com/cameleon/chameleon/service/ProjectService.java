package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.ProjectCreationDTO;
import com.cameleon.chameleon.data.entity.*;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import com.cameleon.chameleon.data.repository.TeamRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private UserRepository userRepository;

    public Project getProject(Long id) {
        return projectRepository.findOne(id);
    }

    public Project createProject(ProjectCreationDTO projectCreationDTO) {
        Project project = createProjectFromDTO(projectCreationDTO);
        return projectRepository.save(project);
    }

    public Project createProjectFromDTO(ProjectCreationDTO projectCreationDTO) {
        // Find the team and subject :
        Team team = teamRepository.findOne(projectCreationDTO.getTeamId());
        Subject subject = subjectRepository.findOne(projectCreationDTO.getTeamId());

        // Find clients list :
        Iterable<User> clients = userRepository.findAll(projectCreationDTO.getClientsIds());
        // Iterable to List :
        List<User> clientsList = new ArrayList<>();
        clients.forEach(clientsList::add);

        // Hydrate a new project :
        Project project = new Project();
        project.setClients(clientsList);
        project.setSubject(subject);
        project.setTeam(team);

        return project;
    }

    public void deleteProject(Long id) {
        projectRepository.delete(id);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
