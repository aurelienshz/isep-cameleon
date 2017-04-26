import React from 'react';
import {createStyleSheet} from 'jss-theme-reactor';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';
import AddIcon from 'material-ui-icons/Add';
import Layout from 'material-ui/Layout';
import TextField from 'material-ui/TextField';
import customPropTypes from 'material-ui/utils/customPropTypes';

import TeamList from './components/TeamList';

import colors from '../../../colors.js';

const STYLE_CONTAINER = {
  padding: 20,
}

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

const teams = [
  {
    id: 0,
    name: 'Caméléon',
    members: [
      {name: 'Mickael Petit'},
      {name: 'Aurélien Schiltz'},
      {name: 'Yvan Bézard'},
    ]
  },
  {
    id: 1,
    name: 'Gros singe',
    members: [
      {name: 'Mickael Petit'},
      {name: 'Aurélien Schiltz'},
      {name: 'Yvan Bézard'},
    ]
  },
  {
    id: 2,
    name: 'Macaque de compétition',
    members: [
      {name: 'Mickael Petit'},
      {name: 'Aurélien Schiltz'},
      {name: 'Yvan Bézard'},
    ]
  },
  {
    id: 3,
    name: 'Thon des mers du sud',
    members: [
      {name: 'Mickael Petit'},
      {name: 'Aurélien Schiltz'},
      {name: 'Yvan Bézard'},
    ]
  },
  {
    id: 4,
    name: 'Fantôme',
    members: [
      {name: 'Mickael Petit'},
      {name: 'Aurélien Schiltz'},
      {name: 'Yvan Bézard'},
    ]
  },
];



class TeamPage extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    filterString: "",
    teams: teams,
    displayedTeams: teams,
  };

  handleFilterChange = (e) => {
    const filterString = e.target.value;
    const filteredTeams = this.state.teams.filter((team) => {
      return team.name.toLowerCase().includes(filterString);
    });
    this.setState({ filterString, displayedTeams: filteredTeams });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div style={STYLE_CONTAINER}>

        <Button fab primary className={classes.button}>
          <AddIcon />
        </Button>

        <Text component="p" className={classes.breadCrumbs}>
          <strong>Constitution de l'équipe</strong>
          &nbsp;&gt;&nbsp;
          Validation de l'équipe
          &nbsp;&gt;&nbsp;
          Assignation du sujet
        </Text>

        <Layout>
          <TextField
            className={classes.searchField}
            label="Filtrer les équipes"
            value={this.state.filterString}
            onChange={this.handleFilterChange} />
        </Layout>

        <TeamList teams={this.state.displayedTeams} />

      </div>
    )
  }
}

export default TeamPage;
