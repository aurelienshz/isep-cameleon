// @flow

import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import SimpleTable from '../../../../components/SimpleTable/index';

import colors from '../../../../colors';

import { getLocalState as getTeamState, fetchTeams, validateTeam } from '../../../../data/team/reducer';
import { getLocalState as getSubjetState, fetchSubjects } from '../../../../data/subject/reducer';
import { getLocalState as getProjectState, fetchProjects, createProject } from '../../../../data/project/reducer';

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
    padding: 20,
  },
  searchField: {
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

const columns = [
  {
    header: 'Nom',
    accessor: 'name',
  },
  {
    header: 'Membres',
    // accessor: 'members',
    render: (rowData) => {
      const members = rowData.row.members;
      return (
        <ul>
          {
            members.map((m, index) => (
              <li key={index}>{m.firstName} {m.lastName}</li>
            ))
          }
        </ul>
      )
    }
  },
  {
    header: 'Sujet',
    accessor: 'subjectName',
  },
];

class ValidateEquipes extends React.Component {
  state = {
    filterString: '',
  };

  componentWillMount() {
    this.props.fetchTeams();
    this.props.fetchSubjects();
    this.props.fetchProjects();
  }

  applyFilterString = () => {
    const filter = this.state.filterString.toLowerCase();
    return this.props.projects.filter(p => {
      return p.team.name.toLowerCase().includes(filter);
    })
  };

  renderTable = () => {
    const { goToDetails } = this.props;

    if (this.props.loading || this.props.projects === null) {
      return <SimpleTable
        selectable={true}
        style={style.TABLE}
        loading={this.props.loading}
        data={[]}
        columns={columns}
        onClick={(id) => {
          goToDetails(id)
        }}/>;
    }

    const filteredProjects = this.applyFilterString();

    // A validated team is a project :
    const teams = filteredProjects.map(p => {
      return {
        ...p.team,
        subjectName: p.subject.name,
      }
    });

    // TODO filter string
    return <SimpleTable
      selectable={true}
      style={style.TABLE}
      loading={this.props.loading}
      data={teams}
      columns={columns}
      clickHandler={(rowInfo) => {goToDetails(rowInfo.row.id)}} />;
  };

  render() {
    return (
      <div style={style.BODY}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <h2>Équipes</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={style.searchField}
              onChange={e => this.setState({filterString: e.target.value})}
              label="Filtrer les équipes" />
          </Grid>
        </Grid>

        { this.renderTable() }
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
      fetchTeams: () => dispatch(fetchTeams()),
      fetchSubjects: () => dispatch(fetchSubjects()),
      fetchProjects: () => dispatch(fetchProjects()),
      validateTeam: (id) => dispatch(validateTeam(id)),
      createProject: (subjectId, teamId) => dispatch(createProject(subjectId, teamId)),
      goToDetails: (id) => dispatch(push("/team/" + id)),
    };
  },
)(ValidateEquipes);
