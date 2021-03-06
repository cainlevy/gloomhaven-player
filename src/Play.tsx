import React, { useContext } from 'react';
import Card from './Card';
import { CardRow } from './CardCollection';
import './normalize.css';
import { inPlayed } from './data/ActionCard';
import { planAction, ableToAct, readyToAct, playAction, turnsRemaining } from './data/Game';
import GameContext from './GameContext';
import { useNavigation } from 'react-navi';

const Play: React.FC = () => {
  const {game, updateGame} = useContext(GameContext);
  const navigation = useNavigation();

  return <>
    <h2>
      {turnsRemaining(game)}
      <button
        disabled={!ableToAct(game) || !readyToAct(game)}
        onClick={() => {
          updateGame(playAction(game));
          navigation.navigate('/hand');
        }}
      >
        ACT
      </button>
    </h2>
    <CardRow>
      {game.deck.filter(inPlayed).map((c) => (
        <Card
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
