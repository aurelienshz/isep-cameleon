package com.cameleon.chameleon.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Time;

@Entity()
public class Deliverable {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String assignment;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "delivery_timeslot_id")
    private TimeSlot deliveryWindow;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @OneToOne
    @JoinColumn(name = "document_id")
    private Document document;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public TimeSlot getDeliveryWindow() {
        return deliveryWindow;
    }

    public void setDeliveryWindow(TimeSlot deliveryWindow) {
        this.deliveryWindow = deliveryWindow;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAssignment() {
        return assignment;
    }

    public void setAssignment(String assignment) {
        this.assignment = assignment;
    }
}
