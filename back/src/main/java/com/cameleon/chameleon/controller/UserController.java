package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.configuration.security.PasswordEncrypter;
import com.cameleon.chameleon.data.dto.LoginFormDTO;
import com.cameleon.chameleon.data.dto.SuccessfulLoginDTO;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncrypter passwordEncrypter;

    @PostMapping("/login")
    public SuccessfulLoginDTO login(@RequestBody LoginFormDTO form, HttpServletResponse res) {
        String encryptedPassword = passwordEncrypter.encryptPassword(form.getPassword());
        User user = userRepository.findByUsernameAndPassword(form.getLogin(), encryptedPassword);

        if (user == null) {
            res.setStatus(400);
            return null;
        }

        UUID uuid = UUID.randomUUID();
        String token = uuid.toString();
        user.setToken(token);
        userRepository.save(user);

        return new SuccessfulLoginDTO(token);
    }
}
