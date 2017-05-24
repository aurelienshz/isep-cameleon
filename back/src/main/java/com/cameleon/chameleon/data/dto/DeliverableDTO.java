package com.cameleon.chameleon.data.dto;
import java.sql.Timestamp;

public class DeliverableDTO {
    private String name;

    private String assignment;

    private Timestamp deliveryWindowBeginning;

    private Timestamp deliveryWindowEnd;

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

    public Timestamp getDeliveryWindowBeginning() {
        return deliveryWindowBeginning;
    }

    public void setDeliveryWindowBeginning(Timestamp deliveryWindowBeginning) {
        this.deliveryWindowBeginning = deliveryWindowBeginning;
    }

    public Timestamp getDeliveryWindowEnd() {
        return deliveryWindowEnd;
    }

    public void setDeliveryWindowEnd(Timestamp deliveryWindowEnd) {
        this.deliveryWindowEnd = deliveryWindowEnd;
    }
}
