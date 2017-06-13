import React from 'react';
import { NavLink } from 'react-router-dom';
import {createStyleSheet} from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import FaceIcon from 'material-ui-icons/Face';

const styleSheet = createStyleSheet('SubjectList', (theme) => ({
  chip: {
    margin: theme.spacing.unit,
  },
  svgIcon: {
    color: 'gray',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    marginBottom: 20,
  },
  clientsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
}));

export default function SubjectList(props, context) {
  const {
    subjects,
    onClickFeatures,
    showAssignToClient,
    onClickAssignClient,
    userId
  } = props;

  const classes = context.styleManager.render(styleSheet);
  return (
    <Grid>
      {
        subjects.map((subject) => {
          const showFeatures = subject.client && subject.client.id === userId;
          return (
            <Card className={classes.card} key={subject.id}>
              <CardContent>
                <Typography type="headline" component="h2">
                  <NavLink to={"/subject/" + subject.id}>
                    {subject.name}
                  </NavLink>
                </Typography>
                <p dangerouslySetInnerHTML={{ __html: subject.description }} />
                {
                  subject.client &&
                  <div className={classes.clientsRow}>
                    <div>Client :</div>
                    <Chip
                      avatar={<Avatar><FaceIcon style={{ color: 'gray' }}/></Avatar>}
                      label={subject.client.firstName + ' ' + subject.client.lastName}
                      style={{ margin: 8 }}
                    />
                    <div><Button onClick={() => onClickAssignClient(subject.id)}>Modifier</Button></div>
                  </div>
                }
              </CardContent>
              {
                showAssignToClient && !subject.client &&
                <CardActions>
                  <Button raised onClick={() => onClickAssignClient(subject.id)} primary>Assigner un client</Button>
                </CardActions>
              }
            </Card>
          );
        })
      }
    </Grid>
  )
}

SubjectList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
