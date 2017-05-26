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

import Loader from '../../../../components/Loader';

import { formatFrenchDate, formatFrenchDateTime, formatFrenchDuration, formatExactFrenchDuration } from '../../../../data/datetime';

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

class ProjectDashboardHome extends React.Component {
  render() {
    const { classes, loading, project, baseLocation } = this.props;

    const meetingTime = !loading && project.meetings.reduce((acc, curr) => {
      const duration = curr.timeSlot.end - curr.timeSlot.beginning;
      return acc + duration;
    }, 0);
    const formattedMeetingTime = !loading && formatExactFrenchDuration(meetingTime);

    return (
      <div style={{ padding: 16 }}>
        <h1 style={{ textAlign: 'center' }}>{ !loading && project.team.name }</h1>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography type="headline" component="h2">Réunions</Typography>

                {
                  loading ?
                  <Loader />
                  :
                  <div>

                    <div>
                      <Typography component="p" className={classes.meetingTimeHeader}>
                        Temps de réunion écoulé :
                      </Typography>
                      <Typography component="p" className={classes.meetingTime}>
                        { formattedMeetingTime }
                      </Typography>
                    </div>

                    <Divider />

                    <Typography component="p" className={classes.meetingTimeHeader}>
                      Dernières réunions :
                    </Typography>

                    <List>
                      {
                        project.meetings.map(meeting => {
                          const duration = formatFrenchDuration(meeting.timeSlot.end - meeting.timeSlot.beginning);
                          const date = formatFrenchDate(meeting.timeSlot.beginning);
                          return (
                            <ListItem key={meeting.id} button
                                      onClick={() => this.props.pushLocation(baseLocation + "/meeting/" + meeting.id)}>
                              <Avatar><GroupIcon/></Avatar>
                              <ListItemText
                                primary={
                                  <span>{date} {!meeting.report &&
                                    <span className={classes.listWarningBadge}>Pas de compte-rendu</span>
                                  }</span>}
                                secondary={"Durée : " + duration}/>
                            </ListItem>
                          )
                        })
                      }
                      {
                        project.meetings.length === 0 &&
                        <ListItem><ListItemText primary="Aucune réunion" /></ListItem>
                      }
                    </List>
                  </div>
                }
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography type="headline" component="h2">Livrables</Typography>

                { loading ?
                  <Loader />
                  :
                  <List>
                    {
                      project.deliverables.map(deliverable => {
                        return (
                          <ListItem
                            button
                            key={deliverable.id}
                            onClick={() => this.props.pushLocation(baseLocation + "/deliverable/" + deliverable.id)}>
                            <Avatar><SubjectIcon /></Avatar>
                            <ListItemText
                              primary={<span>{ deliverable.name }</span>}
                              secondary={"À rendre avant le " + formatFrenchDate(deliverable.deliveryWindow.end)} />
                          </ListItem>
                        );
                      })
                    }

                    {
                      project.deliverables.length === 0 &&
                      <ListItem><ListItemText primary="Aucun livrable" /></ListItem>
                    }
                  </List>
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const StyledDashboard = withStyles(styleSheet)(ProjectDashboardHome);

export default connect(
  () => {
    return {};
  },
  (dispatch) => {
    return {
      pushLocation: (location) => dispatch(push(location)),
    }
  }
)(StyledDashboard)
