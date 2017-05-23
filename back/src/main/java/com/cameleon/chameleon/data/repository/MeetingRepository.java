package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Meeting;
import com.cameleon.chameleon.data.entity.Project;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MeetingRepository extends CrudRepository<Meeting, Long> {
    List<Meeting> findByProject(Project project);
}
