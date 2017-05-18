package com.cameleon.chameleon.data.dto;

import com.cameleon.chameleon.data.entity.Project;

import javax.persistence.ManyToOne;

public class FeatureCategoryDTO {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
