import React from 'react';
import Brute from './data/Brute';
import newGame, { Game } from './data/Game';
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

const GameContext = React.createContext<{
  game: Game,
  updateGame: (game: Game) => void,
  reset: () => void,
}>({} as any);
export default GameContext;

export const Provider: React.FC = ({children}) => {
  const [game, updateGame] = useStorage<Game>('ghgame', grannoxGame);

  return (
    <GameContext.Provider
      value={{
        game,
        updateGame,
        reset: () => updateGame(grannoxGame),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
