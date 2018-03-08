import React, { Fragment } from 'react';
import CharacterAnswer from './CharacterAnswer';
import Pagination from '../shared/Pagination';
import Timer from '../shared/Timer';
import { Button, Dialog } from 'material-ui';
import EndGame from './EndGame';
import logo from '../../images/sw-logo.png';
import LoadingWrapper from '../shared/LoadingWrapper';
import '../scss/main.scss';

const Game = (props) => {
  const {
    people,
    page,
    count,
    onChangePage,
    isFetching,
    pageSize,
    correctCharacterAnswerList,
    penaltyCharacterAnswerList,
    addCorrectAnswer,
    addPenalty,
    addScore,
    remainingTime,
    onTimeChange,
    gameStarted,
    gameEnded,
    startGame,
    playerScore,
    openInfoModal,
    closeInfo,
    infoOpen,
    characterInfo,
    isFetchingInfo
  } = props;
  return (
    <Fragment>
      <div className="stars" />
      <div className="twinkling" />
      {gameStarted ? (
        <div id="sw-characters-wrapper">
          <Timer remainingTime={remainingTime} onTimeChange={onTimeChange} />
          <div className="sw-character-list">
            {people.map((character, index) =>
              <CharacterAnswer
                isFetching={isFetching}
                openInfo={openInfoModal}
                addCorrectAnswer={addCorrectAnswer}
                addPenalty={addPenalty}
                penaltyCharacterAnswerList={penaltyCharacterAnswerList}
                correctCharacterAnswerList={correctCharacterAnswerList}
                addScore={addScore}
                character={character}
                id={index + 1}
                key={character.name}
              />
            )}
          </div>
          <Pagination isFetching={isFetching} page={page} pageSize={pageSize} count={count} onChangePage={onChangePage} />
          <Dialog onClose={closeInfo} open={infoOpen}>
            <LoadingWrapper isFetching={isFetchingInfo}>
              {characterInfo && (
                <div className="sw-character-info">
                  <dl>
                    <div>
                      <dt>Gênero:</dt>
                      <dd>{characterInfo.gender}</dd>
                    </div>
                    <div>
                      <dt>Cor do cabelo:</dt>
                      <dd>{characterInfo.hair_color}</dd>
                    </div>
                    <div>
                      <dt>Gênero:</dt>
                      <dd>{characterInfo.gender}</dd>
                    </div>
                    <div>
                      <dt>Altura:</dt>
                      <dd>{characterInfo.height}</dd>
                    </div>
                    <div>
                      <dt>Peso:</dt>
                      <dd>{characterInfo.mass}</dd>
                    </div>
                    <div>
                      <dt>Ano de nascimento:</dt>
                      <dd>{characterInfo.birth_year}</dd>
                    </div>
                    <div>
                      <dt>Cor do cabelo:</dt>
                      <dd>{characterInfo.hair_color}</dd>
                    </div>
                    <div>
                      <dt>Cor dos olhos:</dt>
                      <dd>{characterInfo.eye_color}</dd>
                    </div>
                    <div>
                      <dt>Cor da pele:</dt>
                      <dd>{characterInfo.skin_color}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </LoadingWrapper>
          </Dialog>
        </div>
      ) : (
        <Fragment>
          {gameEnded ? (
            <EndGame {...props} />
          ) : (
            <div id="sw-begin-wrapper">
              <div className="sw-intro">
                <img className="sw-logo" src={logo} alt="Star Wars" />
                <div className="sw-help-text">
                  <div className="sw-transform">
                    <p>Para ganhar, acerte o maior número possível de nomes dos personagens em 2 minutos. </p>
                    <p>Cada acerto vale 10 pontos. Você pode usar a ajuda clicando em (?), porém se acertar irá ganhar somente 5 pontos.</p>
                    <strong>Boa sorte padawan, que a força esteja com você!</strong>
                  </div>
                </div>
                <Button variant="raised" onClick={startGame}>Começar o jogo</Button>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Game;
