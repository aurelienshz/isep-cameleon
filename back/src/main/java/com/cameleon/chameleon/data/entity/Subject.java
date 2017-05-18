package com.cameleon.chameleon.data.entity;

import javax.persistence.*;
import java.util.List;

@Entity()
public class Subject {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String description;

    @OneToMany
    private List<FeatureCategory> featureCategories;

    @OneToOne
    private User client;

    public Subject() {}

    public Subject(String name, String description) {
        this.name = name;
        this.description = description;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public List<FeatureCategory> getFeatureCategories() {
        return featureCategories;
    }

    public void setFeatureCategories(List<FeatureCategory> featureCategories) {
        this.featureCategories = featureCategories;
    }
}
