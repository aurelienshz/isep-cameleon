import React from 'react';

import Button from 'material-ui/Button';
import { formatFrenchDate, formatFrenchDateTime, formatFrenchDuration } from '../../../../../data/datetime';

export default class MeetingDetails extends React.Component {
  render() {
    const { meeting } = this.props;
    const date = formatFrenchDate(meeting.timeslot.beginning);
    const begin = formatFrenchDateTime(meeting.timeslot.beginning);
    const end = formatFrenchDateTime(meeting.timeslot.end);
    const duration = formatFrenchDuration(meeting.timeslot.end - meeting.timeslot.beginning);
    return (
      <div>
        <h3>Réunion du { date }</h3>

        <h4>Créneau :</h4>
        <ul>
          <li><strong>Durée :</strong> {duration}</li>
          <li><strong>Début :</strong> {begin}</li>
          <li><strong>Fin :</strong> {end}</li>
        </ul>

        <h4>Participants :</h4>
        <div>
          <ul>
            {
              meeting.attendees.map((attendee, index) => (
                <li key={index}>{attendee.firstName} {attendee.lastName}</li>
              ))
            }
          </ul>
        </div>

        <h4>Compte-rendu</h4>

        {
          Boolean(meeting.report) ?
            <span>
              Ajouté le 24 avril 2017
              <Button>Télécharger</Button>
            </span>
            :
            <Button>Ajouter le compte-rendu</Button>
        }
      </div>
    )
  }
}
