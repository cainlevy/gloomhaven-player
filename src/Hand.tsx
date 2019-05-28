import React, { useContext } from 'react';
import { SmallCard } from './Card';
import { CardRow } from './CardCollection';
import './normalize.css';
import { inHand } from './data/ActionCard';
import { playSelection, ableToPlay, readyToPlay, togglePlaySelection } from './data/Game';
import GameContext from './GameContext';

const Hand: React.FC = () => {
  const {game, updateGame} = useContext(GameContext);

  return <>
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
  </>;
}

export default Hand;
