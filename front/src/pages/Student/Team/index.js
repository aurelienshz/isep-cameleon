import React from 'react';
import { connect } from 'react-redux';
import {createStyleSheet} from 'jss-theme-reactor';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import Layout from 'material-ui/Layout';
import TextField from 'material-ui/TextField';
import customPropTypes from 'material-ui/utils/customPropTypes';

import TeamList from './TeamList';
import TeamCreationDialog from './TeamList/components/TeamCreationDialog';
import ConfirmDialog from '../../../components/ConfirmDialog';

import colors from '../../../colors.js';

import { fetchTeams, createTeam, leaveTeam, getLocalState as getTeamState } from '../../../data/team/reducer';
import { isPartOfTeam } from '../../../data/team/utils';

const STYLE_CONTAINER = {
  padding: 20,
};

class TeamPage extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    filterString: "",
    teams: [],
    displayedTeams: [],
    joinTeamDialogOpen: false,
    creationDialogOpen: false,
    joinTeamRequestId: null,
  };

  componentWillMount() {
    this.props.fetchTeams();
  }

  leaveTeam = (id) => {
    this.props.leaveTeam(id);
  };

  createTeam = (name) => {
    this.props.createTeam({ name });
    this.setState({ creationDialogOpen: false });
  };

  render() {
    const { loadingTeams, teams, joinedTeam } = this.props;

    if (loadingTeams) {
      return (
        <div style={STYLE_CONTAINER}>
          <Typography>Chargement...</Typography>
        </div>
      );
    }

    return (
        <div style={STYLE_CONTAINER}>
          {
            joinedTeam ?
              <div>
                Équipe rejointe : {joinedTeam.name}&nbsp;
                <button onClick={() => this.leaveTeam(joinedTeam.id)}>Quitter l'équipe</button>
              </div>
            :
              <TeamList teams={teams} onCreateTeam={this.props.createTeam} />
          }
        </div>
    );
  }
}

export default connect(
  (state) => {
    const teamState = getTeamState(state);
    return {
      loadingTeams: teamState.loading,
      teams: teamState.teams,
      joinedTeam: isPartOfTeam(state),
    }
  },
  (dispatch) => ({
    fetchTeams: () => dispatch(fetchTeams()),
    createTeam: (teamCreationRequest) => dispatch(createTeam(teamCreationRequest)),
    leaveTeam: (id) => dispatch(leaveTeam(id)),
  })
)(TeamPage);
