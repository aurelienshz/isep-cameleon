import React from 'react';

import Button from 'material-ui/Button';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class TeamSummary extends React.Component {
  render() {
    const { team, leaveTeam } = this.props;
    return (
      <div>
        Équipe rejointe : {team.name}&nbsp;
        <Button raised onClick={() => leaveTeam(team.id)}>Quitter l'équipe</Button>
        <hr/>
        Membres:
            <List>
              {
                team.members.map(m => (
              <ListItem dense button key={m.id}>
                <Avatar alt="Remy Sharp" src="/img/ely.jpg" />
                <ListItemText primary={`${m.firstName} ${m.lastName}`}>{m.firstName}</ListItemText>
                <ListItemSecondaryAction>
                  <Button raised>Accepter</Button>
                  <Button raised>refuser</Button>
                  (boutons inactifs)
                </ListItemSecondaryAction>
              </ListItem>
              ))
            }
            </List>
      </div>
    );
  }
}
