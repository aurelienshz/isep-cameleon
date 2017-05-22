package com.cameleon.chameleon.data.dto;

import java.sql.Time;
import java.util.List;

public class MeetingDTO {
    private Time begin;
    private Time end;
    private List<Long> attendees;

    public Time getBegin() {
        return begin;
    }

    public void setBegin(Time begin) {
        this.begin = begin;
    }

    public Time getEnd() {
        return end;
    }

    public void setEnd(Time end) {
        this.end = end;
    }

    public List<Long> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<Long> attendees) {
        this.attendees = attendees;
    }
}
