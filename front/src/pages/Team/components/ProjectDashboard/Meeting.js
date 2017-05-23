import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import GroupIcon from 'material-ui-icons/Group';
import { Switch, Route } from 'react-router-dom';

import MeetingDetails from './components/MeetingDetails';

import { formatFrenchDuration } from '../../../../data/datetime';
import Loader from '../../../../components/Loader';

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

const MeetingList = ({ meetings, classes, selectedId, selectMeeting }) => {
  return (
    <List>
      {
        meetings.map((meeting, index) => {
          const hasReport = Boolean(meeting.report);
          const primaryText = <span>09/02/2017 { !hasReport && <span className={classes.listWarningBadge}>Pas de compte-rendu</span> }</span>
          const duration = "Durée : " + formatFrenchDuration(meeting.timeSlot.end - meeting.timeSlot.beginning);
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

class ProjectMeetings extends React.Component {
  state = {
    selectedIndex: null,
  };

  selectMeeting = (id) => {
    this.props.pushLocation(this.props.baseLocation + "/meeting/" + id);
  };

  buildGrid = () => {
    const {classes, project, match} = this.props;
    const meetings = project.meetings;

    if (match.params.id) {
      const selectedId = parseInt(this.props.match.params.id, 10);
      const selectedMeeting = meetings.find(m => m.id === selectedId);
      return (
        <Grid container gutter={0}>
          <Grid item xs={4} className={classes.leftColumn}>
            <MeetingList
              classes={classes}
              meetings={meetings}
              selectedId={selectedId}
              selectMeeting={this.selectMeeting}/>
          </Grid>

          <Grid item xs={8}>
            <div className={classes.rightColumn}>
              {
                selectedMeeting ?
                  <MeetingDetails meeting={selectedMeeting}/>
                  :
                  <div>Not found :(</div>
              }
            </div>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container gutter={0}>
        <Grid item xs={12}>
          <MeetingList
            classes={classes}
            meetings={meetings}
            selectMeeting={this.selectMeeting}/>
        </Grid>
      </Grid>
    );
  }

  render() {
    const {loading} = this.props;

    return (
      <div style={{padding: 16}}>
        <h3>
          Réunions
          <div style={{float: 'right'}}>
            <Button>Nouvelle réunion</Button>
          </div>
        </h3>

        {
          loading ?
            <Loader />
            :
            <Card style={{backgroundColor: 'white'}}>
              { this.buildGrid() }
            </Card>
        }

      </div>
    );
  }
}

const StyledTeamDashboard = withStyles(styleSheet)(ProjectMeetings);

const ConnectedTeamDashboard = connect(
  () => ({
  }),
  (dispatch) => {
    return {
      pushLocation: (location) => dispatch(push(location)),
    }
  }
)(StyledTeamDashboard);

export default function(props) {
  const { baseLocation } = props;
  return (
    <Switch>
      <Route exact path={baseLocation + "/meeting"} component={(routerProps) => <ConnectedTeamDashboard {...props} {...routerProps} />} />
      <Route path={baseLocation + "/meeting/:id"} component={(routerProps) => <ConnectedTeamDashboard {...props} {...routerProps} />} />
    </Switch>
  );
};

