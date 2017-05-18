package com.cameleon.chameleon.data.entity;

import javax.persistence.*;
import java.util.List;

@Entity()
public class FeatureCategory {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @ManyToOne
    private Subject subject;

    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    private List<Feature> features;

    public void setId(Long id) {
        this.id = id;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }
}
