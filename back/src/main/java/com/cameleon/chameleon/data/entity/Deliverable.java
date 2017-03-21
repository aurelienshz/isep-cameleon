package com.cameleon.chameleon.data.entity;

import javax.persistence.*;
import java.sql.Time;

@Entity()
public class Deliverable {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "delivery_timeslot_id")
    private TimeSlot deliveryWindow;

    private Time deliveryTime;

    @ManyToOne
    @JoinColumn(name = "project_id")
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

    public Time getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Time deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
}
