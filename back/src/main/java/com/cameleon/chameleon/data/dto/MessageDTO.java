package com.cameleon.chameleon.data.dto;

import com.cameleon.chameleon.data.entity.User;

public class MessageDTO {

    private String content;

    private User SentBy;

    public User getSentBy() {
        return SentBy;
    }

    public void setSentBy(User sentBy) {
        SentBy = sentBy;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
