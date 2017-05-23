import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import GroupIcon from 'material-ui-icons/Group'
import SubjectIcon from 'material-ui-icons/Subject'

const styleSheet = createStyleSheet('Dashboard', (theme) => ({
  meetingTimeHeader: {
    textAlign: 'center',
    paddingBottom: 8,
    paddingTop: 8,
  },
  meetingTime: {
    textAlign: 'center',
    fontSize: 25,
    color: theme.palette.text.secondary,
    marginBottom: 16,
  },
  listWarningBadge: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 12,
    height: 16,
    float: 'right',
    padding: '4px 10px',
  }
}));

class TeamDashboard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div style={{ padding: 20, backgroundColor: "#FAFAFA", height: 'calc(100% - 64px)', boxSizing: 'border-box' }}>
        <h1 style={{ textAlign: 'center' }}>Caméléon</h1>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography type="headline" component="h2">Réunions</Typography>

                <Typography component="p" className={classes.meetingTimeHeader}>
                  Temps de réunion écoulé :
                </Typography>
                <Typography component="p" className={classes.meetingTime}>
                  1:23:27
                </Typography>

                <Divider />

                <Typography component="p" className={classes.meetingTimeHeader}>
                  Dernières réunions :
                </Typography>

                <List>
                  <ListItem button onClick={() => this.props.pushLocation("/team/meeting/1")}>
                    <Avatar><GroupIcon/></Avatar>
                    <ListItemText
                      primary={<span>09/02/2017 <span className={classes.listWarningBadge}>Pas de compte-rendu</span></span>}
                      secondary="Durée : 27:35" />
                  </ListItem>
                  <ListItem button onClick={() => this.props.pushLocation("/team/meeting/2")}>
                    <Avatar><GroupIcon /></Avatar>
                    <ListItemText primary="17/03/2017" secondary="Durée : 38:17" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography type="headline" component="h2">Livrables</Typography>

                <List>
                  <ListItem button>
                    <Avatar><SubjectIcon /></Avatar>
                    <ListItemText
                      primary={<span>Impact mapping <span className={classes.listWarningBadge}>En retard</span></span>}
                      secondary="À rendre avant le 27/02/2017" />
                  </ListItem>
                  <ListItem button>
                    <Avatar><SubjectIcon /></Avatar>
                    <ListItemText primary="Elevator pitch" secondary="Rendu" />
                  </ListItem>
                  <ListItem button>
                    <Avatar><SubjectIcon /></Avatar>
                    <ListItemText primary="Mockups" secondary="Rendu" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const StyledDashboard = withStyles(styleSheet)(TeamDashboard);

export default connect(
  () => {
    return {

    };
  },
  (dispatch) => {
    return {
      pushLocation: (location) => dispatch(push(location)),
    }
  }
)(StyledDashboard)
