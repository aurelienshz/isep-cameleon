// @flow

import React, { Component } from 'react';
import { LinearProgress } from 'material-ui/Progress';

const STYLE_ROOT = {
  width: '100%',
  marginTop: 30,
}

export default class Loader extends Component {
  state = {
    completed: 0,
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer: number

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: completed + diff });
    }
  }

  render() {
    return (
      <div style={STYLE_ROOT}>
        <LinearProgress mode="determinate" value={this.state.completed} />
      </div>
    );
  }
}
