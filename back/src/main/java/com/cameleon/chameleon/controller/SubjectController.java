package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.entity.Subject;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(name="/subject")
public class SubjectController {
    @Autowired
    private SubjectRepository subjectsRepository;

    @RequestMapping(name="/", method = RequestMethod.GET)
    public List<Subject> getSubjectsList() {
        return subjectsRepository.findAll();
    }
}
