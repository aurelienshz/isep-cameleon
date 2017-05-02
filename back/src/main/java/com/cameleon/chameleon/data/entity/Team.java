package com.cameleon.chameleon.data.entity;

import org.hibernate.annotations.*;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.List;

@Entity()
public class Team {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private boolean validatedByTeacher;

    @OneToMany
    private List<User> members;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public boolean isValidatedByTeacher() {
        return validatedByTeacher;
    }

    public void setValidatedByTeacher(boolean validatedByTeacher) {
        this.validatedByTeacher = validatedByTeacher;
    }
}
