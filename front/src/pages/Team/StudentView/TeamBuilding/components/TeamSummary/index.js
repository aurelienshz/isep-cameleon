import React from 'react';

export default class TeamSummary extends React.Component {
  render() {
    const { team, leaveTeam } = this.props;
    return (
      <div>
        Équipe rejointe : {team.name}&nbsp;
        <button onClick={() => leaveTeam(team.id)}>Quitter l'équipe</button>
        <hr/>
        Membres:
        <ul>
        {
          team.members.map(m => (
            <li key={m.id}>{m.firstName} {m.lastName} - <button>Accepter</button> / <button>Refuser</button> (boutons inactifs)</li>
          ))
        }
        </ul>
      </div>
    );
  }
}
