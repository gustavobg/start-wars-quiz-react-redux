import { combineReducers } from 'redux';
import * as c from './constants';

// game constants
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const RESET_GAME = 'RESET_GAME';
export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO'; // name and e-mail
export const CHANGE_REMAINING_TIME = 'CHANGE_REMAINING_TIME';
export const ADD_PLAYER_SCOREBOARD = 'ADD_PLAYER_SCOREBOARD';
export const ADD_SCORE = 'ADD_SCORE';
export const TIME_CHANGE = 'TIME_CHANGE';

// game actions
export const addScore = (score) => ({
  type: ADD_SCORE,
  score
});

export const startGame = () => ({
  type: START_GAME
});

export const resetGame = () => ({
  type: RESET_GAME
});

export const endGame = () => ({
  type: END_GAME
});

export const timeChange = (time) => ({
  type: TIME_CHANGE,
  time
});


const gameInit = {
  remainingTime: 200, // seconds
  gameStarted: false,
  gameEnded: false,
  playerName: '',
  playerEmail: '',
  playerScore: 0,
  scoreBoard: []
};

const gameReducer = (state = gameInit, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...state,
      playerScore: state.playerScore + action.score
    };
  case START_GAME:
    return {
      ...state,
      gameStarted: true
    };
  case END_GAME:
    return {
      ...state,
      gameStarted: false,
      gameEnded: true
    };
  case RESET_GAME:
    return {
      ...state,
      gameStarted: false,
      gameEnded: false,
      remainingTime: 120,
      playerName: '',
      playerEmail: '',
      playerScore: 0
    };
  case TIME_CHANGE:
    return {
      ...state,
      remainingTime: action.time
    };
  default:
    return state;
  }
};


// character quiz constants
export const REQUEST_CHARACTERS = 'REQUEST_CHARACTERS';
export const REQUEST_CHARACTER_INFO = 'REQUEST_CHARACTER_INFO';
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const ADD_CORRECT_ANSWER = 'ADD_CORRECT_ANSWER';
export const ADD_PENALTY = 'ADD_PENALTY';
export const RECEIVE_CHARACTER_INFO = 'RECEIVE_CHARACTER_INFO';
export const OPEN_INFO = 'OPEN_INFO';
export const CLOSE_INFO = 'CLOSE_INFO';

// character quiz actions
export const openInfo = () => ({
  type: OPEN_INFO
});

export const closeInfo = () => ({
  type: CLOSE_INFO
});

export const requestCharacters = () => ({
  type: REQUEST_CHARACTERS
});

export const requestCharacterInfo = () => ({
  type: REQUEST_CHARACTER_INFO
});

export const addCorrectAnswer = (answer) => ({
  type: ADD_CORRECT_ANSWER,
  answer
});

export const addPenalty = (penalty) => ({
  type: ADD_PENALTY,
  penalty
});

export const receiveCharacters = (data, count) => ({
  type: RECEIVE_CHARACTERS,
  data,
  count
});

export const receiveCharacterInfo = (data) => ({
  type: RECEIVE_CHARACTER_INFO,
  data
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page
});

const characterQuiz = {
  charactersList: [],
  correctCharacterAnswerList: [],
  penaltyCharacterAnswerList: [],
  characterInfo: null,
  isFetching: false,
  isFetchingInfo: false,
  infoOpen: false,
  page: 1,
  count: 0
};

const charactersAnswerReducer = (state = characterQuiz, action) => {
  switch (action.type) {
  case CHANGE_PAGE:
    return {
      ...state,
      page: action.page
    };
  case REQUEST_CHARACTERS:
    return {
      ...state,
      isFetching: true
    };
  case REQUEST_CHARACTER_INFO:
    return {
      ...state,
      isFetchingInfo: true
    };
  case OPEN_INFO:
    return {
      ...state,
      infoOpen: true
    };
  case CLOSE_INFO:
    return {
      ...state,
      infoOpen: false
    };
  case RECEIVE_CHARACTER_INFO:
    return {
      ...state,
      isFetchingInfo: false,
      characterInfo: action.data
    };
  case RECEIVE_CHARACTERS:
    return {
      ...state,
      isFetching: false,
      charactersList: action.data,
      count: action.count
    };
  case ADD_CORRECT_ANSWER:
    return {
      ...state,
      correctCharacterAnswerList: [...state.correctCharacterAnswerList, action.answer]
    };
  case ADD_PENALTY:
    return {
      ...state,
      penaltyCharacterAnswerList: [...state.penaltyCharacterAnswerList, action.penalty]
    };
  default:
    return state;
  }
};

export default combineReducers({
  charactersAnswer: charactersAnswerReducer,
  gameInfo: gameReducer
  // game: gameReducer
});
