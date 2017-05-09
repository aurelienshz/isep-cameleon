package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.entity.FeatureCategory;
import com.cameleon.chameleon.data.entity.Subject;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    public Subject updateSubject(Long id, Subject subject) {
        Subject subjectToEdit = subjectRepository.findOne(id);
        subjectToEdit.setDescription(subject.getDescription());
        subjectToEdit.setName(subject.getName());
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

    public void setSubjectClient(Long subjectId, Long clientId) {
        Subject subject = subjectRepository.findOne(subjectId);
        User client = userRepository.findOne(clientId);
        subject.setClient(client);
        subjectRepository.save(subject);
    }
}
