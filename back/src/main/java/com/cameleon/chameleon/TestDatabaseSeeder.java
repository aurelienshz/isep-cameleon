package com.cameleon.chameleon;

import com.cameleon.chameleon.data.entity.Subject;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.RoleRepository;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestDatabaseSeeder {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public void seedDatabase() {
        if (isDatabaseSeeded()) {
            return;
        }
    }

    private boolean isDatabaseSeeded() {
        User user = userRepository.findOne(1L);
        // if it's found, the database is already seeded
        return user != null;
    }

    public void seedUsers() {
        List<User> users = new ArrayList<>();
        User user1 = new User("student", "Student", "STUDENT", "test", "student@yolo.ok", null);
    }
}
