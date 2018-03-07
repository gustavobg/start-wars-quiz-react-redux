import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      timer: null,
      counter: props.remainingTime
    }
  }
  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  tick = () => {
    const next = this.state.counter - 1;
    this.setState({
      counter: next
    });
    this.props.onTimeChange(next);
    if (next === 0) {
      clearInterval(this.state.timer);
    }
  };

  render() {
    return (
      <div>{this.state.counter}</div>
    )
  }
}

export default Timer;
