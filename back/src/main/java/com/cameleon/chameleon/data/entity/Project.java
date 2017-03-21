package com.cameleon.chameleon.data.entity;

import javax.persistence.*;
import java.util.List;

@Entity()
public class Project {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Subject subject;

    @OneToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToMany
    private List<User> clients;

    @OneToMany
    private List<FeatureCategory> featureCategories;

    @OneToMany
    private List<Deliverable> deliverables;

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public List<User> getClients() {
        return clients;
    }

    public void setClients(List<User> clients) {
        this.clients = clients;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Deliverable> getDeliverables() {
        return deliverables;
    }

    public void setDeliverables(List<Deliverable> deliverables) {
        this.deliverables = deliverables;
    }

    public List<FeatureCategory> getFeatureCategories() {
        return featureCategories;
    }

    public void setFeatureCategories(List<FeatureCategory> featureCategories) {
        this.featureCategories = featureCategories;
    }
}
