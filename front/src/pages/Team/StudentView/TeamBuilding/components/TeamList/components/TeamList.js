import React from 'react';
import {createStyleSheet} from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

import FaceIcon from 'material-ui-icons/Face';

const styleSheet = createStyleSheet('TeamList', (theme) => ({
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
}));

const MembersRow = function({ members, styleClasses }) {
  return (
    <div className={styleClasses.row}>
      {
        members.map((member, index) => (
          <Chip
            key={index}
            avatar={<Avatar><FaceIcon className={styleClasses.svgIcon}/></Avatar>}
            label={member.firstName + " " + member.lastName}
            className={styleClasses.chip}
          />
        ))
      }
    </div>
  )
};

export default function TeamList({ teams, onRequestJoin }, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <Grid>
      {
        teams.map((team) => {
          return (
            <Card className={classes.card} key={team.id}>
              <CardContent>
                <Typography type="headline" component="h2">{team.name}</Typography>
                <MembersRow members={team.members} styleClasses={classes} />
              </CardContent>
              <CardActions>
                <Button onClick={() => onRequestJoin(team.id)} primary>Rejoindre l'équipe</Button>
              </CardActions>
            </Card>
          );
        })
      }
      {
        !Boolean(teams.length) &&
          <div style={{textAlign: "center"}}>Aucune équipe n'a été créée pour l'instant !</div>
      }
    </Grid>
  )
}

TeamList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
