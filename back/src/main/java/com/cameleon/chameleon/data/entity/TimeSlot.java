package com.cameleon.chameleon.data.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity()
public class TimeSlot {
    @Id
    @GeneratedValue
    private Long id;

    private Timestamp beginning;

    private Timestamp end;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
