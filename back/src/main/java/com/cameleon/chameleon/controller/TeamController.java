package com.cameleon.chameleon.controller;

import com.cameleon.chameleon.data.dto.TeamCreationDTO;
import com.cameleon.chameleon.data.entity.Team;
import com.cameleon.chameleon.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @DeleteMapping
    public void deleteTeam(Long id) {
        teamService.deleteTeam(id);
    }
}
