package com.cameleon.chameleon.service;

import com.cameleon.chameleon.constants.PromotionStatus;
import com.cameleon.chameleon.data.entity.Promotion;
import com.cameleon.chameleon.data.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    public Promotion findCurrentPromotion() {
        return promotionRepository.findOne(1L);
    }

    public Promotion startProjects() {
        // TODO check business logic allows starting projects (all teams validated etc...)
        Promotion promotion = promotionRepository.findOne(1L);
        promotion.setStatus(PromotionStatus.PROJECTS_STARTED);
        promotionRepository.save(promotion);
        return promotion;
    }

    public Promotion endProjects() {
        Promotion promotion = promotionRepository.findOne(1L);
        promotion.setStatus(PromotionStatus.SESSION_ENDED);
        promotionRepository.save(promotion);
        return promotion;
    }
}
