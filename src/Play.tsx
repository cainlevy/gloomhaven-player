import React, { useContext } from 'react';
import { SmallCard } from './Card';
import { CardRow } from './CardCollection';
import './normalize.css';
import { inPlayed } from './data/ActionCard';
import { planAction, ableToAct, readyToAct, playAction, turnsRemaining } from './data/Game';
import GameContext from './GameContext';

const Play: React.FC = () => {
  const {game, updateGame} = useContext(GameContext);

  return <>
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
  </>;
}

export default Play;
