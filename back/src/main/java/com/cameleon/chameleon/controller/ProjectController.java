package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.FeatureCategoryCreationDTO;
import com.cameleon.chameleon.data.dto.ProjectCreationDTO;
import com.cameleon.chameleon.data.entity.Feature;
import com.cameleon.chameleon.data.entity.FeatureCategory;
import com.cameleon.chameleon.data.entity.Project;

import com.cameleon.chameleon.exception.BusinessLogicException;

import com.cameleon.chameleon.data.entity.User;

import com.cameleon.chameleon.service.FeatureService;
import com.cameleon.chameleon.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_CLIENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_STUDENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@RestController
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private FeatureService featureService;


    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    @GetMapping("/my-project")
    @RolesAllowed(ROLE_STUDENT)
    public Project getMyProject(@AuthenticationPrincipal User user) {
        return projectService.getBelongingProject(user);
    }

    @PostMapping
    @RolesAllowed(ROLE_TEACHER)
    public Project createProject(@RequestBody ProjectCreationDTO projectCreationDTO) throws BusinessLogicException {
        return projectService.createProject(projectCreationDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }

    @PostMapping("/{id}/feature")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public List<FeatureCategory> getFeatures(@PathVariable Long id) {
        return projectService.getFeatureCategories(id);
    }

    @PostMapping("/{id}/feature-category")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public FeatureCategory createFeatureCategory(@PathVariable Long id, FeatureCategoryCreationDTO dto) {
        return projectService.addFeatureCategory(id, dto);
    }

    @PostMapping("/{id}/feature-category/{fcId}")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public FeatureCategory createFeatureCategory(FeatureCategoryCreationDTO dto, @PathVariable Long fcId) {
        return null;
    }

    @PostMapping("/{id}/feature-category/{fcId}/feature")
    public Feature createFeature() {
        return null; // TODO ADE
    }

    @PostMapping("/{id}/feature-category/{fcId}/feature/{featureId}")
    public Feature editFeature(@PathVariable Long featureId, @RequestBody FeatureDTO featureDto) {
        return featureService.editFeature(featureDto);

    }
}
