import { receiveCharacterInfo, receiveCharacters, requestCharacterInfo, requestCharacters } from './reducers';

export const fetchPeople = () => {
  return (dispatch, getState) => {
    dispatch(requestCharacters());

    const page = getState().quiz.charactersAnswer.page;

    return fetch(`https://swapi.co/api/people/?page=${page}`, {})
    .then((response) => {
      if (response.status > 400) {
        throw new Error()
      } else {
        return response.json();
      }
    })
    .then(data => {
      dispatch(receiveCharacters(data.results, data.count));
    })
    .catch(err => {
      console.log(err);
    });
  };
};

export const fetchPeopleInfo = (peopleId) => {
  return (dispatch, getState) => {
    dispatch(requestCharacterInfo());

    const page = getState().quiz.charactersAnswer.page;

    return fetch(`https://swapi.co/api/people/${peopleId}?page=${page}`, {})
      .then((response) => {
        if (response.status > 400) {
          throw new Error()
        } else {
          return response.json();
        }
      })
      .then(data => {
        dispatch(receiveCharacterInfo(data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

