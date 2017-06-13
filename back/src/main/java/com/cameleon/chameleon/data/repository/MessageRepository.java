package com.cameleon.chameleon.data.repository;


import com.cameleon.chameleon.data.entity.Message;
import org.springframework.data.repository.CrudRepository;



public interface MessageRepository extends CrudRepository<Message, Long> {
    Message findOne(long id);
}

