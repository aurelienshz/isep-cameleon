import React from 'react';
import {createStyleSheet} from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import colors from '../colors';

const styleSheet = createStyleSheet('Chips', (theme) => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: colors.ISEP_SECONDARY_LIGHTER,
    zIndex: 998,
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    '&:hover': {
      background: colors.ISEP_SECONDARY,
    }
  },
}));

export default function FloatingActionButton(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const Icon = props.icon || AddIcon;
  return (
    <Button fab primary className={classes.button} onClick={props.onClick}>
      <Icon />
    </Button>
  )
}

FloatingActionButton.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
