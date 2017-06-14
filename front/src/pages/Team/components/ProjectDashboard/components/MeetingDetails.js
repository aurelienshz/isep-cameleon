import React from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Dialog from 'material-ui/Dialog';
import { formatFrenchDate, formatFrenchDateTime, formatFrenchDuration, formatExactFrenchDuration } from '../../../../../data/datetime';
import ConfirmDialog from '../../../../../components/ConfirmDialog';
import DatePicker from '../../../../../components/DatePicker';
import { buildDownloadUrl } from '../../../../../data/document';
import FileUploadDialog from "../../../../../components/FileUploadDialog";
import colors from "../../../../../colors";

import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const STYLE_APPBAR = {
  position: 'fixed',
  height: 64,
  backgroundColor: colors.ISEP_PRIMARY,
};

const STYLE_FLEX = {
  flex: 1,
};

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
    uploadMeetingReportDialogOpen: false,
    featuresDiscoveryDialogOpen: false,
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

  openUploadMeetingReportDialog = () => {
    this.setState({ uploadMeetingReportDialogOpen: true });
  };

  closeUploadMeetingReportDialog = () => {
    this.setState({ uploadMeetingReportDialogOpen: false });
  };

  render() {
    const { meeting, canUploadMeetingReport, uploadMeetingReport, deleteMeeting, canEditMeeting } = this.props;
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
          onConfirm={deleteMeeting} />

        <Dialog
          fullScreen
          open={this.state.featuresDiscoveryDialogOpen}>

          <AppBar style={STYLE_APPBAR}>
            <Toolbar>
              <IconButton contrast onClick={() => this.setState({ featuresDiscoveryDialogOpen: false })}>
                <CloseIcon />
              </IconButton>
              <Typography type="title" colorInherit style={STYLE_FLEX}>Fonctionnalités</Typography>
            </Toolbar>
          </AppBar>

          <div style={{ paddingTop: 64, overflowX: 'auto' }}>
            <div style={{ padding: 20 }}>
              <p>Pas d'inquiétude ! Vos modifications sont sauvegardées automatiquement !</p>

              { this.props.project.subject.featureCategories.map(fc => {
                return (
                  <div>
                    <h4>{ fc.name }</h4>
                    <ul>
                      {
                        fc.features.map(feature => {
                          console.log(feature);
                          if (!feature) return null;
                          return (<li>{feature.name} - <Button>Marquer comme découverte</Button></li>)
                        })
                      }
                    </ul>
                  </div>
                )
              }) }
            </div>
          </div>

        </Dialog>


        {
          canUploadMeetingReport &&
            <FileUploadDialog
              open={this.state.uploadMeetingReportDialogOpen}
              onSelectFile={uploadMeetingReport}
              onRequestClose={this.closeUploadMeetingReportDialog} />
        }

        <Grid container>
          <Grid item xs={12} sm={6}>
            <h3>Réunion du { date }</h3>
          </Grid>


          {
            canEditMeeting &&
            <Grid item xs={12} sm={6}>
              <div style={{textAlign: 'right'}}>
                {
                  this.state.editMode ?
                    <span>
                      <Button raised onClick={this.saveChanges}>Enregistrer</Button>
                      <Button raised onClick={this.cancelChanges}>Annuler</Button>
                    </span>
                  :
                    <Button raised onClick={this.switchToEditMode}>Modifier</Button>
                }
                {
                  !this.state.editMode && <Button raised onClick={this.openDeleteConfirm}>Supprimer</Button>
                }
              </div>
            </Grid>
          }
        </Grid>


        { !hasEnded &&
          <div>
            Réunion en cours
            <Button raised onClick={ this.terminateMeeting }>Terminer la réunion</Button>
          </div>
        }

        { canEditMeeting &&
          <div style={{ padding: 10}}>
            <Button raised onClick={() => this.setState({ featuresDiscoveryDialogOpen: true })}>Fonctionnalités</Button>
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
          Boolean(meeting.report) &&
            <span>
              Ajouté le { formatFrenchDateTime(meeting.report.uploadedAt) }
              <a href={buildDownloadUrl(meeting.report)}><Button raised>Télécharger</Button></a>
            </span>
        }

        { canUploadMeetingReport &&
            <Button raised onClick={this.openUploadMeetingReportDialog}>
              { meeting.report ? "Remplacer" : "Ajouter le compte-rendu" }
            </Button>
        }
      </div>
    )
  }
}
