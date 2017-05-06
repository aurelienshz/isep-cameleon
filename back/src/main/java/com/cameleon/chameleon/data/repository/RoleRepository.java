package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByAuthority(String authority);
}
