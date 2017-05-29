import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import GroupIcon from 'material-ui-icons/Group';
import { Switch, Route } from 'react-router-dom';

import MeetingDetails from './components/MeetingDetails';

import { formatFrenchDuration, formatFrenchDate, formatFrenchDateTime } from '../../../../data/datetime';
import { userHasRole, ROLE_CLIENT } from '../../../../data/users/rolesHelpers';
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
  listInfoBadge: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 12,
    height: 16,
    float: 'right',
    padding: '4px 10px',
  },
  listDangerBadge: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 12,
    height: 16,
    float: 'right',
    padding: '4px 10px',
  }
}));

const MeetingList = ({ meetings, classes, selectedId, selectMeeting }) => {
  const sortedMeetings = meetings.sort((m1, m2) => {
    if (m1.timeSlot.beginning && m2.timeSlot.beginning) {
      return m2.timeSlot.beginning - m1.timeSlot.beginning;
    }
    return -1;
  });

  return (
    <List>
      {
        sortedMeetings.map((meeting, index) => {
          const hasReport = Boolean(meeting.report);
          const hasEnded = meeting.timeSlot.end !== null;

          let badge = "";
          if (!hasEnded) badge = <span className={classes.listInfoBadge}>En cours</span>;
          if (hasEnded && !hasReport) badge = <span className={classes.listDangerBadge}>Pas de compte-rendu</span>;
          const primaryText = <span>{ formatFrenchDate(meeting.timeSlot.beginning) } { badge }</span>

          const secondary = hasEnded ?
            "Durée : " + formatFrenchDuration(meeting.timeSlot.end - meeting.timeSlot.beginning)
            :
            "Début : " + formatFrenchDateTime(meeting.timeSlot.beginning);
          return (
            <ListItem
              button key={index}
              onClick={() => selectMeeting(meeting.id)}
              className={meeting.id === selectedId ? classes.selectedListItem : ""}>

              <Avatar><GroupIcon/></Avatar>

              <ListItemText
                primary={primaryText}
                secondary={secondary} />
            </ListItem>
          );
        })
      }

      {
        meetings.length === 0 &&
        <ListItem>
          <ListItemText primary="Aucune réunion" />
        </ListItem>
      }
    </List>
  );
};

class ProjectMeetings extends React.Component {
  state = {
    selectedIndex: null,
    newMeetingMenuOpen: false,
    newMeetingMenuAnchor: undefined,
  };

  selectMeeting = (id) => {
    this.props.pushLocation(this.props.baseLocation + "/meeting/" + id);
  };

  updateMeeting = (meetingId, dto) => {
    const { projectId } = this.props;
    this.props.updateMeeting(projectId, meetingId, dto);
  };

  deleteMeeting = (id) => {
    const { projectId } = this.props;
    this.props.deleteMeeting(projectId, id);
    this.props.pushLocation(this.props.baseLocation + "/meeting")
  };

  uploadMeetingReport = (id, file) => {
    const { projectId } = this.props;
    this.props.uploadMeetingReport(projectId, id, file);
  };

  buildGrid = () => {
    const { classes, project, match, canEditMeeting, canUploadMeetingReport } = this.props;
    const meetings = project.meetings;

    if (match.params.id) {
      const selectedId = parseInt(this.props.match.params.id, 10);
      const selectedMeeting = meetings.find(m => m.id === selectedId);
      return (
        <Grid container gutter={0}>
          <Grid item xs={12} md={4} className={classes.leftColumn}>
            <MeetingList
              classes={classes}
              meetings={meetings}
              selectedId={selectedId}
              selectMeeting={this.selectMeeting}/>
          </Grid>

          <Grid item xs={12} md={8}>
            <div className={classes.rightColumn}>
              {
                selectedMeeting ?
                  <MeetingDetails
                    canEditMeeting={canEditMeeting}
                    canUploadMeetingReport={canUploadMeetingReport}
                    uploadMeetingReport={(file) => this.uploadMeetingReport(selectedMeeting.id, file)}
                    meeting={selectedMeeting}
                    deleteMeeting={() => this.deleteMeeting(selectedMeeting.id)}
                    updateMeeting={(dto) => this.updateMeeting(selectedMeeting.id, dto)} />
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
  };

  openNewMeetingMenu = (e) => {
    this.setState({
      newMeetingMenuOpen: true,
      newMeetingMenuAnchor: e.currentTarget,
    });
  };

  closeNewMeetingMenu = () => {
    this.setState({ newMeetingMenuOpen: false });
  };

  startMeeting = () => {
    const { projectId, userId } = this.props;

    const dto = {
      beginning: Date.now(),
      attendees: [userId],
    };

    this.props.createMeeting(projectId, dto);
    this.closeNewMeetingMenu();
  };

  addMeeting = () => {
    const { projectId } = this.props;
    this.props.createMeeting(projectId, {
      beginning: Date.now() - 10000,
      end: Date.now() - 5000,
      attendees: [],
    });
    this.closeNewMeetingMenu();
  };


  render() {
    const { loading, canEditMeeting } = this.props;

    return (
      <div style={{padding: 16}}>
        <Menu
          anchorEl={this.state.newMeetingMenuAnchor}
          open={this.state.newMeetingMenuOpen}
          onRequestClose={this.closeNewMeetingMenu}>
          <MenuItem onClick={this.startMeeting}>Débuter une réunion</MenuItem>
          <MenuItem onClick={this.addMeeting}>Ajouter une réunion terminée</MenuItem>
        </Menu>

        <Grid container>
          <Grid item xs={12} sm={6}>
            <h3>Réunions</h3>
          </Grid>
          { canEditMeeting &&
            <Grid item xs={12} sm={6}>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={this.openNewMeetingMenu}>Nouvelle réunion</Button>
              </div>
            </Grid>
          }
        </Grid>

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

