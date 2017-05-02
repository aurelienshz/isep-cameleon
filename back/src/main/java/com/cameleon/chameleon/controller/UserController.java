package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.configuration.security.PasswordEncrypter;
import com.cameleon.chameleon.data.dto.LoginFormDTO;
import com.cameleon.chameleon.data.dto.SuccessfulLoginDTO;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.UserRepository;
import com.cameleon.chameleon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @PostMapping("/login")
    public SuccessfulLoginDTO login(@RequestBody LoginFormDTO form, HttpServletResponse res) {
        User user = userService.authenticate(form.getLogin(), form.getPassword());
        if (user == null) {
            res.setStatus(400);
            return null; // TODO throw exception (here or in authenticate)
        }

        return new SuccessfulLoginDTO(user);
    }
}
