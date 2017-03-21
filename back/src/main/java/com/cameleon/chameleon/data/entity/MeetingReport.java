package com.cameleon.chameleon.data.entity;

import javax.persistence.*;

@Entity()
public class MeetingReport {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name="meeting_id")
    private Meeting meeting;

    @OneToOne
    @JoinColumn(name = "report_id")
    private Document report;

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }

    public Document getReport() {
        return report;
    }

    public void setReport(Document report) {
        this.report = report;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
