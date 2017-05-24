import React from 'react';

import Dialog from 'material-ui/Dialog';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';
import './DatePicker.css';

import moment from 'moment';
import { formatFrenchDateTime } from '../../data/datetime';

const styleSheet = createStyleSheet('DatePicker', {
  dialog: {
    width: 362, // comes from internal moment date/time picker
  },
  wrapper: {
    cursor: 'pointer',
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid gray',
    }
  }
});

class DatePicker extends React.Component {
  state = {
    moment: undefined,
    open: false,
  };

  componentWillMount() {
    moment.locale('fr');
    if (this.props.value) {
      const m = moment(this.props.value);
      this.setState({
        moment: m,
      });
    } else {
      const m = moment(Date.now());
      this.setState({
        moment: m,
      });
    }
  }

  handleChange = (moment) => {
    this.setState({ moment });
  };

  handleSave = () => {
    this.props.onChange(this.state.moment.unix() * 1000);
    this.closeDialog();
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props.classes;
    return (
      <span>
        <Dialog open={this.state.open} onRequestClose={this.closeDialog} paperClassName={classes.dialog}>
          <InputMoment
            moment={this.state.moment}
            onChange={this.handleChange}
            onSave={this.handleSave}
            prevMonthIcon="input-moment-arrow-left" // default
            nextMonthIcon="input-moment-arrow-right" // default
          />
        </Dialog>

        <span onClick={this.openDialog} className={classes.wrapper}>
          { this.props.value ?
            this.state.moment.format("dddd Do MMMM YYYY HH:mm")
            :
            "Cliquer pour sélectionner une date"
          }
        </span>
      </span>

    )
  }
}

export default withStyles(styleSheet)(DatePicker);
