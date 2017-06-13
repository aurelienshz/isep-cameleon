import React from 'react';
import Card from "material-ui/Card";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";

import { formatFrenchDateTime, formatFrenchDate } from "../../../../data/datetime";
import Loader from "../../../../components/Loader";

const Message = ({ message }) => {
  const { sender, sentAt, message: messageText } = message;
  return (
    <Card style={{backgroundColor: 'white', padding: 16, marginBottom: 20 }}>
      <Grid container>
        <Grid item sm={3} xs={4}>
          <div style={{ textAlign: 'right' }}>
            <h4>{ sender.firstName } { sender.lastName }</h4>
            <p>{ formatFrenchDateTime(sentAt) }</p>
          </div>
        </Grid>
        <Grid item sm={9} xs={8}>
          <p>{ messageText }</p>
        </Grid>
      </Grid>
    </Card>
  );
};

export default class Messenger extends React.Component {
  state = {
    message: "",
  };

  sendMessage = () => {
    if (this.state.message.length === 0) return;
    const { projectId } = this.props;
    const messageDto = {
      content: this.state.message,
    };
    this.props.sendMessage(projectId, messageDto);
  };

  render() {
    const { loading, project } = this.props;
    let sortedMessages;

    if (!loading && project) sortedMessages = project.messages.sort((m1, m2) => m2.sentAt - m1.sentAt);

    return (
      <div style={{ padding: 16 }}>
        <h3>Messagerie</h3>

        <Grid container>
          <Grid item md={2} sm={0} />
          <Grid item md={8} sm={12}>
            <textarea placeholder={"Écrire un nouveau message..."}
                      value={this.state.message}
                      onChange={(e) => this.setState({ message: e.target.value })}
                      rows={5}
                      style={{ width: '100%', resize: 'vertical', padding: 8 }}>
            </textarea>
            <div style={{ textAlign: 'center', padding: 20 }}>
              <Button primary raised disabled={loading} onClick={this.sendMessage}>Envoyer</Button>
            </div>
          </Grid>
        </Grid>

        { loading ?
          <Loader />
          :
          sortedMessages.map((message, index) => <Message key={index} message={message} />)
        }

        {
          !loading && sortedMessages.length === 0 &&
            <div style={{ textAlign: 'center' }}>Aucun message</div>
        }
      </div>
    )
  }
}
