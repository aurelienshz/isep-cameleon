package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.constants.PromotionStatus;
import com.cameleon.chameleon.data.entity.Promotion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/promotion")
public class PromotionController {
    @GetMapping("/current-status")
    public Promotion getCurrentSessionStatus() {
        Promotion promotion = new Promotion();
        promotion.setStatus(PromotionStatus.BUILDING_SESSION);
        return promotion;
    }
}
