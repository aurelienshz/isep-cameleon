import React from 'react';
import { connect } from 'react-redux';
import {createStyleSheet} from 'jss-theme-reactor';
import Typography from 'material-ui/Typography';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { fetchTeams, createTeam, leaveTeam, joinTeam, getLocalState as getTeamState } from '../../../../data/team/reducer';
import { isPartOfTeam } from '../../../../data/team/utils';

import TeamList from './components/TeamList/index';
import TeamSummary from "./components/TeamSummary/index";

import Loader from '../../../../components/Loader.js';

const STEP_BUILDING_TEAM = "STEP_BUILDING_TEAM";
const STEP_AWAITING_VALIDATION = "STEP_AWAITING_VALIDATION";
const STEP_SUBJECT = "STEP_SUBJECT";

const STYLE_CONTAINER = {
  padding: 20,
};

const styleSheet = createStyleSheet('TeamPage', (theme) => ({
  breadCrumbs: {
    marginBottom: 20,
  }
}));

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

  joinTeam = (id) => {
    this.props.joinTeam(id);
  };

  leaveTeam = (id) => {
    this.props.leaveTeam(id);
  };

  createTeam = (name) => {
    this.props.createTeam({ name });
    this.setState({ creationDialogOpen: false });
  };

  render() {
    const { loadingTeams, teams, joinedTeam } = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    if (loadingTeams) {
      return (
        <div style={STYLE_CONTAINER}>
          <Typography><Loader/></Typography>
        </div>
      );
    }

    let currentStep = STEP_BUILDING_TEAM;
    if (joinedTeam) currentStep = STEP_AWAITING_VALIDATION;
    if (joinedTeam && joinedTeam.validatedByTeacher) currentStep = STEP_SUBJECT;

    return (
      <div style={STYLE_CONTAINER}>
        <Typography component="p" className={classes.breadCrumbs}>
          {
            currentStep === STEP_BUILDING_TEAM ? <strong>Constitution de l'équipe</strong> : "Constitution de l'équipe"
          }
          &nbsp;&gt;&nbsp;
          {
            currentStep === STEP_AWAITING_VALIDATION ? <strong>Validation de l'équipe</strong> : "Validation de l'équipe"
          }
          &nbsp;&gt;&nbsp;
          {
            currentStep === STEP_SUBJECT ? <strong>Assignation du sujet</strong> : "Assignation du sujet"
          }
        </Typography>

        {
          joinedTeam ?
            <TeamSummary team={joinedTeam} leaveTeam={this.leaveTeam} />
            :
            <TeamList teams={teams} onCreateTeam={this.props.createTeam} onJoinTeam={this.joinTeam} />
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
    joinTeam: (id) => dispatch(joinTeam(id)),
  })
)(TeamPage);
