import React from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { formatFrenchDate, formatFrenchDateTime, formatFrenchDuration } from '../../../../../data/datetime';
import { buildDownloadUrl } from '../../../../../data/document';
import ConfirmDialog from '../../../../../components/ConfirmDialog';
import DatePicker from '../../../../../components/DatePicker';
import FileUploadDialog from '../../../../../components/FileUploadDialog';

export default class DeliverableDetails extends React.Component {
  state = {
    deleteConfirmOpen: false,
    uploadDeliverableDialogOpen: false,
    editMode: false,
    unsavedNameEdit: null,
    unsavedAssignmentEdit: null,
    unsavedBeginningEdit: null,
    unsavedEndEdit: null,
  };

  openDeleteConfirm = () => {
    this.setState({ deleteConfirmOpen: true });
  };

  closeDeleteConfirm = () => {
    this.setState({ deleteConfirmOpen: true });
  };

  openUploadDeliverableDialog = () => {
    this.setState({ uploadDeliverableDialogOpen: true });
  };

  closeUploadDeliverableDialog = () => {
    this.setState({ uploadDeliverableDialogOpen: false });
  };

  switchToEditMode = () => {
    const { deliverable } = this.props;
    this.setState({
      editMode: true,
      unsavedNameEdit: deliverable.name,
      unsavedAssignmentEdit: deliverable.assignment,
      unsavedBeginningEdit: deliverable.deliveryWindow.beginning,
      unsavedEndEdit: deliverable.deliveryWindow.end,
    });
  };

  saveChanges = () => {
    const { unsavedNameEdit, unsavedBeginningEdit, unsavedAssignmentEdit, unsavedEndEdit } = this.state;
    const dto = {
      name: unsavedNameEdit,
      assignment: unsavedAssignmentEdit,
      deliveryWindowBeginning: unsavedBeginningEdit,
      deliveryWindowEnd: unsavedEndEdit,
    };

    this.props.updateDeliverable(dto);
  };

  cancelChanges = () => {
    this.setState({
      editMode: false,
      unsavedNameEdit: null,
      unsavedAssignmentEdit: null,
      unsavedBeginningEdit: null,
      unsavedEndEdit: null,
    });
  };

  render() {
    const { deliverable, canDeliverDeliverable } = this.props;

    const deliveryBeginning = (deliverable.deliveryWindow && deliverable.deliveryWindow.beginning) ?
      formatFrenchDateTime(deliverable.deliveryWindow.beginning)
      :
      "Pas de date d'ouverture choisie";
    const deliveryDeadline = (deliverable.deliveryWindow && deliverable.deliveryWindow.end) ?
      formatFrenchDateTime(deliverable.deliveryWindow.end)
      :
      "Pas de date de fermeture choisie";

    return (
      <div>
        <ConfirmDialog
          open={this.state.deleteConfirmOpen}
          title={"Supprimer le livrable ?"}
          text={"Voulez-vous vraiment supprimer le livrable " + deliverable.name + " ?"}
          confirmText={"Supprimer"}
          cancelText={"Annuler"}
          onCancel={this.closeDeleteConfirm}
          onConfirm={this.props.deleteDeliverable} />

        <Grid container>
          <Grid item xs={12} sm={6}>
            <h3>
            {
              this.state.editMode ?
                <input
                  style={{ padding: 5, fontSize: 15 }}
                  type="text"
                  onChange={e => this.setState({ unsavedNameEdit: e.target.value })}
                  value={this.state.unsavedNameEdit} />
                :
                deliverable.name
            }
            </h3>
          </Grid>

          {
            this.props.canEditDeliverable &&
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

        <h4>Consigne</h4>
        {
          this.state.editMode ?
            <textarea
              placeholder={"Rédigez ici la consigne du livrable"}
              rows={5}
              value={this.state.unsavedAssignmentEdit || ""}
              style={{ width: '100%', resize: 'vertical' }}
              onChange={(e) => this.setState({ unsavedAssignmentEdit: e.target.value })} />
            :
            <p>{ deliverable.assignment || "Aucune consigne ajoutée pour ce livrable" }</p>
        }

        <h4>Boîte de dépôt :</h4>
        <ul>
          <li>
            <strong>Ouverture&nbsp;:&nbsp;</strong>
            {
              this.state.editMode ?
                <DatePicker value={this.state.unsavedBeginningEdit} onChange={v => this.setState({unsavedBeginningEdit: v})} />
                :
                deliveryBeginning
            }
          </li>
          <li><strong>Fermeture&nbsp;:&nbsp;</strong>
            {
              this.state.editMode ?
                <DatePicker value={this.state.unsavedEndEdit} onChange={v => this.setState({unsavedEndEdit: v})} />
                :
                deliveryDeadline
            }
          </li>
        </ul>

        <h4>Livraison</h4>

        { canDeliverDeliverable &&
          <FileUploadDialog
            open={this.state.uploadDeliverableDialogOpen}
            onSelectFile={this.props.deliverDeliverable}
            onRequestClose={this.closeUploadDeliverableDialog}
          />
        }

        {
          deliverable.document &&
            <span>
              Ajouté le { formatFrenchDateTime(deliverable.document.uploadedAt) }
              &nbsp;-&nbsp;
              <Button>
                <a href={buildDownloadUrl(deliverable.document)}>Télécharger</a>
              </Button>
            </span>
        }
        {
          canDeliverDeliverable &&
            <Button onClick={this.openUploadDeliverableDialog}>
              {
                deliverable.document ?
                  "Remplacer"
                  :
                  "Ajouter le livrable"
              }
            </Button>
        }
      </div>
    )
  }
}
