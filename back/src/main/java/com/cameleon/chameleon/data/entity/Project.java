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

    // For now, only subjects contain features :
    // @OneToMany
    // private List<FeatureCategory> featureCategories;

    @OneToMany
    private List<Deliverable> deliverables;

    @OneToMany
    private List<Meeting> meetingList;

    private List<MeetingRequest> meetingRequests;

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

    public List<MeetingRequest> getMeetingRequests() {
        return meetingRequests;
    }

    public void setMeetingRequests(List<MeetingRequest> meetingRequests) {
        this.meetingRequests = meetingRequests;
    }
}
