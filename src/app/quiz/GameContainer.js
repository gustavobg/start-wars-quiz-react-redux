import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople, fetchPeopleInfo } from './fetchs';
import {
  addCorrectAnswer, addPenalty, addScore, changePage, closeInfo, endGame, openInfo, resetGame, startGame,
  timeChange
} from './reducers';
import { hot } from 'react-hot-loader';
import Game from './Game';

class GameContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.fetchPeople();
  }

  render() {
    return <Game {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPeople: () => {
      dispatch(fetchPeople());
    },
    openInfoModal: (id) => {
      dispatch(openInfo());
      dispatch(fetchPeopleInfo(id));
    },
    closeInfo: () => {
      dispatch(closeInfo());
    },
    addScore: (score) => {
      dispatch(addScore(score));
    },
    addCorrectAnswer: (answer) => {
      dispatch(addCorrectAnswer(answer));
    },
    addPenalty: (answer) => {
      dispatch(addPenalty(answer));
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
      dispatch(startGame());
    },
    endGame: () => {
      dispatch(endGame());
    },
    resetGame: () => {
      dispatch(resetGame());
    },
    onSubmitFormSuccess: (values) => {
      localStorage.setItem(values.playerName, values.playerEmail);
    },
    onSubmitFormError: () => {}
  };
};

const mapStateToProps = (state) => {
  const charactersAnswer = state.quiz.charactersAnswer;
  const pageSize = 10;
  const {
    charactersList,
    correctCharacterAnswerList,
    penaltyCharacterAnswerList,
    page,
    count,
    isFetchingInfo,
    isFetching,
    infoOpen,
    characterInfo
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
    characterInfo,
    isFetching,
    pageSize,
    correctCharacterAnswerList,
    penaltyCharacterAnswerList,
    remainingTime,
    gameStarted,
    gameEnded,
    playerScore,
    infoOpen,
    isFetchingInfo,
    initialValues: {
      playerName,
      playerEmail
    }
  };
};

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer));
