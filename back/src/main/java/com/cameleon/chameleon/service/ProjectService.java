package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.FeatureCategoryCreationDTO;
import com.cameleon.chameleon.data.dto.ProjectCreationDTO;
import com.cameleon.chameleon.data.entity.*;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import com.cameleon.chameleon.data.repository.TeamRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import com.cameleon.chameleon.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private TeamService teamService;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private FeatureService featureService;

    public Project getProject(Long id) {
        return projectRepository.findOne(id);
    }

    public Project createProject(ProjectCreationDTO projectCreationDTO) throws BusinessLogicException {
        Project project = createProjectFromDTO(projectCreationDTO);
        return projectRepository.save(project);
    }

    public Project createProjectFromDTO(ProjectCreationDTO projectCreationDTO) throws BusinessLogicException {
        // Find the team and subject :
        Team team = teamRepository.findOne(projectCreationDTO.getTeamId());

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

    public List<FeatureCategory> getFeatureCategories(Long id) {
        Project project = projectRepository.findOne(id);
        return project.getFeatureCategories();
    }

    public void deleteProject(Long id) {
        projectRepository.delete(id);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public FeatureCategory addFeatureCategory(Long id, FeatureCategoryCreationDTO dto) {
        return null; // TODO ADE
    }

    public Project getBelongingProject(User user) {
        Team team = teamService.findBelongingTeam(user);
        return team.getProject();
    }
}
