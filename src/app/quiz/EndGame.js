import React from 'react';
import withFormValidate from '../shared/withFormValidate';
import { Button, TextField } from 'material-ui';

export const validate = (v) => {
  const err = {};

  if (v.playerName.length === 0) {
    err.playerName = 'Informe seu nome';
  }

  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (v.playerEmail.length === 0) {
    err.playerEmail = 'Informe seu e-mail';
  } else if (!regexEmail.test(String(v.playerEmail).toLowerCase())) {
    err.playerEmail = 'Informe um e-mail válido';
  }

  return err;
};


const EndGame = (props) => {
  const {
    input,
    onChangeInput,
    validateErrors,
    handleSubmit
  } = props.form;

  const {
    playerScore,
    resetGame
  } = props;

  return (
    <div id="sw-endGame">
      <div style={{ marginBottom: '10px' }}>
        O JOGO ACABOU!<br />
        Você conseguiu {playerScore}
      </div>
      <form className="sw-form" onSubmit={handleSubmit}>
        <TextField
          name="playerName"
          value={input.playerName}
          label="Seu nome"
          onChange={(e) => {
            onChangeInput('playerName', e.target.value);
          }}
          helperText={validateErrors.playerName}
          error={validateErrors.playerName && validateErrors.playerName.length > 0}
        />
        <TextField
          name="playerEmail"
          value={input.playerEmail}
          label="Seu e-mail"
          onChange={(e) => {
            onChangeInput('playerEmail', e.target.value);
          }}
          helperText={validateErrors.playerEmail}
          error={validateErrors.playerEmail && validateErrors.playerEmail.length > 0}
        />
        <input type="hidden" value={playerScore} />
        <Button type="submit" onClick={resetGame} color="primary" variant="raised">Salvar</Button>
        <Button style={{ marginTop: '10px' }} onClick={resetGame} color="primary">Jogar novamente</Button>
      </form>
    </div>
  );
};

export default withFormValidate(EndGame, { validate });
