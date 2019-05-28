import React from 'react';
import { SmallCard } from './Card';
import { CardRow, CardPile } from './CardCollection';
import { Table, Discard, Lost, Hand, Play } from './Table';
import './normalize.css';
import { inHand, inDiscard, inLost, inPlayed } from './data/ActionCard';
import Brute from './data/Brute';
import newGame, { Game, playSelection, playShortRest, playLongRest, ableToPlay, readyToPlay, readyToLongRest, ableToRest, togglePlaySelection, toggleLongRestSelection, planAction, ableToAct, readyToAct, playAction, turnsRemaining } from './data/Game';
import useStorage from './util/useStorage';

const grannoxGame = newGame([
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
  const [game, updateGame] = useStorage<Game>('ghgame', grannoxGame);

  return (
    <Table>
      <Play>
        <h2>{turnsRemaining(game)}<button disabled={!ableToAct(game) || !readyToAct(game)} onClick={() => updateGame(playAction(game))}>ACT</button></h2>
        <CardRow>
          {game.deck.filter(inPlayed).map((c) => (
            <SmallCard
              key={c.name}
              card={c}
              onTopClick={() => updateGame(planAction(game, c, 'top'))}
              topSelected={game.actionPlan.top === c}
              onBottomClick={() => updateGame(planAction(game, c, 'bottom'))}
              bottomSelected={game.actionPlan.bottom === c}
              onAttack={() => updateGame(planAction(game, c, 'attack'))}
              attackSelected={game.actionPlan.attack === c}
              onMove={() => updateGame(planAction(game, c, 'move'))}
              moveSelected={game.actionPlan.move === c}
            />
          ))}
        </CardRow>
      </Play>

      <Hand>
        <h2>Hand <button disabled={!ableToPlay(game) || !readyToPlay(game)} onClick={() => updateGame(playSelection(game))}>CHOOSE</button></h2>
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
        <h2>Lost <button onClick={() => updateGame(grannoxGame)}><span role="img" aria-label="reset">💀</span></button></h2>
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
