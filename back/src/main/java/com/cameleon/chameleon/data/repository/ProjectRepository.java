package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Project;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectRepository extends CrudRepository<Project, Long> {
    List<Project> findAll();

    Project findOne(Long id);
}
