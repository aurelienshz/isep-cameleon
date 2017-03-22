package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();

    User findOne(Long id);
}
