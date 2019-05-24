import React, { useState } from 'react';
import { SmallCard } from './Card';
import { CardRow, CardPile } from './CardCollection';
import { Table, Discard, Lost, Hand, Play } from './Table';
import './normalize.css';
import { inHand, inDiscard, inLost, inPlayed } from './data/ActionCard';
import Brute from './data/Brute';
import newGame, { Game, playSelection, playShortRest, playLongRest, ableToPlay, readyToPlay, readyToLongRest, ableToRest, playTop, playBottom, togglePlaySelection, toggleLongRestSelection, playAttack, playMove } from './data/Game';

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

const App: React.FC = () => {
  const [game, updateGame] = useState<Game>(thisGame);

  return (
    <Table>
      <Play>
        <CardRow>
          {game.deck.filter(inPlayed).map((c) => (
            <SmallCard
              key={c.name}
              card={c}
              onTopClick={() => updateGame(playTop(game, c))}
              onBottomClick={() => updateGame(playBottom(game, c))}
              onAttack={() => updateGame(playAttack(game, c))}
              onMove={() => updateGame(playMove(game, c))}
            />
          ))}
        </CardRow>
      </Play>

      <Hand>
        <h2>Hand <button disabled={!ableToPlay(game) || !readyToPlay(game)} onClick={() => updateGame(playSelection(game))}>PLAY</button></h2>
        <CardRow>
          {game.deck.filter(inHand).map((c) => (
            <SmallCard
              key={c.name}
              card={c}
              selected={game.selectedForPlay.includes(c)}
              onSelect={(ableToPlay(game) && (!readyToPlay(game) || game.selectedForPlay.includes(c)))
                ? () => updateGame(togglePlaySelection(game, c))
                : undefined
              }
            />
          ))}
        </CardRow>
      </Hand>

      <Discard>
        <h2>Discard <button disabled={!ableToRest(game)} onClick={() => updateGame(readyToLongRest(game) ? playLongRest(game) : playShortRest(game))}>{readyToLongRest(game) ? 'Long' : 'Short'} Rest</button></h2>
        <CardPile>
          {game.deck.filter(inDiscard).map((c, idx) => (
            <SmallCard
              key={c.name}
              card={c}
              selected={game.selectedForLongRest.includes(c)}
              onSelect={(ableToRest(game) && (!readyToLongRest(game) || game.selectedForLongRest.includes(c)))
                ? () => updateGame(toggleLongRestSelection(game, c))
                : undefined
              }
            />
          ))}
        </CardPile>
      </Discard>

      <Lost>
        <h2>Lost</h2>
        <CardPile>
          {game.deck.filter(inLost).map((c, idx) => (
            <SmallCard
              key={c.name}
              card={c}
            />
          ))}
        </CardPile>
      </Lost>
    </Table>
  );
}

export default App;
