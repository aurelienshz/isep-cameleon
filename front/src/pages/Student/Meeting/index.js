import React from 'react';
import Button from 'material-ui/Button';

export default class MeetingPage extends React.Component {
  render() {

    const STYLE_CONTAINER = {
      padding: 20,
    }

    return (
      <div style={STYLE_CONTAINER}>
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
