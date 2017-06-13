import React from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class TeamSummary extends React.Component {
  render() {
    const {team, leaveTeam} = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={6}>
            <h2 style={{ marginBottom: 0 }}>
              {team.name}
            </h2>
          </Grid>
          <Grid item xs={6} style={{ textAlign:"right" }}>
            <Button raised onClick={() => leaveTeam(team.id)}>Quitter l'équipe</Button>
          </Grid>
        </Grid>
        <hr/>
        Membres:
        <List>
          {
            team.members.map(m => (
              <ListItem dense button key={m.id}>
                <Avatar alt="Remy Sharp" src="/img/ely.jpg"/>
                <ListItemText primary={`${m.firstName} ${m.lastName}`}>{m.firstName}</ListItemText>
              </ListItem>
            ))
          }
        </List>
      </div>
    );
  }
}
