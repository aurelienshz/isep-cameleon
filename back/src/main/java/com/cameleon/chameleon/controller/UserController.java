package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.LoginFormDTO;
import com.cameleon.chameleon.data.dto.SuccessfulLoginDTO;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletResponse;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
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

    @GetMapping("/me")
    public User getMe(@AuthenticationPrincipal User p) {
        return p;
    }

    public void logout() {
        // TODO
    }

    /**
     * Demo of how to secure an endpoint to a specific role :
     */
    @GetMapping("/teachers-only")
    @RolesAllowed(ROLE_TEACHER)
    public String teacherOnly() {
        return "This endpoint is reserved to the teachers";
    }
}
