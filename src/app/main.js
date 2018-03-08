import React from 'react';
import ReactDOM from 'react-dom';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './configureStore';
import GameContainer from './quiz/GameContainer';

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif'
  }
});

const render = (Component) => {
  ReactDOM.render(
    <MuiThemeProvider theme={muiTheme}>
      <Component store={store} />
    </MuiThemeProvider>,
    document.getElementById('sw-app')
  );
};

render(GameContainer);
