package com.cameleon.chameleon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    @GetMapping("/home")
    @ResponseBody
    public String homeController() {
        return "<h1>Chameleon web service !</h1><h2>Now with automatic deployment !</h2>";
    }
}
