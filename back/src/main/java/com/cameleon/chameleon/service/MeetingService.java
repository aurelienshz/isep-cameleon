package com.cameleon.chameleon.service;


import com.cameleon.chameleon.data.dto.MeetingDTO;
import com.cameleon.chameleon.data.entity.Meeting;
import com.cameleon.chameleon.data.entity.Project;
import com.cameleon.chameleon.data.entity.TimeSlot;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.*;
import com.cameleon.chameleon.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {
    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public Meeting findMeeting (Long id) {
        return meetingRepository.findOne(id);
    }

    public Meeting addMeeting(Long projectId, MeetingDTO meetingDTO){
        Project project = projectRepository.findOne(projectId);
        Meeting meeting = createMeetingFromDTO(meetingDTO);
        project.addMeeting(meeting);

        TimeSlot timeSlot = meeting.getTimeSlot();
        timeSlotRepository.save(timeSlot);
        meetingRepository.save(meeting);
        projectRepository.save(project);

        return meeting;
    }

    private Meeting createMeetingFromDTO(MeetingDTO meetingDTO) {
        Meeting meeting = new Meeting();
        TimeSlot timeSlot = new TimeSlot();
        timeSlot.setBeginning(meetingDTO.getBeginning());
        timeSlot.setEnd(meetingDTO.getEnd());
        meeting.setTimeSlot(timeSlot);
        List<User> attendeesUser = userRepository.findByIdIn(meetingDTO.getAttendees());
        meeting.setAttendees(attendeesUser);
        return meeting;
    }

    public List<Meeting> findAllMeetings(Long projectId) {
        Project project = projectService.findProject(projectId);
        return meetingRepository.findByProject(project);
    }

    public Meeting updateMeeting(Long pId, Long mId, MeetingDTO meetingDto) {
        Meeting meeting = meetingRepository.findOne(mId);
        checkMeetingBelongsToProjectOrThrow(meeting, pId);

        // Handle actual updates :

        TimeSlot timeSlot = meeting.getTimeSlot();
        timeSlot.setBeginning(meetingDto.getBeginning());
        timeSlot.setEnd(meetingDto.getEnd());
        timeSlotRepository.save(timeSlot);

        List<User> attendees = userRepository.findByIdIn(meetingDto.getAttendees());
        meeting.setAttendees(attendees);

        meetingRepository.save(meeting);

        return meeting;
    }

    private void checkMeetingBelongsToProjectOrThrow(Meeting meeting, Long pId) {
        if (!meeting.getProject().getId().equals(pId))
            throw new BusinessLogicException("Requested meeting does not belong to requested project");
    }

    public void deleteMeeting(Long pId, Long mId) {
        Meeting meeting = meetingRepository.findOne(mId);
        checkMeetingBelongsToProjectOrThrow(meeting, pId);

        meetingRepository.delete(meeting);
    }
}

