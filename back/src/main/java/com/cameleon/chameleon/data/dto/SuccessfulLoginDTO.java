package com.cameleon.chameleon.data.dto;

public class SuccessfulLoginDTO {
    private String token;

    public SuccessfulLoginDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
