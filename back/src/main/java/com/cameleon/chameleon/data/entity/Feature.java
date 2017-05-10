package com.cameleon.chameleon.data.entity;

import javax.persistence.*;

@Entity()
public class Feature {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private FeatureCategory category;

    @ManyToOne
    @JoinColumn(name = "meeting_discovered_id")
    private Meeting discoveredAtMeeting;

    private boolean expected;

    public void setId(Long id) {
        this.id = id;
    }

    public FeatureCategory getCategory() {
        return category;
    }

    public void setCategory(FeatureCategory category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }


    public boolean isExpected() {
        return expected;
    }

    public void setExpected(boolean expected) {
        this.expected = expected;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Meeting getDiscoveredAtMeeting() {
        return discoveredAtMeeting;
    }

    public void setDiscoveredAtMeeting(Meeting discoveredAtMeeting) {
        this.discoveredAtMeeting = discoveredAtMeeting;
    }
}
