import React, { useContext } from 'react';
import { SmallCard } from './Card';
import { CardPile } from './CardCollection';
import './normalize.css';
import { inLost } from './data/ActionCard';
import GameContext from './GameContext';

const Lost: React.FC = () => {
  const {game, reset} = useContext(GameContext);

  return <>
    <h2>Lost <button onClick={() => reset()}><span role="img" aria-label="reset">💀</span></button></h2>
    <CardPile>
      {game.deck.filter(inLost).map((c, idx) => (
        <SmallCard
          key={c.name}
          card={c}
        />
      ))}
    </CardPile>
  </>;
}

export default Lost;
