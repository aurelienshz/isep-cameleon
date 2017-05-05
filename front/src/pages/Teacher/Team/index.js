// @flow

import React from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import Layout from 'material-ui/Layout';
import TextField from 'material-ui/TextField';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

import SimpleTable from '../../../components/SimpleTable';

import colors from '../../../colors';

import { getLocalState as getTeamState, fetchTeams } from '../../../data/team/reducer';
import { getLocalState as getSubjetState, fetchSubjects } from '../../../data/subject/reducer';

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
    render: (row) => (
      <table>
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
      </table>
    )
  }, {
    header: 'Validation',
    accessor: 'validation',
  },
];

const columnsOther = [
  {
    header: 'Nom',
    accessor: 'name',
  }, {
    header: 'Membres',
    accessor: 'membre',
    render: (row) => (
      <table>
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
      </table>
    )
  }, {
    header: 'Sujet',
    accessor: 'subject',
  },
];

class ValidateEquipes extends React.Component {
  state = {
    validPopupOpen: false,
    index: 0,
    open: false,
  };

  componentWillMount() {
    this.props.fetchEquipes();
    this.props.fetchSubjects();
  }

  handleValidate = () => {
    this.setState({validPopupOpen: true});
  };

  handleClose = () => {
    this.setState({validPopupOpen: false});
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  handleRequestClose = () => this.setState({ open: false });

  addValidationControl = (equipes) => {
    return equipes.map(team => ({
      ...team,
      validation: (
        <div style={style.center}>
          <Button onClick={this.handleValidate} style={style.VALIDATE_BUTTON}>
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
          <Button onClick={() => this.setState({ open: true })}>
            Sélection du sujet
          </Button>
          <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
           <DialogTitle>{"Attribuer un sujet"}</DialogTitle>
           <DialogContent>
             <DialogContentText>
               Assigner un sujet :&nbsp;
               { this.props.subjects ?
                   <select>
                     {
                       this.props.subjects.map(subject => (
                         <option>{subject.name}</option>
                       ))
                     }
                   </select>
                 :
                   "Chargement..."
               }
             </DialogContentText>
           </DialogContent>
           <DialogActions>
             <Button onClick={this.handleRequestClose} primary>Annuler</Button>
             <Button onClick={this.handleRequestClose} primary>Valider</Button>
           </DialogActions>
         </Dialog>
        </div>
      ),
    }));
  }

  renderTable = () => {
    let teams;
    if (/* onglet des équipes validées */) { // condition sur onglet séléctionné
      teams = this.props.teams.filter(team => team.validatedByTeacher);
    } else {
      teams = this.props.teams.filter(team => !team.validatedByTeacher);
    }

    const dataValidation = this.addValidationControl(teams);
    const dataSubject = this.addSubjectControl(teams);
  }

  render() {
    const table = this.renderTable();
    return (
      <div style={style.BODY}>
        <h1>Équipes</h1>
        <Layout>
          <TextField
            style={style.searchField}
            label="Filtrer les équipes" />
        </Layout>

        <Paper className={style.root}>
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            textColor="accent"
            centered
          >
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
  return {
    loading: teamState.loading,
    teams: teamState.teams,
    subjects: subjectState.subjects,
  };
}, (dispatch) => {
  return {
    fetchEquipes: () => dispatch(fetchTeams()),
    fetchSubjects: () => dispatch(fetchSubjects()),
  };
},
)(ValidateEquipes);
