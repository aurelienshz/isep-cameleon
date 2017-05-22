package com.cameleon.chameleon.data.dto;

import java.util.List;

public class FeatureCategoryDTO {
    private String name;

    private List<Long> featuresIds;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getFeaturesIds() {
        return featuresIds;
    }

    public void setFeaturesIds(List<Long> featuresIds) {
        this.featuresIds = featuresIds;
    }
}
