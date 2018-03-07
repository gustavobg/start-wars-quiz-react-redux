import React from 'react';
import { connect } from "react-redux";
import { fetchPeople } from "./fetchs";
import { addCorrectAnswer, addScore, changePage, endGame, startGame, timeChange } from './reducers';
import CharacterAnswer from './CharacterAnswer';
import Pagination from '../shared/Pagination';
import Timer from '../shared/Timer';
import { Button, TextField } from 'material-ui';
import withFormValidate from '../shared/withFormValidate';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.fetchPeople();
  }

  render() {
    const {
      people,
      page,
      count,
      onChangePage,
      isFetching,
      pageSize,
      correctCharacterAnswerList,
      addCorrectAnswer,
      addScore,
      remainingTime,
      onTimeChange,
      gameStarted,
      gameEnded,
      startGame,
      playerScore
    } = this.props;

    return (
      <div>
        {gameStarted ? (
          <div>
            <Timer remainingTime={remainingTime} onTimeChange={onTimeChange} />
            {people.map((character) =>
              <CharacterAnswer
                addCorrectAnswer={addCorrectAnswer}
                correctCharacterAnswerList={correctCharacterAnswerList}
                addScore={addScore}
                character={character}
                key={character.name}
              />
            )}
            <Pagination isFetching={isFetching} page={page} pageSize={pageSize} count={count} onChangePage={onChangePage} />
          </div>
        ) : (
          <div>
            {gameEnded ? (
              <EndGame {...this.props} />
            ) : (
              <div>
                Olá!!! Clica pra começar
                <Button variant="raised" onClick={startGame}>Começar o jogo</Button>
              </div>
            )}
          </div>
        )}

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPeople: () => {
      dispatch(fetchPeople());
    },
    addScore: (score) => {
      dispatch(addScore(score));
    },
    addCorrectAnswer: (answer) => {
      dispatch(addCorrectAnswer(answer));
    },
    onChangePage: (page) => {
      dispatch(changePage(page));
      dispatch(fetchPeople());
    },
    onTimeChange: (time) => {
      dispatch(timeChange(time));
      if (time === 0) {
        dispatch(endGame());
      }
    },
    startGame: () => {
      dispatch(startGame())
    },
    endGame: () => {
      dispatch(endGame())
    },
    onSubmitFormSuccess: (values) => {

    },
    onSubmitFormError: (values, errors) => {
    },
  }
};

const mapStateToProps = (state) => {
  const charactersAnswer = state.quiz.charactersAnswer;
  const pageSize = 10;
  const {
    charactersList,
    correctCharacterAnswerList,
    page,
    count,
    isFetching,
  } = charactersAnswer;

  const {
    remainingTime,
    gameStarted,
    gameEnded,
    playerScore,
    playerName,
    playerEmail
  } = state.quiz.gameInfo;

  return {
    people: charactersList,
    page,
    count,
    isFetching,
    pageSize,
    correctCharacterAnswerList,
    remainingTime,
    gameStarted,
    gameEnded,
    playerScore,
    initialValues: {
      playerName,
      playerEmail
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
