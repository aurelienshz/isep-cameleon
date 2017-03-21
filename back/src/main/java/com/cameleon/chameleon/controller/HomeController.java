package com.cameleon.chameleon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class HomeController {

    @RequestMapping(value="/home", method = RequestMethod.GET)
    @ResponseBody
    public String homeController() {
        return "<h1>Chameleon web service !</h1>";
    }
}
