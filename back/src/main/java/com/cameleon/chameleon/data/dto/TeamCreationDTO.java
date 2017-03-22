package com.cameleon.chameleon.data.dto;

import java.util.List;

public class TeamCreationDTO {
    private String name;
    private List<Long> membersIds;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getMembersIds() {
        return membersIds;
    }

    public void setMembersIds(List<Long> membersIds) {
        this.membersIds = membersIds;
    }
}
