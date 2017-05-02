import React from 'react';
import Button from 'material-ui/Button';

export default class MeetingPage extends React.Component {
  render() {
    return (
      <div style={{padding: 20}}>
        <div>
          Prochaine réunion : Jeudi 04/05 à 12h30
        </div>

        <div>
          <Button>Planifier une réunion</Button>
        </div>
      </div>
    )
  }
}
