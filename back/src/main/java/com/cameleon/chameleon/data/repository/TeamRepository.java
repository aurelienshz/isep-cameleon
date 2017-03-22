package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Team;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TeamRepository extends CrudRepository<Team, Long> {
    List<Team> findAll();

    Team findOne(Long id);
}
