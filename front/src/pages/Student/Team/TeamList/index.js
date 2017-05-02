import React from 'react';
import { connect } from 'react-redux';
import {createStyleSheet} from 'jss-theme-reactor';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import Layout from 'material-ui/Layout';
import TextField from 'material-ui/TextField';
import customPropTypes from 'material-ui/utils/customPropTypes';

import TeamListComponent from './components/TeamList';
import TeamCreationDialog from './components/TeamCreationDialog';
import ConfirmDialog from '../../../../components/ConfirmDialog';

import colors from '../../../../colors.js';

import { fetchTeams, createTeam, getLocalState as getTeamState } from '../../../../data/team/reducer';
import { isPartOfTeam } from '../../../../data/team/utils';

const styleSheet = createStyleSheet('Chips', (theme) => ({
  breadCrumbs: {
    marginBottom: 20,
  },
  searchField: {
    maxWidth: 400,
    margin: '0 auto 20px auto',
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: colors.ISEP_SECONDARY_LIGHTER,
    zIndex: 998,
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    '&:hover': {
      background: colors.ISEP_SECONDARY,
    }
  },
}));

export default class TeamList extends React.Component {
  state = {
    filterString: "",
    teams: [],
    displayedTeams: [],
    joinTeamDialogOpen: false,
    creationDialogOpen: false,
    joinTeamRequestId: null,
  };

  requestJoinTeam = (id) => {
    this.setState({
      joinTeamDialogOpen: true,
      joinTeamRequestId: id,
    })
  };

  cancelJoinTeam = () => {
    this.setState({
      joinTeamDialogOpen: false,
      joinTeamRequestId: null,
    });
  };

  openTeamCreationDialog = () => {
    this.setState({ creationDialogOpen: true });
  };

  closeTeamCreationDialog = () => {
    this.setState({ creationDialogOpen: false });
  };

  handleFilterChange = (e) => {
    const filterString = e.target.value;
    this.setState({ filterString });
  };

  createTeam = (name) => {
    this.props.onCreateTeam({ name });
    this.setState({ creationDialogOpen: false });
  };

  confirmJoinTeam = () => {
    this.props.onJoinTeam(this.state.joinTeamRequestId);
    this.setState({ creationDialogOpen: false });

  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    const filteredTeams = this.props.teams.filter((team) => {
      return team.name.toLowerCase().includes(this.state.filterString);
    });

    return (
      <div>
        <Button fab primary className={classes.button} onClick={this.openTeamCreationDialog}>
          <AddIcon />
        </Button>

        <ConfirmDialog
          open={this.state.joinTeamDialogOpen}
          title="Demander à rejoindre l'équipe ?"
          text="Votre demande de rejoindre l'équipe sera
          envoyée au créateur de l'équipe. Celui-ci devra l'accepter avant que vous ne rejoigniez
          définitivement l'équipe."
          confirmText="Envoyer"
          onCancel={this.cancelJoinTeam}
          onConfirm={this.confirmJoinTeam} />

        <TeamCreationDialog
          open={this.state.creationDialogOpen}
          onCancel={this.closeTeamCreationDialog}
          onConfirm={(name) => this.createTeam(name)} />

        <Typography component="p" className={classes.breadCrumbs}>
          <strong>Constitution de l'équipe</strong>
          &nbsp;&gt;&nbsp;
          Validation de l'équipe
          &nbsp;&gt;&nbsp;
          Assignation du sujet
        </Typography>

        <Layout>
          <TextField
            className={classes.searchField}
            label="Filtrer les équipes"
            value={this.state.filterString}
            onChange={this.handleFilterChange} />
        </Layout>

        <TeamListComponent teams={filteredTeams} onRequestJoin={this.requestJoinTeam} />
      </div>
    );
  }
}
