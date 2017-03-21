package com.cameleon.chameleon.data.entity;

import javax.persistence.*;
import java.util.List;

@Entity()
@Table(name = "student_group")
public class Group {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany
    private List<Team> teams;

    private String room;

    @OneToOne
    @JoinColumn(name = "schedule_timeslot_id")
    private TimeSlot schedule;

    public void setId(Long id) {
        this.id = id;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TimeSlot getSchedule() {
        return schedule;
    }

    public void setSchedule(TimeSlot schedule) {
        this.schedule = schedule;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }
}
