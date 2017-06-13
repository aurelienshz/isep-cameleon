package com.cameleon.chameleon.data.entity;


import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Message {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private User sender;

    private String message;

    @CreationTimestamp
    private Timestamp sentAt;


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Long getId() {
        return id;
    }

    public Timestamp getSentAt() {
        return sentAt;
    }
}
