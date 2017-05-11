package com.cameleon.chameleon.data.dto;

import java.util.Locale;

public class FeatureDTO {
    private Long id;
    private String name;
    private  Long catid;

    public void setFeatureName(String name){ this.name= name;}
    public String getFeatureName(){ return name;}


    public Long getCategoryId(){ return catid;}

    public void setId(Long id){ this.id= id;}
    public Long getId(){ return id;}











}
