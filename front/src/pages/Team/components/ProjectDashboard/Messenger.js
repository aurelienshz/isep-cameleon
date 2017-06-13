import React from 'react';
import Card from "material-ui/Card";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";

export default class Messenger extends React.Component {
  render() {
    return (
      <div style={{ padding: 16 }}>
        <h3>Messagerie</h3>

        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8} offset={2}>
            <textarea placeholder={"Écrire un nouveau message..."}
                      rows={5}
                      style={{ width: '100%', resize: 'vertical' }}>
            </textarea>
            <div style={{ textAlign: 'center', padding: 20 }}>
              <Button primary raised>Envoyer</Button>
            </div>
          </Grid>
        </Grid>

        <Card style={{backgroundColor: 'white', padding: 16, marginBottom: 20 }}>
          <Grid container>
            <Grid item sm={3} xs={4}>
              <div style={{ textAlign: 'right' }}>
                <h4>Zakia KAZI-AOUL</h4>
                <p>09/02/1234 56:78</p>
              </div>
            </Grid>
            <Grid item sm={9} xs={8}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, eum neque quam similique soluta
                tempore veniam. A accusantium, amet, debitis dolore dolorum eos iste, laboriosam
                mollitia optio repudiandae suscipit tempore!</p>
            </Grid>
          </Grid>
        </Card>

        <Card style={{backgroundColor: 'white', padding: 16 }}>
          <Grid container>
            <Grid item sm={3} xs={4}>
              <div style={{ textAlign: 'right' }}>
                <h4>Zakia KAZI-AOUL</h4>
                <p>09/02/1234 56:78</p>
              </div>
            </Grid>
            <Grid item sm={9} xs={8}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, eum neque quam similique soluta
                tempore veniam. A accusantium, amet, debitis dolore dolorum eos iste, laboriosam
                mollitia optio repudiandae suscipit tempore!</p>
            </Grid>
          </Grid>
        </Card>
      </div>
    )
  }
}
