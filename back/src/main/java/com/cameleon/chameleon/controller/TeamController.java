package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.TeamCreationDTO;
import com.cameleon.chameleon.data.entity.Team;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.exception.BusinessLogicException;
import com.cameleon.chameleon.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

import static com.cameleon.chameleon.constants.RolesNames.ROLE_TEACHER;

@RestController
@RequestMapping("/team")
public class TeamController {
    @Autowired
    private TeamService teamService;

    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.findAllTeams();
    }

    @GetMapping("/{id}")
    public Team getTeam(@PathVariable Long id) {
        return teamService.findTeam(id);
    }

    @PostMapping
    public Team createTeam(@RequestBody TeamCreationDTO teamCreationDTO) {
        return teamService.createTeam(teamCreationDTO);
    }

    @PostMapping("/{teamId}/join")
    public Team joinTeam(@PathVariable Long teamId, @AuthenticationPrincipal User user) {
        Team team = teamService.findTeam(teamId);
        return teamService.addUserToTeam(user, team);
    }

    @PostMapping("/{teamId}/leave")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void leaveTeam(@PathVariable Long teamId, @AuthenticationPrincipal User user) {
        Team team = teamService.findTeam(teamId);
        teamService.removeUserFromTeam(user, team);
    }

    @GetMapping("/my-team")
    public Team getBelongingTeam(@AuthenticationPrincipal User user) {
        return teamService.findBelongingTeam(user);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
    }

    @PostMapping("/{id}/validate")
    @RolesAllowed(ROLE_TEACHER)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void validateTeam(@PathVariable Long id) {
        teamService.validateTeam(id);
    }
}
