package com.cameleon.chameleon.service;

import com.cameleon.chameleon.configuration.security.PasswordEncrypter;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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
}
