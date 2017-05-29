package com.cameleon.chameleon.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity()
public class Meeting {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "timeslot_id")
    private TimeSlot timeSlot;

    private String comment;

    @ManyToOne
    @JsonIgnore
    private Project project;

    @ManyToMany
    private List<User> attendees;

    @OneToOne
    @JoinColumn(name = "report_document_id")
    private Document report;

    public TimeSlot getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(TimeSlot timeSlot) {
        this.timeSlot = timeSlot;
    }

    public Project getProject(){ return project; }

    public void setProject(Project project) { this.project = project; }

    public List<User> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<User> attendees) {
        this.attendees = attendees;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Document getReport() {
        return report;
    }

    public void setReport(Document report) {
        this.report = report;
    }
}
