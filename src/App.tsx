import React, { useState } from 'react';
import { Bottom, Top, SmallCard } from './Card';
import { CardRow, CardPile } from './CardCollection';
import { Table, Discards, Lost, Hand, Play } from './Table';
import './normalize.css';
import { inHand, inDiscard, inLost, inPlayed } from './data/ActionCard';
import Brute from './data/Brute';
import newGame, { Game, playSelection, playShortRest, playLongRest, ableToPlay, readyToPlay, readyToLongRest, ableToRest, playTop, playBottom, togglePlaySelection, toggleLongRestSelection } from './data/Game';

const thisGame = newGame([
  Brute['Spare Dagger'],
  Brute['Balanced Measure'],
  Brute['Juggernaut'],
  Brute['Leaping Cleave'],
  Brute['Overwhelming Strength'],
  Brute['Warding Strength'],
  Brute['Grab and Go'],
  Brute['Shield Bash'],
  Brute['Trample'],
  Brute['Sweeping Blow'],
].map((c) => ({...c, location: 'hand'})));

// TODO: generic attack, generic move
const App: React.FC = () => {
  const [game, updateGame] = useState<Game>(thisGame);

  return (
    <Table>
      <Play>
        <CardRow>
          {game.deck.filter(inPlayed).map((c) => (
            <SmallCard key={c.name}>
              <Top onClick={() => updateGame(playTop(game, c))}>{c.name}</Top>
              <Bottom onClick={() => updateGame(playBottom(game, c))} />
            </SmallCard>
          ))}
        </CardRow>
      </Play>

      <Hand>
        <h2>Hand <button disabled={!ableToPlay(game) || !readyToPlay(game)} onClick={() => updateGame(playSelection(game))}>PLAY</button></h2>
        <CardRow>
          {game.deck.filter(inHand).map((c) => (
            <SmallCard
              key={c.name}
              selected={game.selectedForPlay.includes(c)}
              onClick={(ableToPlay(game) && (!readyToPlay(game) || game.selectedForPlay.includes(c)))
                ? () => updateGame(togglePlaySelection(game, c))
                : undefined
              }
            >
              <Top>{c.name}</Top>
              <Bottom />
            </SmallCard>
          ))}
        </CardRow>
      </Hand>

      <Discards>
        <h2>Discard <button disabled={!ableToRest(game)} onClick={() => updateGame(readyToLongRest(game) ? playLongRest(game) : playShortRest(game))}>{readyToLongRest(game) ? 'Long' : 'Short'} Rest</button></h2>
        <CardPile>
          {game.deck.filter(inDiscard).map((c, idx) => (
            <SmallCard
              key={c.name}
              selected={game.selectedForLongRest.includes(c)}
              onClick={(ableToRest(game) && (!readyToLongRest(game) || game.selectedForLongRest.includes(c)))
                ? () => updateGame(toggleLongRestSelection(game, c))
                : undefined
              }
            >
              <Top>{c.name}</Top>
              <Bottom />
            </SmallCard>
          ))}
        </CardPile>
      </Discards>

      <Lost>
        <h2>Lost</h2>
        <CardPile>
          {game.deck.filter(inLost).map((c, idx) => (
            <SmallCard key={c.name}>
              <Top>{c.name}</Top>
              <Bottom />
            </SmallCard>
          ))}
        </CardPile>
      </Lost>
    </Table>
  );
}

export default App;
