package com.cameleon.chameleon.service;

import com.cameleon.chameleon.configuration.security.PasswordEncrypter;
import com.cameleon.chameleon.constants.RolesNames;
import com.cameleon.chameleon.data.dto.LDAPUserDTO;
import com.cameleon.chameleon.data.entity.Role;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.RoleRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_CLIENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_STUDENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@Service
public class UserService {
    @Autowired
    private LDAPService ldapService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private Logger logger = LoggerFactory.getLogger(UserService.class);

    public User authenticate(String login, String password) {
        String encryptedPassword = PasswordEncrypter.encryptPassword(password);
        User user = userRepository.findByUsernameAndPassword(login, encryptedPassword);

        if (user == null) {
            return null;
        }

        UUID uuid = UUID.randomUUID();
        String token = uuid.toString();
        user.setToken(token);
        userRepository.save(user);

        return user;
    }

    public User authenticateLDAPUser(String login, String password) {
        logger.info("Trying to authenticate user {} from LDAP", login);

        User user = userRepository.findByUsername(login);

        LDAPUserDTO ldapUserDTO = ldapService.retrieveUser(login, password);

        if (user != null) {
            if (! user.getPassword().equals("LDAP")) {
                logger.info("This user {} already has an external account in the database", login);
                return null;
            }


            if (ldapUserDTO == null) {
                logger.info("Invalid credentials : user {} not retrieved from LDAP", login);
                return null;
            }

            // Refresh user with data fetched from the LDAP :
            user = refreshUserFromLdapDTO(user, ldapUserDTO);
        } else {
            // Register a new user :
            user = createFromLdapDto(ldapUserDTO);
        }


        UUID uuid = UUID.randomUUID();
        String token = uuid.toString();
        user.setToken(token);
        userRepository.save(user);

        return user;
    }

    public List<User> findAllClients() {
        Role role = roleRepository.findByAuthority(ROLE_CLIENT);
        return userRepository.findByRolesContains(role);
    }

    private User createFromLdapDto(LDAPUserDTO ldapUserDTO) {
        User user = new User();
        return refreshUserFromLdapDTO(user, ldapUserDTO);
    }

    private User refreshUserFromLdapDTO(User user, LDAPUserDTO ldapUserDTO) {
        user.setPassword("LDAP");
        user.setFirstName(ldapUserDTO.getFirstName());
        user.setLastName(ldapUserDTO.getLastName());
        user.setLastName(ldapUserDTO.getLastName());
        user.setMail(ldapUserDTO.getMail());
        user.setUsername(ldapUserDTO.getLogin());
        user.setIsepNumber(ldapUserDTO.getEmployeeNumber());

        Role roleTeacher = new Role(ROLE_TEACHER);
        Role roleStudent = new Role(ROLE_STUDENT);
        List<Role> lRoleTeacher = new ArrayList<>(Collections.singleton(roleTeacher));
        List<Role> lRoleStudent = new ArrayList<>(Collections.singleton(roleStudent));

        switch (ldapUserDTO.getEmployeeType()) {
            case "prof":
                roleRepository.save(lRoleTeacher);
                user.setRoles(lRoleTeacher);
                break;
            case "eleve":
                roleRepository.save(lRoleStudent);
                user.setRoles(lRoleStudent);
                break;
        }

        return user;
    }
}
