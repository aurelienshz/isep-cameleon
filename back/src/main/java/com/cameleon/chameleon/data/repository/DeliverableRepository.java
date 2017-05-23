package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Deliverable;
import com.cameleon.chameleon.data.entity.Meeting;
import org.springframework.data.repository.CrudRepository;

public interface DeliverableRepository extends CrudRepository<Deliverable, Long> {
}
