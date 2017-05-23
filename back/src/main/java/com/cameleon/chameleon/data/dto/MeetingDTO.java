package com.cameleon.chameleon.data.dto;

import javax.persistence.Column;
import java.sql.Timestamp;
import java.util.List;

public class MeetingDTO {
    private Timestamp beginning;

    private Timestamp end;

    private List<Long> attendees;

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
}
