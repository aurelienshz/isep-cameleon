package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.MeetingDTO;
import com.cameleon.chameleon.data.dto.ProjectCreationDTO;
import com.cameleon.chameleon.data.entity.*;

import com.cameleon.chameleon.exception.BusinessLogicException;

import com.cameleon.chameleon.service.FeatureService;
import com.cameleon.chameleon.service.MeetingService;
import com.cameleon.chameleon.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.getProject(id);
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
        return meetingService.addMeeting(meeting);
    }

    @PostMapping("/{pId}/meeting/{mId")
    public Meeting editMeeting(@PathVariable Long pId, @PathVariable Long mId, @RequestBody MeetingDTO meeting) {
        return null; // TODO
    }

    @DeleteMapping("/{pId}/meeting/{mId}")
    public void deleteMeeting(@PathVariable Long pId, @PathVariable Long mId) {
        // TODO
    }

    @DeleteMapping("/{pId}/meeting/{mId}/report")
    public MeetingReport updateMeetingReport(@PathVariable Long pId, @PathVariable Long mId, @RequestBody MeetingReport report) {
        return null; // TODO
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
        return meetingService.findDeliverables();
    }

    @PostMapping("/{pId}/deliverable")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public Deliverable addDeliverable(@PathVariable Long pId) {
        return meetingService.addDeliverable(pId);
    }

    @PostMapping("/{pId}/deliverable/{dId}")
    @RolesAllowed({ ROLE_TEACHER, ROLE_CLIENT })
    public Deliverable updateDeliverable(@PathVariable Long pId, @PathVariable Long dId, @RequestBody Deliverable deliverable) {
        return null; // TODO
    }

    @PostMapping("/{pId}/deliverable/{dId}/deliver")
    @RolesAllowed(ROLE_STUDENT)
    public void deliverDeliverable(@PathVariable Long pId, @PathVariable Long dId) {
        // TODO
    }
}
