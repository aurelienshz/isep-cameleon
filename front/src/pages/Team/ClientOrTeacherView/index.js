// @flow

import React from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import SimpleTable from '../../../components/SimpleTable/index';
import ConfirmDialog from '../../../components/ConfirmDialog';

import colors from '../../../colors';

import { getLocalState as getTeamState, fetchTeams, validateTeam } from '../../../data/team/reducer';
import { getLocalState as getSubjetState, fetchSubjects } from '../../../data/subject/reducer';
import { getLocalState as getProjectState, fetchProjects, createProject } from '../../../data/project/reducer';

import Loader from '../../../components/Loader.js';

const style = {
  MESSAGE_STYLE: {
    textAlign: 'left',
  },
  TABLE: {
    marginTop: 20,
  },
  VALIDATE_BUTTON: {
    color: colors.ISEP_PRIMARY,
  },
  BODY: {
    margin: 20,
  },
  searchField: {
    maxWidth: 400,
    margin: '0 auto 20px auto',
  },
  center: {
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
};

const columnsMain = [
  {
    header: 'Nom',
    accessor: 'name',
  }, {
    header: 'Membres',
    accessor: 'membre',
    render: (row) => {
      return (
        <table>
          <tbody>
            <tr>
              <td>qsdf</td>
              <td>qsdf</td>
              <td>qsdf</td>
            </tr>
            <tr>
              <td>qsdf</td>
              <td>qsdf</td>
              <td>qsdf</td>
            </tr>
          </tbody>
        </table>
      )
    }
  }, {
    header: 'Validation',
    accessor: 'validation',
  },
];

const columnsToAssignSubject = [
  {
    header: 'Nom',
    accessor: 'name',
  }, {
    header: 'Membres',
    accessor: 'membre',
    render: (row) => (
      <table>
        <tbody>
          <tr>
            <td>qsdf</td>
            <td>qsdf</td>
            <td>qsdf</td>
          </tr>
          <tr>
            <td>qsdf</td>
            <td>qsdf</td>
            <td>qsdf</td>
          </tr>
        </tbody>
      </table>
    )
  }, {
    header: 'Sujet',
    accessor: 'subject',
  },
];


const columnsValidated = [
  {
    header: 'Nom',
    accessor: 'name',
  }, {
    header: 'Membres',
    accessor: 'membre',
    render: (row) => (
      <table>
        <tbody>
        <tr>
          <td>qsdf</td>
          <td>qsdf</td>
          <td>qsdf</td>
        </tr>
        <tr>
          <td>qsdf</td>
          <td>qsdf</td>
          <td>qsdf</td>
        </tr>
        </tbody>
      </table>
    )
  }, {
    header: 'Sujet',
    accessor: 'project.subject.name',
  },
];

class ValidateEquipes extends React.Component {
  state = {
    filterString: '',
    index: 0,
    assignSubjectOpen: false,
    teamBeingAssignedSubject: null,
    selectedSubjectId: -1,
    validPopupOpen: false,
    teamBeingValidated: null,
  };

  componentWillMount() {
    this.props.fetchEquipes();
    this.props.fetchSubjects();
    this.props.fetchProjects();
  }

  openValidationDialog = (team) => {
    this.setState({
      validPopupOpen: true,
      teamBeingValidated: team,
    });
  };

  handleClose = () => {
    this.setState({validPopupOpen: false});
  };

  assignTeamSubject = () => {
    const subjectId = this.state.selectedSubjectId;
    const teamId = this.state.teamBeingAssignedSubject.id;
    this.props.createProject(subjectId, teamId);
    this.closeAssignSubject();
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  handleValidateTeam = () => {
    const id = this.state.teamBeingValidated.id;
    this.props.validateTeam(id);
    this.handleClose();
  };

  closeAssignSubject = () => this.setState({ assignSubjectOpen: false });

  addValidationControl = (equipes) => {
    return equipes.map(team => ({
      ...team,
      validation: (
        <div style={style.center}>
          <Button onClick={() => this.openValidationDialog(team)} style={style.VALIDATE_BUTTON}>
            Valider
          </Button>
          <Button style={style.VALIDATE_BUTTON}>
            Refuser
          </Button>
        </div>
      ),
    }));
  };

  addSubjectControl = (equipes) => {
    return equipes.map(team => ({
      ...team,
      subject: (
        <div>
          <Button onClick={() => this.setState({ assignSubjectOpen: true, teamBeingAssignedSubject: team })}>
            Attribuer un sujet
          </Button>
        </div>
      ),
    }));
  };

  applyFilterString = () => {
    const filter = this.state.filterString.toLowerCase();
    return this.props.teams.filter(team => {
      return team.name.toLowerCase().includes(filter);
    })
  };

  renderTable = () => {
    const filteredTeams = this.applyFilterString();

    switch(this.state.index) {
      case 0:
        const teams = filteredTeams.filter(team => !team.validatedByTeacher);
        const teamsToValidate = this.addValidationControl(teams);
        return <SimpleTable
          selectable={true}
          style={style.TABLE}
          loading={this.props.loading}
          data={teamsToValidate}
          columns={columnsMain} />;
      case 1:
        const teamsWithoutProject = filteredTeams.filter(team => {
          return team.validatedByTeacher && this.props.projects.findIndex(p => p.team.id = team.id) === -1;
        });
        const teamsToAssignSubject = this.addSubjectControl(teamsWithoutProject);
        return <SimpleTable
          selectable={true}
          style={style.TABLE}
          loading={this.props.loading}
          data={teamsToAssignSubject}
          columns={columnsToAssignSubject} />;
      case 2:
        const teamsWithProject = filteredTeams.filter(team => {
          return team.validatedByTeacher && this.props.projects.findIndex(p => p.team.id = team.id) > -1;
        });
        const validatedTeams = this.addSubjectControl(teamsWithProject);
        return <SimpleTable
          selectable={true}
          style={style.TABLE}
          loading={this.props.loading}
          data={validatedTeams}
          columns={columnsValidated} />;
    }

    if (this.state.index === 1) { // selected tabs for validated teams :

    } else {

    }
  };

  render() {
    const table = this.renderTable();
    const { teamBeingValidated, validPopupOpen, assignSubjectOpen } = this.state;
    return (
      <div style={style.BODY}>
        <h1>Équipes</h1>
        <Grid>
          <TextField
            style={style.searchField}
            onChange={e => this.setState({filterString: e.target.value})}
            label="Filtrer les équipes" />
        </Grid>

        { teamBeingValidated && validPopupOpen &&
          <ConfirmDialog
            open={this.state.validPopupOpen}
            title="Valider l'équipe ?"
            text={`Voulez-vous vraiment valider la constitution
              de l'équipe ${this.state.teamBeingValidated.name} ? Cette opération ne peut pas être annulée.`}
            confirmText="Valider"
            cancelText="Annuler"
            onCancel={this.handleClose}
            onConfirm={this.handleValidateTeam}
          />
        }

        { assignSubjectOpen &&
          <Dialog open={this.state.assignSubjectOpen} onRequestClose={this.closeAssignSubject}>
            <DialogTitle>{"Attribuer un sujet"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Assigner un sujet :&nbsp;
                { this.props.subjects ?
                  <select onChange={(e) => this.setState({ selectedSubjectId: e.target.value })}>
                    <option value="-1">Sélectionner un sujet...</option>
                    {
                      this.props.subjects.map((subject) => (
                        <option value={subject.id} key={subject.id}>{subject.name}</option>
                      ))
                    }
                  </select>
                  :
                  <Loader />
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeAssignSubject} primary>Annuler</Button>
              <Button onClick={this.assignTeamSubject} disabled={this.state.selectedSubjectId === -1} primary>Valider</Button>
            </DialogActions>
          </Dialog>
        }

        <Paper style={style.root}>
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            textColor="accent"
            centered>
            <Tab label="Équipes en attente de validation" />
            <Tab label="Équipes validées sans sujet" />
            <Tab label="Équipes validées avec sujet" />
          </Tabs>
        </Paper>

        {table}

      </div>
    );
  }
}

export default connect((state) => {
  const teamState = getTeamState(state);
  const subjectState = getSubjetState(state);
  const projectState = getProjectState(state);
  return {
    loading: teamState.loading || projectState.loading,
    teams: teamState.teams,
    projects: projectState.projects,
    subjects: subjectState.subjects,
  };
}, (dispatch) => {
  return {
    fetchEquipes: () => dispatch(fetchTeams()),
    fetchSubjects: () => dispatch(fetchSubjects()),
    fetchProjects: () => dispatch(fetchProjects()),
    validateTeam: (id) => dispatch(validateTeam(id)),
    createProject: (subjectId, teamId) => dispatch(createProject(subjectId, teamId)),
  };
},
)(ValidateEquipes);
