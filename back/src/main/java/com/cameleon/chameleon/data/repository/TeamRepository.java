package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Team;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamRepository extends CrudRepository<Team, Long> {
    List<Team> findAll();

    Team findOne(Long id);

    @Query("Select t from Team t join fetch t.members m where m.id = :memberId")
    Team findByMemberId(@Param("memberId") Long memberId);
}
