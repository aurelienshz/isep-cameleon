package com.cameleon.chameleon.data.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Time;

@Entity()
public class TimeSlot {
    @Id
    @GeneratedValue
    private Long id;

    private Time beginning;
    private Time end;

    public int getDurationInSeconds() {
        // TODO return end - begin
        return 0;
    }

    public Time getBeginning() {
        return beginning;
    }

    public void setBeginning(Time beginning) {
        this.beginning = beginning;
    }

    public Time getEnd() {
        return end;
    }

    public void setEnd(Time end) {
        this.end = end;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
