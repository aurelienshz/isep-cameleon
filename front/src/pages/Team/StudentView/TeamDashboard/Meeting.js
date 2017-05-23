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
import { Switch, Route } from 'react-router-dom';

import MeetingDetails from './components/MeetingDetails';

import { formatFrenchDuration } from '../../../../data/datetime';

const styleSheet = createStyleSheet('Dashboard', (theme) => ({
  leftColumn: {
    borderRight: '1px solid #BCBCBC',
  },
  rightColumn: {
    padding: 16,
  },
  selectedListItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
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

const __meetings = [
  {
    id: 1,
    timeslot: {
      beginning: 1492948344501,
      end: 1492951928939,
    },
    attendees: [
      {
        firstName: "Yolo",
        lastName: "Swag"
      },
      {
        firstName: "Yolo",
        lastName: "Swag"
      },
    ],
    report: null,
  },
  {
    id: 2,
    timeslot: {
      beginning: 1492948344501,
      end: 1492951928939,
    },
    attendees: [
      {
        firstName: "Yolo",
        lastName: "Swag"
      },
      {
        firstName: "Yolo",
        lastName: "Swag"
      },
    ],
    report: true,
  }
];

const MeetingList = ({ meetings, classes, selectedId, selectMeeting }) => {
  return (
    <List>
      {
        meetings.map((meeting, index) => {
          const hasReport = Boolean(meeting.report);
          const primaryText = <span>09/02/2017 { !hasReport && <span className={classes.listWarningBadge}>Pas de compte-rendu</span> }</span>
          const duration = "Durée : " + formatFrenchDuration(meeting.timeslot.end - meeting.timeslot.beginning);
          return (
            <ListItem
              button key={index}
              onClick={() => selectMeeting(meeting.id)}
              className={meeting.id === selectedId ? classes.selectedListItem : ""}>

              <Avatar><GroupIcon/></Avatar>

              <ListItemText
                primary={primaryText}
                secondary={duration} />
            </ListItem>
          );
        })
      }
    </List>
  );
};

class TeamDashboard extends React.Component {
  state = {
    selectedIndex: null,
  };

  selectMeeting = (id) => {
    this.props.pushLocation("/team/meeting/" + id);
  };

  render() {
    const { classes, meetings, match } = this.props;
    if (match.params.id) {
      const selectedId = parseInt(this.props.match.params.id, 10);
      const selectedMeeting = meetings.find(m => m.id === selectedId);

      return (
        <div style={{ padding: 20, backgroundColor: "#FAFAFA", height: 'calc(100% - 64px)', boxSizing: 'border-box' }}>
          <h1 style={{ textAlign: 'center' }}>Réunions</h1>

          <Card style={{ backgroundColor: 'white' }}>
            <Grid container gutter={0}>
              <Grid item xs={4} className={classes.leftColumn}>
                <MeetingList
                  classes={classes}
                  meetings={meetings}
                  selectedId={selectedId}
                  selectMeeting={this.selectMeeting} />
              </Grid>
              <Grid item xs={8}>
                <div className={classes.rightColumn}>
                  {
                    selectedMeeting ?
                      <MeetingDetails meeting={selectedMeeting} />
                      :
                      <div>Not found :(</div>
                  }
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      )
    }

    return (
      <div style={{ padding: 20, backgroundColor: "#FAFAFA", height: 'calc(100% - 64px)', boxSizing: 'border-box' }}>
        <h1 style={{ textAlign: 'center' }}>Réunions</h1>
        <Card style={{ backgroundColor: 'white' }}>
          <Grid container gutter={0}>
            <Grid item xs={12}>
              <MeetingList
                classes={classes}
                meetings={meetings}
                selectMeeting={this.selectMeeting} />
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

const StyledTeamDashboard = withStyles(styleSheet)(TeamDashboard);

const ConnectedTeamDashboard = connect(
  (state, ownProps) => {
    console.log(ownProps);
    return {
      meetings: __meetings,
    }
  },
  (dispatch) => {
    return {
      pushLocation: (location) => dispatch(push(location)),
    }
  })
(StyledTeamDashboard);

export default function() {
  return (
    <Switch>
      <Route exact path="/team/meeting" component={ConnectedTeamDashboard} />
      <Route path="/team/meeting/:id" component={ConnectedTeamDashboard} />
    </Switch>
  );
};

