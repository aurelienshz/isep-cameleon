package com.cameleon.chameleon.service;


import com.cameleon.chameleon.data.entity.Meeting;
import com.cameleon.chameleon.data.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingService {
    @Autowired
    private MeetingRepository meetingRepository;

    public Meeting findMeeting (Long id) {
        return meetingRepository.findOne(id);
    }
}
