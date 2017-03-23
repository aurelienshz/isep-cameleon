package com.cameleon.chameleon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {
    @Autowired
    private Environment env;

    @GetMapping("/home")
    @ResponseBody
    public String homeController() {
        return "<h1>Chameleon web service !</h1>" +
                "<h2>Now with automatic deployment !</h2>" +
                "<p>CORS allowed origin : <tt>" + env.getProperty("cors.allowed_origin") + "</tt></p>";
    }
}
