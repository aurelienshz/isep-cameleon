package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.TeamCreationDTO;
import com.cameleon.chameleon.data.entity.Team;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.TeamRepository;
import com.cameleon.chameleon.data.repository.UserRepository;
import com.cameleon.chameleon.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    public Team createTeam(TeamCreationDTO teamCreationDTO) throws BusinessLogicException {
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

    public void checkIfValidated(Team team) throws BusinessLogicException{
        if (!team.isValidatedByTeacher()){
            throw new BusinessLogicException("team already validated");
        }
    }

    public void checkIfBelongToThisTeam (User user , Team team) throws BusinessLogicException {
        if (findBelongingTeam(user) != team) {
            throw new BusinessLogicException("User doesn't belong to team");
        }
    }

    public void checkIfBelongToATeam (User user , Team team) throws BusinessLogicException{
        if (findBelongingTeam(user) != null) {
            throw new BusinessLogicException("User can't be member of several teams simultaneously");
        }
    }

    public Team addUserToTeam(User user, Team team) throws BusinessLogicException {

        checkIfValidated(team);
        checkIfBelongToATeam(user,team);
        team.getMembers().add(user);
        teamRepository.save(team);
        return team;
    }

    public void removeUserFromTeam(User user, Team team) throws BusinessLogicException {
        checkIfValidated(team);
        checkIfBelongToThisTeam(user,team);
        List<User> newMembers = team.getMembers().stream()
                // Keep all other members :
                .filter(m -> !(m.getId().equals(user.getId())))
                .collect(Collectors.toList());
        // If the member who just left was the last one, we delete the team :
        if (newMembers.size() == 0) {
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
