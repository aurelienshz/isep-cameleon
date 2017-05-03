package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.ProjectCreationDTO;
import com.cameleon.chameleon.data.entity.Project;

import com.cameleon.chameleon.exception.BusinessLogicException;

import com.cameleon.chameleon.data.entity.User;

import com.cameleon.chameleon.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@RestController
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.getProject(id);
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

}
