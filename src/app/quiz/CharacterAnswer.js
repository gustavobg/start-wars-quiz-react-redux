import React from 'react';
import { Paper, TextField, withStyles } from 'material-ui';

function friendlyName(name) {
  return name.replace(/\s/gi, '-').toLowerCase();
}
function friendlyNameCompare(string) {
  return friendlyName(string).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

class CharacterAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpPenalty: false,
      isDone: props.correctCharacterAnswerList.indexOf(friendlyNameCompare(props.character.name)) >= 0
    }
  }
  setHelpPenalty() {
    this.setState({
      helpPenalty: true
    })
  }
  changeName = (e) => {
    const playerAnswer = friendlyNameCompare(e.target.value);
    const correctAnswer = friendlyNameCompare(this.props.character.name);

    if (playerAnswer === correctAnswer) {
      this.setState({ isDone: true });
      this.props.addScore(this.state.helpPenalty ? 5 : 10);
      this.props.addCorrectAnswer(correctAnswer);
    }
  };
  render() {
    const {
      name
    } = this.props.character;

    const imagePath = `/dev-assets/images/characters/${friendlyName(name)}.jpg`;

    return (
      <Paper className="card">
        <img src={imagePath} />
        {this.state.isDone ? (
          <p>Acertô mizerávi, é <strong>{name}</strong></p>
        ) : (
          <TextField label="Quem sou eu?" onChange={this.changeName} />
        )}
      </Paper>
    )
  }
}

export default CharacterAnswer;
