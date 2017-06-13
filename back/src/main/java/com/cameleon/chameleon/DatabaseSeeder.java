package com.cameleon.chameleon;

import com.cameleon.chameleon.configuration.security.PasswordEncrypter;
import com.cameleon.chameleon.constants.PromotionStatus;
import com.cameleon.chameleon.data.dto.FeatureDTO;
import com.cameleon.chameleon.data.entity.*;
import com.cameleon.chameleon.data.repository.*;
import com.cameleon.chameleon.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
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

    @Autowired
    private FeatureCategoryRepository featureCategoryRepository;

    @Autowired
    private FeatureService featureService;

    @Autowired
    private FeatureRepository featureRepository;

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
        User tim = new User("thoudoyer", "Timothée", "Houdoyer", "test", null, lRoleStudent);
//        User aurel = new User("aschiltz", "Aurélien", "SCHILTZ", "test", null, lRoleStudent);
        User victor = new User("vely", "Victor", "ELY", "test", null, lRoleStudent);

        PasswordEncrypter.encryptPassword(student, teacher, client);
        PasswordEncrypter.encryptPassword(zakia, sacha, yvan, tim, victor);

        List<User> users = new ArrayList<>(Arrays.asList(student, teacher, client, zakia, sacha, yvan, tim, victor));
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

        // 4/ Seed feature & feature categories :

        FeatureCategory fc1 = new FeatureCategory();
        fc1.setName("Front-end");

        FeatureCategory fc2 = new FeatureCategory();
        fc2.setName("Back-end");

        s1.addFeatureCategory(fc1);
        s1.addFeatureCategory(fc2);

        featureCategoryRepository.save(fc1);
        featureCategoryRepository.save(fc2);

        List<FeatureCategory> fclist = new ArrayList<>(Arrays.asList(fc1, fc2));
        s1.setFeatureCategories(fclist);
        subjectRepository.save(s1);

        Feature f11 = new Feature("Interface de gestion du swag", fc1, 0);
        Feature f12 = new Feature("Interface des suivi des chatons", fc1, 1);
        Feature f13 = new Feature("Interface de reporting de la productivité des esclaves", fc1, 2);
        Feature f21 = new Feature("Script de création de données de test", fc2, 0);
        Feature f22 = new Feature("CRUD sur les chatons", fc2, 1);

        ArrayList<Feature> f1 = new ArrayList<>(Arrays.asList(f11, f12, f13));
        ArrayList<Feature> f2 = new ArrayList<>(Arrays.asList(f21, f22));
        f1.forEach(fc1::addFeature);
        featureRepository.save(f1);
        featureCategoryRepository.save(fc1);
        f2.forEach(fc2::addFeature);
        featureRepository.save(f2);
        featureCategoryRepository.save(fc2);
    }
}

