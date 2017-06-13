package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.FeatureCategoryDTO;
import com.cameleon.chameleon.data.dto.FeatureDTO;
import com.cameleon.chameleon.data.entity.Feature;
import com.cameleon.chameleon.data.entity.FeatureCategory;
import com.cameleon.chameleon.data.entity.Subject;
import com.cameleon.chameleon.service.FeatureService;
import com.cameleon.chameleon.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_CLIENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@RestController
@RequestMapping("/subject")
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @Autowired
    private FeatureService featureService;

    @GetMapping
    public List<Subject> getSubjectsList(@AuthenticationPrincipal Authentication user) {
        return subjectService.findAllSubjects();
    }

    @GetMapping("/{id}")
    public Subject getSubjectById(@PathVariable Long id) {
        return subjectService.findSubject(id);
    }

    @PostMapping
    @RolesAllowed(ROLE_TEACHER)
    public Subject createSubject(@RequestBody Subject subject) {
        return subjectService.createSubject(subject);
    }

    @PostMapping("/{id}")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public Subject editSubject(@PathVariable Long id, @RequestBody Subject subject) {
        return subjectService.updateSubject(id, subject);
    }

    @DeleteMapping("/{id}")
    @RolesAllowed(ROLE_TEACHER)
    public void deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubjectById(id);
    }

    @PostMapping("/{id}/client/{clientId}")
    @RolesAllowed(ROLE_TEACHER)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void setClient(@PathVariable Long id, @PathVariable Long clientId) {
        subjectService.setSubjectClient(id, clientId);
    }

    @GetMapping("/{id}/feature")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public List<FeatureCategory> getFeatures(@PathVariable Long id) {
        // We return the feature categories, and they will come with the nested features serialized inside,
        // hence this endpoint's name (but it gives categories AND features in a single hit)
        return subjectService.getFeatureCategories(id);
    }

    @PostMapping("/{subjectId}/feature")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public Feature createFeature(@PathVariable Long subjectId, @RequestBody FeatureDTO featureDTO) {
        return featureService.createFeature(subjectId, featureDTO);
    }

    @PostMapping("/{subjectId}/feature/{featureId}")
    public Feature editFeature(@PathVariable Long subjectId, @PathVariable Long featureId, @RequestBody FeatureDTO featureDto) {
        return featureService.editFeature(subjectId, featureId, featureDto);
    }

    @DeleteMapping("/{subjectId}/feature/{featureId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFeature(@PathVariable Long subjectId, @PathVariable Long featureId) {
        featureService.deleteFeature(subjectId, featureId);
    }

    @PostMapping("/{subjectId}/feature-category")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public FeatureCategory createFeatureCategory(@PathVariable Long subjectId, @RequestBody FeatureCategoryDTO dto) {
        return featureService.createFeatureCategory(subjectId, dto);
    }

    @PostMapping("/{subjectId}/feature-category/{fcId}")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public FeatureCategory editFeatureCategory(@PathVariable Long subjectId, @PathVariable Long fcId, @RequestBody FeatureCategoryDTO dto) {
        return featureService.editFeatureCategory(subjectId, fcId, dto);
    }

    @DeleteMapping("/{subjectId}/feature-category/{fcId}")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFeatureCategory(@PathVariable Long subjectId, @PathVariable Long fcId) {
        featureService.deleteFeatureCategory(subjectId, fcId);


    }






}
