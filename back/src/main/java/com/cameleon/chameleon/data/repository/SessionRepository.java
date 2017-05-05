package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Promotion;
import org.springframework.data.repository.CrudRepository;

public interface SessionRepository extends CrudRepository<Promotion, Long> {
    @Override
    Promotion findOne(Long aLong);

    @Override
    Iterable<Promotion> findAll();


}
