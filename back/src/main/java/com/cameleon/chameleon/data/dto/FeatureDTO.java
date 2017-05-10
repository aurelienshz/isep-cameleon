package com.cameleon.chameleon.data.dto;

public class FeatureDTO {

    private String name;
    private Long categoryId;
    private Long discoveredMeetingId;
    private boolean expected;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public boolean isExpected() {
        return expected;
    }

    public void setExpected(boolean expected) {
        this.expected = expected;
    }

    public Long getDiscoveredMeetingId() {
        return discoveredMeetingId;
    }

    public void setDiscoveredMeetingId(Long discoveredMeetingId) {
        this.discoveredMeetingId = discoveredMeetingId;
    }
}
