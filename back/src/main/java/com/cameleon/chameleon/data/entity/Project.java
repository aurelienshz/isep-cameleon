package com.cameleon.chameleon.data.entity;

import javax.persistence.*;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "project")
    private List<Deliverable> deliverables;

    @OneToMany(mappedBy = "project")
    private List<Meeting> meetings;

    @OneToMany(mappedBy = "project")
    private List<MeetingRequest> meetingRequests;

    @OneToMany
    private List<Message> messagesList;

    public List<Message> getMessagesList() {
        return messagesList;
    }

    public void setMessagesList(List<Message> messagesList) {
        this.messagesList = messagesList;
    }

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

    public List<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(List<Meeting> meetings) {
        this.meetings = meetings;
    }

    public void addMeeting(Meeting meeting) {
        meeting.setProject(this);
        List<Meeting> meetings = this.getMeetings();
        if (meetings == null) meetings = new ArrayList<>();
        meetings.add(meeting);
        this.setMeetings(meetings);
    }

    public void addDeliverable(Deliverable deliverable) {
        deliverable.setProject(this);
        List<Deliverable> deliverables = this.getDeliverables();
        if (deliverables == null) deliverables = new ArrayList<>();
        deliverables.add(deliverable);
        this.setDeliverables(deliverables);
    }
}
