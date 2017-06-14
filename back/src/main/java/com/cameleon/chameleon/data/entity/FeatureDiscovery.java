package com.cameleon.chameleon.data.entity;

import javax.persistence.*;

@Entity
public class FeatureDiscovery {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Feature feature;

    @OneToOne
    private Meeting meetingDiscovered;

    @ManyToOne
    private Project project;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Feature getFeature() {
        return feature;
    }

    public void setFeature(Feature feature) {
        this.feature = feature;
    }

    public Meeting getMeetingDiscovered() {
        return meetingDiscovered;
    }

    public void setMeetingDiscovered(Meeting meetingDiscovered) {
        this.meetingDiscovered = meetingDiscovered;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
