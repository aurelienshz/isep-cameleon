package com.cameleon.chameleon.data.entity;

import com.cameleon.chameleon.constants.PromotionStatus;

import javax.persistence.*;

@Entity
public class Promotion {
    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    private PromotionStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PromotionStatus getStatus() {
        return status;
    }

    public void setStatus(PromotionStatus status) {
        this.status = status;
    }
}
