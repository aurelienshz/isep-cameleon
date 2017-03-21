package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Subject;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SubjectRepository extends CrudRepository<Subject, Long> {
    List<Subject> findAll();
}
