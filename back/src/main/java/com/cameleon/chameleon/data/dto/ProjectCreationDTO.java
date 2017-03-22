package com.cameleon.chameleon.data.dto;

import java.util.List;

public class ProjectCreationDTO {
    private Long subjectId;
    private Long teamId;
    private List<Long> clientsIds;

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public List<Long> getClientsIds() {
        return clientsIds;
    }

    public void setClientsIds(List<Long> clientsIds) {
        this.clientsIds = clientsIds;
    }
}
