package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Meeting;
import org.springframework.data.repository.CrudRepository;

public interface MeetingRepository extends CrudRepository<Meeting, Long> {
}
