package com.cameleon.chameleon;

import com.cameleon.chameleon.data.entity.Subject;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestDatabaseSeeder {
    @Autowired
    SubjectRepository subjectRepository;

    public void qsdf() {
        Subject subject = new Subject();
        subject.setName("Yolo");
        subject.setDescription("Swag");
        subjectRepository.save(subject);
    }
}
