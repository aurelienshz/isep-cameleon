package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.entity.Subject;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public Subject updateSubject(Long id, Subject subject) {
        Subject subjectToEdit = subjectRepository.findOne(id);
        subjectToEdit.setDescription(subject.getDescription());
        subjectToEdit.setName(subject.getName());
        subjectToEdit.setNumber(subject.getNumber());
        return subjectRepository.save(subjectToEdit);
    }

    public List<Subject> findAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getById(Long id) {
        return subjectRepository.findOne(id);
    }

    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public void deleteSubjectById(Long id) {
        subjectRepository.delete(id);
    }
}
