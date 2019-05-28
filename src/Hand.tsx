import React, { useContext } from 'react';
import Card from './Card';
import { CardRow } from './CardCollection';
import './normalize.css';
import { inHand } from './data/ActionCard';
import { playSelection, ableToPlay, readyToPlay, togglePlaySelection } from './data/Game';
import GameContext from './GameContext';
import { useNavigation } from 'react-navi';

const Hand: React.FC = () => {
  const {game, updateGame} = useContext(GameContext);
  const navigation = useNavigation();

  return <>
    <h2>
      Hand
      <button
        disabled={!ableToPlay(game) || !readyToPlay(game)}
        onClick={() => {
          updateGame(playSelection(game));
          navigation.navigate('/play');
        }}
      >
        CHOOSE
      </button>
    </h2>
    <CardRow>
      {game.deck.filter(inHand).map((c) => (
        <Card
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
