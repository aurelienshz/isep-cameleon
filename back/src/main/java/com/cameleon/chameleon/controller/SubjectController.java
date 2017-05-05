package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.entity.Subject;
import com.cameleon.chameleon.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<Subject> getSubjectsList(@AuthenticationPrincipal Authentication user) {
        System.out.println(user);
        return subjectService.findAllSubjects();
    }

    @GetMapping("/{id}")
    public Subject getSubjectById(@PathVariable Long id) {
        return subjectService.getById(id);
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
}
