package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.ProjectCreationDTO;
import com.cameleon.chameleon.data.entity.*;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import com.cameleon.chameleon.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TeamService teamService;
    @Autowired
    private SubjectRepository subjectRepository;

    public Project findProject(Long id) {
        return projectRepository.findOne(id);
    }

    public Project createProject(ProjectCreationDTO projectCreationDTO) {
        Project project = createProjectFromDTO(projectCreationDTO);
        return projectRepository.save(project);
    }

    public Project createProjectFromDTO(ProjectCreationDTO projectCreationDTO) {
        // Find the team and subject :
        Team team = teamService.findTeam(projectCreationDTO.getTeamId());

        if (team.getProject() != null) {
            throw new BusinessLogicException("This team is already linked to a project");
        }

        Subject subject = subjectRepository.findOne(projectCreationDTO.getSubjectId());

        // Hydrate a new project :
        Project project = new Project();
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

    public Project getBelongingProject(User user) {
        Team team = teamService.findBelongingTeam(user);
        System.out.println(team);
        if (team == null) return null;
        return team.getProject();
    }
}
