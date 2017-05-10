package com.cameleon.chameleon.service;


import com.cameleon.chameleon.data.entity.Meeting;
import com.cameleon.chameleon.data.repository.MeetingRepository;
import org.springframework.stereotype.Service;

@Service
public class MeetingService {
    private MeetingRepository meetingRepository;

    public Meeting findMeeting (Long id) {
        return meetingRepository.findOne(id);
    }

}
