package com.cameleon.chameleon.service;

import com.cameleon.chameleon.configuration.security.PasswordEncrypter;
import com.cameleon.chameleon.constants.RolesNames;
import com.cameleon.chameleon.data.entity.Role;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.RoleRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_CLIENT;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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

    public List<User> findAllClients() {
        Role role = roleRepository.findByAuthority(ROLE_CLIENT);
        return userRepository.findByRolesContains(role);
    }
}
