package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.DeliverableDTO;
import com.cameleon.chameleon.data.dto.MeetingDTO;
import com.cameleon.chameleon.data.dto.MessageDTO;
import com.cameleon.chameleon.data.dto.ProjectCreationDTO;
import com.cameleon.chameleon.data.entity.*;

import com.cameleon.chameleon.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import java.util.List;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_CLIENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_STUDENT;
import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@RestController
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private FeatureService featureService;

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private DeliverableService deliverableService;

    @Autowired
    private MessagerieService messagerieService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.findProject(id);
    }

    @GetMapping("/my-project")
    @RolesAllowed(ROLE_STUDENT)
    public Project getMyProject(@AuthenticationPrincipal User user) {
        return projectService.getBelongingProject(user);
    }

    @PostMapping
    @RolesAllowed(ROLE_TEACHER)
    public Project createProject(@RequestBody ProjectCreationDTO projectCreationDTO,Long id) {
        return projectService.createProject(projectCreationDTO);
    }



    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }

    @GetMapping("/{id}/meeting")
    public List<Meeting> getMeetings(@PathVariable Long id) {
        return meetingService.findAllMeetings(id);
    }

    @PostMapping("/{id}/meeting")
    public Meeting addMeeting(@PathVariable Long id, @RequestBody MeetingDTO meeting) {
        return meetingService.addMeeting(id, meeting);
    }

    @PostMapping("/{pId}/meeting/{mId}")
    public Meeting editMeeting(@PathVariable Long pId, @PathVariable Long mId, @RequestBody MeetingDTO meeting) {
        return meetingService.updateMeeting(pId, mId, meeting);
    }

    @DeleteMapping("/{pId}/meeting/{mId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMeeting(@PathVariable Long pId, @PathVariable Long mId) {
        meetingService.deleteMeeting(pId, mId);
    }

    @PostMapping("/{pId}/meeting/{mId}/report")
    public Meeting uploadMeetingReport(@PathVariable Long pId, @PathVariable Long mId, @RequestParam("file") MultipartFile file, @AuthenticationPrincipal User user) {
        return meetingService.uploadMeetingReport(pId, mId, file, user);
    }

    @GetMapping("/{pId}/meeting-request")
    public List<MeetingRequest> getMeetingRequests(@PathVariable Long pId) {
        return null; // TODO
    }

    @PostMapping("/{pId}/meeting-request")
    public MeetingRequest requestMeeting(@PathVariable Long pId, @RequestBody MeetingRequest meetingRequest) {
        return null; // TODO
    }

    @PostMapping("/{pId}/meeting-request/{meetingRequestId}")
    public MeetingRequest updateMeetingRequest(@PathVariable Long pId, @PathVariable Long meetingRequestId, @RequestBody MeetingRequest meetingRequest) {
        return null; // TODO
    }

    @DeleteMapping("/{pId}/meeting-request/{meetingRequestId}")
    public void deleteMeetingRequest(@PathVariable Long pId, @PathVariable Long meetingRequestId) {
        // TODO
    }

    @GetMapping("/{pId}/deliverable")
    public List<Deliverable> getDeliverables(@PathVariable Long pId) {
        return deliverableService.findDeliverables(pId);
    }

    @PostMapping("/{pId}/deliverable")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public Deliverable createDeliverable(@PathVariable Long pId, @RequestBody DeliverableDTO dto) {
        return deliverableService.createDeliverable(pId, dto);
    }

    @PostMapping("/{pId}/deliverable/{dId}")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public Deliverable updateDeliverable(@PathVariable Long pId, @PathVariable Long dId, @RequestBody DeliverableDTO dto) {
        return deliverableService.updateDeliverable(pId, dId, dto);
    }

    @DeleteMapping("/{pId}/deliverable/{dId}")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDeliverable(@PathVariable Long pId, @PathVariable Long dId) {
        deliverableService.deleteDeliverable(pId, dId);
    }

    @PostMapping("/{pId}/deliverable/{dId}/deliver")
    @RolesAllowed(ROLE_STUDENT)
    public Deliverable deliverDeliverable(
            @PathVariable Long pId,
            @PathVariable Long dId,
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User user) {
        return deliverableService.deliverDeliverable(pId, dId, file, user);
    }

    @PostMapping
    @GetMapping("/{pId}/messagerie")
    public List<Message> getMessagerie(@PathVariable Long pId) {
        return messagerieService.findOneList(pId);
    }

    @RolesAllowed({ ROLE_STUDENT, ROLE_CLIENT })
    @PostMapping("/{pId}/messagerie/")
    public void addMessage(@PathVariable Long pId ,@RequestBody MessageDTO messageDTO) {
        messagerieService.addMessage(pId, messageDTO);
    }



    @RolesAllowed({ ROLE_CLIENT })
    @DeleteMapping("/{pId}/messagerie/{mId}")
    public void deleteMessage(Long mId,@PathVariable Long pId){
        messagerieService.deleteMessageFromAll(mId,pId);
    }






}
