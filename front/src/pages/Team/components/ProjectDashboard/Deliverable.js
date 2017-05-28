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
import SubjectIcon from 'material-ui-icons/Subject';
import { Switch, Route } from 'react-router-dom';

import DeliverableDetails from './components/DeliverableDetails';

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
  deliverableTime: {
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

const DeliverableList = ({ deliverables, classes, selectedId, selectDeliverable }) => {
  const sortedDeliverables = deliverables.sort((d1, d2) => {
    if (d1.deliveryWindow.beginning && d2.deliveryWindow.beginning) {
      return d2.deliveryWindow.beginning - d1.deliveryWindow.beginning;
    }
    return -1;
  });

  return (
    <List>
      {
        sortedDeliverables.map((deliverable, index) => {
          const canBeDelivered = deliverable.deliveryWindow.beginning < Date.now() && deliverable.deliveryWindow.end > Date.now();
          const isLate = deliverable.deliveryWindow.end && (deliverable.deliveryWindow.end < Date.now()) && !deliverable.document;

          let badge = "";
          if (canBeDelivered) badge = <span className={classes.listInfoBadge}>En cours</span>;
          if (isLate) badge = <span className={classes.listDangerBadge}>En retard</span>;
          const primaryText = <span>{ deliverable.name } { badge }</span>

          const secondary = "À rendre avant le " + formatFrenchDateTime(deliverable.deliveryWindow.end);
          return (
            <ListItem
              button key={index}
              onClick={() => selectDeliverable(deliverable.id)}
              className={deliverable.id === selectedId ? classes.selectedListItem : ""}>

              <Avatar><SubjectIcon /></Avatar>

              <ListItemText
                primary={primaryText}
                secondary={secondary} />
            </ListItem>
          );
        })
      }

      {
        deliverables.length === 0 &&
        <ListItem>
          <ListItemText primary="Aucun livrable" />
        </ListItem>
      }
    </List>
  );
};

class ProjectDeliverables extends React.Component {
  state = {
    selectedIndex: null,
    newDeliverableMenuOpen: false,
    newDeliverableMenuAnchor: undefined,
  };

  selectDeliverable = (id) => {
    this.props.pushLocation(this.props.baseLocation + "/deliverable/" + id);
  };

  updateDeliverable = (deliverableId, dto) => {
    const { projectId } = this.props;
    this.props.updateDeliverable(projectId, deliverableId, dto);
  };

  deleteDeliverable = (id) => {
    const { projectId } = this.props;
    this.props.deleteDeliverable(projectId, id);
    this.props.pushLocation(this.props.baseLocation + "/deliverable")
  };

  deliverDeliverable = (id, file) => {
    const { projectId } = this.props;
    this.props.deliverDeliverable(projectId, id, file);
  };

  buildGrid = () => {
    const {classes, project, match, canEditDeliverable, canDeliverDeliverable} = this.props;

    console.log(this.props);
    console.log(this.props.canDeliverDeliverable);
    const deliverables = project.deliverables;

    if (match.params.id) {
      const selectedId = parseInt(this.props.match.params.id, 10);
      const selectedDeliverable = deliverables.find(m => m.id === selectedId);
      return (
        <Grid container gutter={0}>
          <Grid item xs={12} md={4} className={classes.leftColumn}>
            <DeliverableList
              classes={classes}
              deliverables={deliverables}
              selectedId={selectedId}
              selectDeliverable={this.selectDeliverable}/>
          </Grid>

          <Grid item xs={12} md={8}>
            <div className={classes.rightColumn}>
              {
                selectedDeliverable ?
                  <DeliverableDetails
                    canEditDeliverable={canEditDeliverable}
                    canDeliverDeliverable={canDeliverDeliverable}
                    deliverable={selectedDeliverable}
                    deleteDeliverable={() => this.deleteDeliverable(selectedDeliverable.id)}
                    updateDeliverable={(dto) => this.updateDeliverable(selectedDeliverable.id, dto)}
                    deliverDeliverable={(file) => this.deliverDeliverable(selectedDeliverable.id, file)} />
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
          <DeliverableList
            classes={classes}
            deliverables={deliverables}
            selectDeliverable={this.selectDeliverable} />
        </Grid>
      </Grid>
    );
  };

  createDeliverable = () => {
    const { projectId } = this.props;
    const dto = {
      name: "Nouveau livrable",
      assignment: "",
      deliveryWindowBeginning: Date.now() - 10000,
      deliveryWindowEnd: Date.now() - 5000,
    };
    this.props.createDeliverable(projectId, dto);
  };

  render() {
    const { loading, canEditDeliverable } = this.props;

    return (
      <div style={{padding: 16}}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <h3>Livrables</h3>
          </Grid>
          { canEditDeliverable &&
          <Grid item xs={12} sm={6}>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={this.createDeliverable}>Nouveau livrable</Button>
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

const StyledTeamDashboard = withStyles(styleSheet)(ProjectDeliverables);

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
      <Route exact path={baseLocation + "/deliverable"} component={(routerProps) => <ConnectedTeamDashboard {...props} {...routerProps} />} />
      <Route path={baseLocation + "/deliverable/:id"} component={(routerProps) => <ConnectedTeamDashboard {...props} {...routerProps} />} />
    </Switch>
  );
};

