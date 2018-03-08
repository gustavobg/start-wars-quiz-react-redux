import React from 'react';
import { IconButton, TextField } from 'material-ui';
import InfoIcon from 'material-ui-icons/HelpOutline';
import LoadingWrapper from '../shared/LoadingWrapper';

function friendlyName(name) {
  return name.replace(/\s/gi, '-').toLowerCase();
}
function friendlyNameCompare(string) {
  return friendlyName(string).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

class CharacterAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpPenalty: props.penaltyCharacterAnswerList.indexOf(friendlyNameCompare(props.character.name)) >= 0,
      isDone: props.correctCharacterAnswerList.indexOf(friendlyNameCompare(props.character.name)) >= 0
    };
  }
  setHelpPenalty() {
    if (!this.state.helpPenalty) {
      const characterName = friendlyNameCompare(this.props.character.name);
      this.setState({
        helpPenalty: true
      });
      this.props.addPenalty(characterName);
    }
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


    let imagePath = `/dev-assets/images/characters/${friendlyName(name)}.jpg`;

    // correria
    if (process.env.NODE_ENV === 'production') {
      imagePath = `images/characters/${friendlyName(name)}.jpg`;
    }

    return (
      <div className="card-container">
        <div className="card">
          <LoadingWrapper isFetching={this.props.isFetching}>
            <div className="info-button">
              <IconButton onClick={() => {
                this.setHelpPenalty();
                this.props.openInfo(this.props.id);
              }}>
                <InfoIcon />
              </IconButton>
            </div>
            <img src={imagePath} />
            <div className="character-input">
              {this.state.isDone ? (
                <p>Acertou, é <strong>{name}</strong>!</p>
              ) : (
                <TextField label="Quem sou eu?" onChange={this.changeName} />
              )}
            </div>
          </LoadingWrapper>
        </div>
      </div>
    );
  }
}

export default CharacterAnswer;
