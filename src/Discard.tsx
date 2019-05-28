import React, { useContext } from 'react';
import Card from './Card';
import { CardRow } from './CardCollection';
import './normalize.css';
import { inDiscard } from './data/ActionCard';
import { playShortRest, playLongRest, readyToLongRest, ableToRest, toggleLongRestSelection } from './data/Game';
import GameContext from './GameContext';

const Discard: React.FC = () => {
  const {game, updateGame} = useContext(GameContext);

  return <>
    <h2>Discard <button disabled={!ableToRest(game)} onClick={() => updateGame(readyToLongRest(game) ? playLongRest(game) : playShortRest(game))}>{readyToLongRest(game) ? 'Long' : 'Short'} Rest</button></h2>
    <CardRow>
      {game.deck.filter(inDiscard).map((c, idx) => (
        <Card
          key={c.name}
          card={c}
          selected={game.selectedForLongRest.includes(c)}
          onSelect={(ableToRest(game) && (!readyToLongRest(game) || game.selectedForLongRest.includes(c)))
            ? () => updateGame(toggleLongRestSelection(game, c))
            : undefined
          }
        />
      ))}
    </CardRow>
  </>;
}

export default Discard;
