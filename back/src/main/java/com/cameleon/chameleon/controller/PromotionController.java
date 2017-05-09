package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.entity.Promotion;
import com.cameleon.chameleon.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@RestController
@RequestMapping("/promotion")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping("/current-status")
    public Promotion getCurrentSessionStatus() {
        return promotionService.findCurrentPromotion();
    }

    @PostMapping("start-projects")
    @RolesAllowed(ROLE_TEACHER)
    public Promotion startProjects() {
        return promotionService.startProjects();
    }

    @PostMapping("end-projects")
    @RolesAllowed(ROLE_TEACHER)
    public Promotion endProjects() {
        return promotionService.endProjects();
    }
}
