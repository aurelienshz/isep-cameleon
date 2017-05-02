import React from 'react';
import {createStyleSheet} from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Layout from 'material-ui/Layout';
import {Card, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Text from 'material-ui/Text';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

import FaceIcon from 'material-ui-icons/Face';

const members = [
  {name: 'Mickael Petit'},
  {name: 'Aurélien Schiltz'},
  {name: 'Yvan Bézard'},
];

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
            label={member.name}
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
    <Layout>
      {
        teams.map((team) => {
          return (
            <Card className={classes.card} key={team.id}>
              <CardContent>
                <Text type="headline" component="h2">{team.name}</Text>
                <MembersRow members={members} styleClasses={classes} />
              </CardContent>
              <CardActions>
                <Button onClick={() => onRequestJoin(team.id)} primary>Rejoindre l'équipe</Button>
              </CardActions>
            </Card>
          );
        })
      }
    </Layout>
  )
}

TeamList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
