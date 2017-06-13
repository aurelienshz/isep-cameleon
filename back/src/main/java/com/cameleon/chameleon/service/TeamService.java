package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.TeamCreationDTO;
import com.cameleon.chameleon.data.entity.Team;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.TeamRepository;
import com.cameleon.chameleon.exception.BusinessLogicException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;

    Logger logger = LoggerFactory.getLogger(TeamService.class);

    public Team findTeam(Long id) {
        return teamRepository.findOne(id);
    }

    public List<Team> findAllTeams() {
        return teamRepository.findAll();
    }

    public Team createTeam(TeamCreationDTO teamCreationDTO) {
        Team team = createTeamFromDTO(teamCreationDTO);

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (findBelongingTeam(user) != null) {
            throw new BusinessLogicException("User can't create a team while being member of another team");
        }

        List<User> members = new ArrayList<>(1);
        members.add(user);
        team.setMembers(members);

        return teamRepository.save(team);
    }

    public Team findBelongingTeam(User user) {
        return teamRepository.findByMemberId(user.getId());
    }

    public void checkTeamNotValidatedOrThrow(Team team) {
        if (team.isValidatedByTeacher())
            throw new BusinessLogicException("Team has already been validated by a teacher");
    }

    public void checkIfBelongToThisTeam(User user, Team team) {
        if (findBelongingTeam(user) != team) {
            throw new BusinessLogicException("User doesn't belong to team");
        }
    }

    public void checkUserCanJoinOrThrow(User user) {
        if (findBelongingTeam(user) != null) {
            throw new BusinessLogicException("User can't be member of several teams simultaneously");
        }
    }

    public Team addUserToTeam(User user, Team team) {
        checkTeamNotValidatedOrThrow(team);
        checkUserCanJoinOrThrow(user);
        team.getMembers().add(user);
        teamRepository.save(team);
        return team;
    }

    public void removeUserFromTeam(User user, Team team) {
        checkTeamNotValidatedOrThrow(team);
        checkIfBelongToThisTeam(user, team);

        logger.info("Removing user {} ({}) from team {} ({})",
                user.getUsername(), user.getId(),
                team.getName(), team.getId());
        List<User> newMembers = team.getMembers().stream()
                // Keep all other members :
                .filter(m -> !m.getId().equals(user.getId()))
                .collect(Collectors.toList());

        // If the member who just left was the last one, we delete the team :
        if (newMembers.size() == 0) {
            logger.info("Team {} has no more members. Deleting...", team.getName());
            teamRepository.delete(team);
        } else {
            team.setMembers(newMembers);
            teamRepository.save(team);
        }
    }

    public void deleteTeam(Long id) {
        teamRepository.delete(id);
    }

    public Team createTeamFromDTO(TeamCreationDTO teamCreationDTO) {
        Team team = new Team();
        team.setName(teamCreationDTO.getName());

        return team;
    }

    public void validateTeam(Long teamId) {
        Team team = teamRepository.findOne(teamId);
        team.setValidatedByTeacher(true);
        teamRepository.save(team);
    }
}
