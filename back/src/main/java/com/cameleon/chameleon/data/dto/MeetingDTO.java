package com.cameleon.chameleon.data.dto;

import java.sql.Timestamp;
import java.util.List;

public class MeetingDTO {
    private Timestamp beginning;

    private Timestamp end;

    private List<Long> attendees;

    private String comment;

    public Timestamp getBeginning() {
        return beginning;
    }

    public void setBeginning(Timestamp beginning) {
        this.beginning = beginning;
    }

    public Timestamp getEnd() {
        return end;
    }

    public void setEnd(Timestamp end) {
        this.end = end;
    }

    public List<Long> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<Long> attendees) {
        this.attendees = attendees;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
