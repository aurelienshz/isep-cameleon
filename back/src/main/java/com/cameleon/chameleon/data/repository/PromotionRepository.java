package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Promotion;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PromotionRepository extends CrudRepository<Promotion, Long> {
    List<Promotion> findAll();

    Promotion findOne(Long id);
}
