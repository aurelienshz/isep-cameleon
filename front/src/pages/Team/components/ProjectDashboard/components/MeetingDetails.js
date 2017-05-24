import React from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { formatFrenchDate, formatFrenchDateTime, formatFrenchDuration, formatExactFrenchDuration } from '../../../../../data/datetime';
import ConfirmDialog from '../../../../../components/ConfirmDialog';
import DatePicker from '../../../../../components/DatePicker';

export default class MeetingDetails extends React.Component {
  state = {
    timerInterval: null,
    currentEndTimestamp: 0,
    deleteConfirmOpen: false,
    editMode: false,
    unsavedBeginningEdit: null,
    unsavedEndEdit: null,
    unsavedCommentEdit: null,
    unsavedAttendeesEdit: null,
  };

  componentWillMount() {
    const { meeting } = this.props;
    const hasEnded = meeting.timeSlot.end !== null;
    if (!hasEnded) {
      const interval = setInterval(this.updateTimer, 1000);
      this.setState({
        currentEndTimestamp: Date.now(),
        timerInterval: interval
      });
    }
  }

  updateTimer = () => {
    this.setState({ currentEndTimestamp: Date.now() });
  };

  componentWillUnmount() {
    if (this.state.timerInterval !== null)
      clearInterval(this.state.timerInterval);
  }

  terminateMeeting = () => {
    const { meeting } = this.props;
    const attendeesIds = meeting.attendees.map(m => m.id);
    const { unsavedAttendeesEdit, unsavedBeginningEdit, unsavedCommentEdit, unsavedEndEdit } = this.state;
    const dto = this.state.editMode ?
      {
        beginning: unsavedBeginningEdit,
        end: Date.now(),
        comment: unsavedCommentEdit,
        attendees: unsavedAttendeesEdit,
      }
    :
      {
        beginning: meeting.timeSlot.beginning,
        end: Date.now(),
        comment: meeting.comment,
        attendees: attendeesIds,
      };
    this.props.updateMeeting(dto);
  };

  openDeleteConfirm = () => {
    this.setState({ deleteConfirmOpen: true });
  };

  closeDeleteConfirm = () => {
    this.setState({ deleteConfirmOpen: true });
  };

  switchToEditMode = () => {
    const { meeting } = this.props;
    this.setState({
      editMode: true,
      unsavedCommentEdit: meeting.comment,
      unsavedEndEdit: meeting.timeSlot.end,
      unsavedBeginningEdit: meeting.timeSlot.beginning,
      unsavedAttendeesEdit: meeting.attendees.map(m => m.id),
    });
  };

  saveChanges = () => {
    const { unsavedAttendeesEdit, unsavedBeginningEdit, unsavedCommentEdit, unsavedEndEdit } = this.state;
    const dto = {
      beginning: unsavedBeginningEdit,
      end: unsavedEndEdit,
      comment: unsavedCommentEdit,
      attendees: unsavedAttendeesEdit,
    };

    this.props.updateMeeting(dto);
  };

  cancelChanges = () => {
    this.setState({
      editMode: false,
      unsavedBeginningEdit: null,
      unsavedEndEdit: null,
      unsavedCommentEdit: null,
      unsavedAttendeesEdit: null,
    });
  };

  render() {
    const { meeting } = this.props;
    const date = formatFrenchDate(meeting.timeSlot.beginning);
    const begin = formatFrenchDateTime(meeting.timeSlot.beginning);

    const hasEnded = meeting.timeSlot.end !== null;
    const end = hasEnded ? formatFrenchDateTime(meeting.timeSlot.end) : "Réunion en cours";

    const duration = hasEnded ?
      formatFrenchDuration(meeting.timeSlot.end - meeting.timeSlot.beginning)
      :
      formatExactFrenchDuration(this.state.currentEndTimestamp - meeting.timeSlot.beginning, true);

    const editModeDuration = this.state.editMode ? formatFrenchDuration(this.state.unsavedEndEdit - this.state.unsavedBeginningEdit) : 0;

    return (
      <div>
        <ConfirmDialog
          open={this.state.deleteConfirmOpen}
          title={"Supprimer la réunion ?"}
          text={"Voulez-vous vraiment supprimer la réunion du " + date + " ?"}
          confirmText={"Supprimer"}
          cancelText={"Annuler"}
          onCancel={this.closeDeleteConfirm}
          onConfirm={this.props.deleteMeeting} />

        <Grid container>
          <Grid item xs={12} sm={6}>
            <h3>Réunion du { date }</h3>
          </Grid>

          {
            this.props.canEditMeeting &&
            <Grid item xs={12} sm={6}>
              <div style={{textAlign: 'right'}}>
                {
                  this.state.editMode ?
                    <span>
                      <Button onClick={this.saveChanges}>Enregistrer</Button>
                      <Button onClick={this.cancelChanges}>Annuler</Button>
                    </span>
                  :
                    <Button onClick={this.switchToEditMode}>Modifier</Button>
                }
                {
                  !this.state.editMode && <Button onClick={this.openDeleteConfirm}>Supprimer</Button>
                }
              </div>
            </Grid>
          }
        </Grid>

        { !hasEnded &&
          <div>
            Réunion en cours
            <Button onClick={ this.terminateMeeting }>Terminer la réunion</Button>
          </div>
        }

        <h4>Commentaire</h4>
        {
          this.state.editMode ?
            <textarea
              placeholder={"Commentaires, outils fournis lors de la réunion, appréciation globale..."}
              rows={5}
              value={this.state.unsavedCommentEdit || ""}
              style={{ width: '100%', resize: 'vertical' }}
              onChange={(e) => this.setState({ unsavedCommentEdit: e.target.value })} />
            :
            <p>{ meeting.comment || "Aucun commentaire ajouté à cette réunion" }</p>
        }

        <h4>Créneau :</h4>
        <ul>
          <li>
            <strong>Durée&nbsp;:&nbsp;</strong>
            {this.state.editMode ? editModeDuration : duration}
          </li>
          <li>
            <strong>Début&nbsp;:&nbsp;</strong>
            {
              this.state.editMode ?
                <DatePicker value={this.state.unsavedBeginningEdit} onChange={v => this.setState({unsavedBeginningEdit: v})} />
                :
                begin
            }
          </li>
          <li><strong>Fin&nbsp;:&nbsp;</strong>
            {
              this.state.editMode ?
                <DatePicker value={this.state.unsavedEndEdit} onChange={v => this.setState({unsavedEndEdit: v})} />
                :
                end
            }
          </li>
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
