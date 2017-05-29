package com.cameleon.chameleon.service;


import com.cameleon.chameleon.data.dto.MeetingDTO;
import com.cameleon.chameleon.data.entity.*;
import com.cameleon.chameleon.data.repository.*;
import com.cameleon.chameleon.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private DocumentService documentService;

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

        meeting.setComment(meetingDTO.getComment());

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

        meeting.setComment(meetingDto.getComment());
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

        // TODO are the associated entities cascade deleted ?
        meetingRepository.delete(meeting);
    }

    public Meeting uploadMeetingReport(Long pId, Long mId, MultipartFile file, User user) {
        Meeting meeting = meetingRepository.findOne(mId);
        checkMeetingBelongsToProjectOrThrow(meeting, pId);

        // TODO check deliverable is not late and can still be delivered

        Document document = documentService.store(file, user);
        meeting.setReport(document);

        meetingRepository.save(meeting);
        return meeting;
    }
}

