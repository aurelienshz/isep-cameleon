package com.cameleon.chameleon.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity()
public class Feature {
    @Id
    @GeneratedValue
    private Long id;

    public Feature() {

    }

    public Feature(String name, FeatureCategory category, Integer featureOrder) {
        this.name = name;
        this.category = category;
        this.featureOrder = featureOrder;

        category.addFeature(this);
    }

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore
    private FeatureCategory category;

    /**
     * References the order in the category
     * See : http://docs.jboss.org/hibernate/stable/annotations/reference/en/html_single/#entity-hibspec-collection-extratype-indexbidir
     */
    @Column(name="feature_order")
    private Integer featureOrder;

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

    public Integer getFeatureOrder() {
        return featureOrder;
    }

    public void setFeatureOrder(Integer featureOrder) {
        this.featureOrder = featureOrder;
    }
}
