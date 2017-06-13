package com.cameleon.chameleon.data.entity;


import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@Entity
public class Message {

    @Id
    @GeneratedValue
    private  long id;

    private User user;

    private String message;

    @ManyToOne
    private Project project;

    @CreationTimestamp
    private Timestamp uploadedAt;


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public long getId() {
        return id;
    }

    public Timestamp getUploadedAt() {
        return uploadedAt;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }


}
