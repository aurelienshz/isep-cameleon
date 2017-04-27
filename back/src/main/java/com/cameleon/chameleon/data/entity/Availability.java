package com.cameleon.chameleon.data.entity;

import javax.persistence.*;
import java.util.List;

@Entity()
public class Availability {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany
    private List<TimeSlot> timeSlot;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User deprecatedUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return deprecatedUser;
    }

    public void setUser(User user) {
        this.deprecatedUser = user;
    }

    public List<TimeSlot> getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(List<TimeSlot> timeSlot) {
        this.timeSlot = timeSlot;
    }
}
