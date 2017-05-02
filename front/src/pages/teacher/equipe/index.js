// @flow

import React from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs} from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Layout from 'material-ui/Layout';
import TextField from 'material-ui/TextField';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import WifiIcon from 'material-ui-icons/Wifi';
import BluetoothIcon from 'material-ui-icons/Bluetooth';

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
};

const renderMessage = (row) => {
  return <div style={style.MESSAGE_STYLE}>{row.value}</div>;
};

const COLUMNS = [
  {
    header: 'Nom',
    accessor: 'name',
  }, {
    header: 'Membre',
    accessor: 'membre',
  }, {
    header: 'Parcours',
    accessor: 'parcours',
  }, {
    header: 'Technologie',
    accessor: 'technologie',
  }, {
    header: 'Sujet',
    accessor: 'sujet',
  }, {
    header: 'Validation',
    accessor: 'validation',
  },
];

class ValidateEquipes extends React.Component {
  state = {
    validPopupOpen: false,
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

  addValidationControl = (equipes) => {
    return equipes.map(team => ({
      ...team,
      validation: (
        <div>
          <Button onClick={this.handleValidate} style={style.VALIDATE_BUTTON}>
            Valider
          </Button>
        </div>
      ),
    }));
  };

  render() {
    const data = this.addValidationControl(this.props.teams);
    return (
      <div style={style.BODY}>
        <h1 className="colored">Équipes</h1>
        <Layout>
          <TextField
            style={style.searchField}
            label="Filtrer les équipes" />
        </Layout>
        <SimpleTable selectable={true} style={style.TABLE} clickHandler={this.clickTable} loading={this.props.loading} data={data} columns={COLUMNS} />

        <Dialog open={this.state.validPopupOpen} onRequestClose={this.handleClose}>
          <DialogTitle>Validation</DialogTitle>
          <DialogContent>
            <DialogContentText>
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
            <Button onClick={this.handleClose} primary>{"Annuler"}</Button>
            <Button onClick={() => {console.log("qqsdf")}} primary>{"Valider"}</Button>
          </DialogActions>
        </Dialog>
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
