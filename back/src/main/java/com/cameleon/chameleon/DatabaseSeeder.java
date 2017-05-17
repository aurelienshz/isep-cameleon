package com.cameleon.chameleon;

import com.cameleon.chameleon.configuration.security.PasswordEncrypter;
import com.cameleon.chameleon.constants.PromotionStatus;
import com.cameleon.chameleon.data.entity.Promotion;
import com.cameleon.chameleon.data.entity.Role;
import com.cameleon.chameleon.data.entity.Subject;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.PromotionRepository;
import com.cameleon.chameleon.data.repository.RoleRepository;
import com.cameleon.chameleon.data.repository.SubjectRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_CLIENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_STUDENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@Service
public class DatabaseSeeder {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public void seedDatabase() {
        if (isDatabaseSeeded()) {
            System.out.println("Database is already seeded. Exiting seeder.");
            return;
        }

        runSeedDatabase();

        System.out.println("Database successfully initialized ! Exiting seeder \uD83D\uDC4D");
    }

    private boolean isDatabaseSeeded() {
        User user = userRepository.findOne(1L);
        // if it's found, the database is already seeded
        return user != null;
    }

    private void runSeedDatabase() {
        //  1/ Seed Users and Roles :

        // Individual roles :
        Role roleTeacher = new Role(ROLE_TEACHER);
        Role roleClient = new Role(ROLE_CLIENT);
        Role roleStudent = new Role(ROLE_STUDENT);

        // Single-element lists for the users constructor calls :
        List<Role> lRoleClient = new ArrayList<>(Collections.singleton(roleClient));
        List<Role> lRoleTeacher = new ArrayList<>(Collections.singleton(roleTeacher));
        List<Role> lRoleStudent = new ArrayList<>(Collections.singleton(roleStudent));

        List<Role> clientAndTeacher = new ArrayList<>(Arrays.asList(roleClient, roleTeacher));

        User student = new User("student", "Student", "STUDENT", "test", "student@yolo.ok", lRoleStudent);
        User teacher = new User("teacher", "Teacher", "TEACHER", "test", "teacher@yolo.ok", lRoleTeacher);
        User client = new User("client", "Client", "CLIENT", "test", "client@yolo.ok", lRoleClient);

        User zakia = new User("zkazi", "Zakia", "KAZI-AOUL", "test", "__zkazi@isep.fr", clientAndTeacher);

        User sacha = new User("smettoudi", "Sacha", "METTOUDI", "test", null, lRoleStudent);
        User yvan = new User("ybezard", "Yvan", "BEZARD", "test", null, lRoleStudent);
        User tim = new User("thoudoyer", "Timothé", "Houdoyer", "test", null, lRoleStudent);
        User aurel = new User("aschiltz", "Aurélien", "SCHILTZ", "test", null, lRoleStudent);
        User victor = new User("vely", "Victor", "ELY", "test", null, lRoleStudent);

        PasswordEncrypter.encryptPassword(student, teacher, client);
        PasswordEncrypter.encryptPassword(zakia, sacha, yvan, tim, aurel, victor);

        List<User> users = new ArrayList<>(Arrays.asList(student, teacher, client, zakia, sacha, yvan, tim, aurel, victor));
        List<Role> roles = new ArrayList<>(Arrays.asList(roleClient, roleTeacher, roleStudent));

        roleRepository.save(roles);
        userRepository.save(users);

        // 2/ Seed Promotion (pretty useless for now but we will have to link everything to it sooner or later)

        Promotion promotion = new Promotion();
        promotion.setStatus(PromotionStatus.BUILDING_SESSION);
        promotionRepository.save(promotion);


        // 3/ Seed subjects :

        Subject s1 = new Subject("Gestion de projets de génie logiciel", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, laborum quasi quo quod repudiandae similique voluptas? Adipisci at eius excepturi illum iusto minus natus perspiciatis provident qui quia, sint tenetur.");
        Subject s2 = new Subject("Grille d'évaluation des APP", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, laborum quasi quo quod repudiandae similique voluptas? Adipisci at eius excepturi illum iusto minus natus perspiciatis provident qui quia, sint tenetur.");
        Subject s3 = new Subject("Machine à transformer les chatons en pâté", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, laborum quasi quo quod repudiandae similique voluptas? Adipisci at eius excepturi illum iusto minus natus perspiciatis provident qui quia, sint tenetur.");

        ArrayList<Subject> subjects = new ArrayList<>(Arrays.asList(s1, s2, s3));
        subjectRepository.save(subjects);
    }
}
