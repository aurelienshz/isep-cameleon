package com.cameleon.chameleon.service;


import com.cameleon.chameleon.data.dto.MeetingDTO;
import com.cameleon.chameleon.data.entity.Deliverable;
import com.cameleon.chameleon.data.entity.Meeting;
import com.cameleon.chameleon.data.entity.TimeSlot;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.DeliverableRepository;
import com.cameleon.chameleon.data.repository.MeetingRepository;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;
import java.util.ArrayList;
import java.util.List;

@Service
public class MeetingService {
    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeliverableRepository deliverableRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public Meeting findMeeting (Long id) {
        return meetingRepository.findOne(id);
    }
    public Meeting addMeeting(MeetingDTO meetingDTO){
        Meeting meeting = addMeetingFromDTO(meetingDTO);
        return meetingRepository.save(meeting);
    }

    private Meeting addMeetingFromDTO(MeetingDTO meetingDTO) {
        Meeting meeting = new Meeting();
        TimeSlot timeSlot = new TimeSlot();
        timeSlot.setBeginning(meetingDTO.getBegin());
        timeSlot.setEnd(meetingDTO.getEnd());
        meeting.setTimeSlot(timeSlot);
        List<User> attendeesUser = findAllUsers(meetingDTO.getAttendees());
        meeting.setAttendees(attendeesUser);
        return meeting;
    }
    public List<User> findAllUsers(List<Long> attendeesId){
        List<User> attendeesUser = new ArrayList<>();
        for(int i=0; i<attendeesId.size();i++){
            User user = userRepository.findOne(attendeesId.get(i));
            attendeesUser.add(user);

        }
        return attendeesUser;
    }

    public List<Meeting> findAllMeetings(Long id) {
        return (List<Meeting>) meetingRepository.findAll();
    }
    public Deliverable addDeliverable(Long pid) {
        Deliverable deliverable = addDeliverableFromDTO(pid);
        return deliverableRepository.save(deliverable);
    }

    private Deliverable addDeliverableFromDTO(Long pid) {
        return null; // TODO
    }

    public List<Deliverable> findDeliverables() {
        return (List<Deliverable>) deliverableRepository.findAll();
    }
}

