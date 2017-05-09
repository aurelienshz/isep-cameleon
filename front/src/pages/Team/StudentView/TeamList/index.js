import React from 'react';
import {createStyleSheet} from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import TeamListComponent from './components/TeamList';
import TeamCreationDialog from './components/TeamCreationDialog';
import ConfirmDialog from '../../../../components/ConfirmDialog';

import colors from '../../../../colors.js';

const styleSheet = createStyleSheet('Chips', (theme) => ({
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


// TODO use globally refactored floatingActionButton here
export default class TeamList extends React.Component {
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

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    const filteredTeams = this.props.teams.filter((team) => {
      if (!team.name) return true;
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

        <Grid>
          <TextField
            className={classes.searchField}
            label="Filtrer les équipes"
            value={this.state.filterString}
            onChange={this.handleFilterChange} />
        </Grid>

        <TeamListComponent teams={filteredTeams} onRequestJoin={this.requestJoinTeam} />
      </div>
    );
  }
}
