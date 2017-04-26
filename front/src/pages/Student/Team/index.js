import React from 'react';
import {createStyleSheet} from 'jss-theme-reactor';
import {Card, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';
import Chip from 'material-ui/Chip';
import FaceIcon from 'material-ui-icons/Face';
import Avatar from 'material-ui/Avatar';
import Layout from 'material-ui/Layout';
import TextField from 'material-ui/TextField';
import customPropTypes from 'material-ui/utils/customPropTypes';

import {Fab, FabButton, FabActions, FabAction} from 'react-fab';
import './fab.css';

const STYLE_CONTAINER = {
  padding: 20,
}

const styleSheet = createStyleSheet('Chips', (theme) => ({
  chip: {
    margin: theme.spacing.unit,
  },
  svgIcon: {
    color: 'gray',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  breadCrumbs: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  searchField: {
    maxWidth: 400,
    margin: '0 auto 20px auto',
  }
}));

class TeamPage extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    filterString: "",
  };

  handleFilterChange = (e) => {
    this.setState({ filterString: e.target.value });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div style={STYLE_CONTAINER}>
        <Fab style={{right: '20px', bottom: '20px'}}>
          <FabButton>
            +
          </FabButton>
          <FabActions>
            <FabAction
              onClick={() => console.log('Create a team')}
              tooltip="Créer une équipe">
              +
            </FabAction>
          </FabActions>
        </Fab>

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

        <Card className={classes.card}>
          <CardContent>
            <Text type="headline" component="h2">Caméléon</Text>
            <div className={classes.row}>
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Yvan Bézard-Falgas"
                className={classes.chip}
              />
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Mickael Petit"
                className={classes.chip}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button primary>Rejoindre l'équipe</Button>
          </CardActions>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Text type="headline" component="h2">Gros singe</Text>
            <div className={classes.row}>
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Yvan Bézard-Falgas"
                className={classes.chip}
              />
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Mickael Petit"
                className={classes.chip}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button primary>Rejoindre l'équipe</Button>
          </CardActions>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Text type="headline" component="h2">Macaque de compétition</Text>
            <div className={classes.row}>
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Yvan Bézard-Falgas"
                className={classes.chip}
              />
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Mickael Petit"
                className={classes.chip}
              />
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Patrick Ely"
                className={classes.chip}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button primary>Rejoindre l'équipe</Button>
          </CardActions>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Text type="headline" component="h2">Thon des mers du sud</Text>
            <div className={classes.row}>
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Yvan Bézard-Falgas"
                className={classes.chip}
              />
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Zakia Kazi-Aoul"
                className={classes.chip}
              />
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Mickael Petit"
                className={classes.chip}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button primary>Rejoindre l'équipe</Button>
          </CardActions>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Text type="headline" component="h2">Fantôme</Text>
            <div className={classes.row}>
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Yvan Bézard-Falgas"
                className={classes.chip}
              />
              <Chip
                avatar={<Avatar><FaceIcon className={classes.svgIcon}/></Avatar>}
                label="Mickael Petit"
                className={classes.chip}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button primary>Rejoindre l'équipe</Button>
          </CardActions>
        </Card>

      </div>
    )
  }
}

export default TeamPage;
