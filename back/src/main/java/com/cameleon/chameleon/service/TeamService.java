package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.TeamCreationDTO;
import com.cameleon.chameleon.data.entity.Team;
import com.cameleon.chameleon.data.repository.TeamRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;

    public Team findTeam(Long id) {
        return teamRepository.findOne(id);
    }

    public List<Team> findAllTeams() {
        return teamRepository.findAll();
    }

    public Team createTeam(TeamCreationDTO teamCreationDTO) {
        Team team = createTeamFromDTO(teamCreationDTO);
        return teamRepository.save(team);
    }

    public void deleteTeam(Long id) {
        teamRepository.delete(id);
    }

    public Team createTeamFromDTO(TeamCreationDTO teamCreationDTO) {
        Team team = new Team();
        team.setName(teamCreationDTO.getName());

        return team;
    }
}
