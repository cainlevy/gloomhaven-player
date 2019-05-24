import {TableCard, inDiscard, inHand, inPlayed, TableLocation} from './ActionCard';
import produce from 'immer';

export interface Game {
  deck: TableCard[];
  selectedForPlay: TableCard[];
  selectedForLongRest: TableCard[];
}

const newGame = (deck: TableCard[]): Game => ({
  deck: deck,
  selectedForPlay: [],
  selectedForLongRest: [],
});
export default newGame;

/* Computed States */

export const ableToPlay = (game: Game) => game.selectedForLongRest.length === 0 && game.deck.filter(inHand).length >= 2 && game.deck.filter(inPlayed).length === 0;
export const readyToPlay = (game: Game) => game.selectedForPlay.length === 2;
export const ableToRest = (game: Game) => game.selectedForPlay.length === 0 && game.deck.filter(inDiscard).length >= 2 && game.deck.filter(inPlayed).length === 0;
export const readyToLongRest = (game: Game) => game.selectedForLongRest.length === 1;

/* Game Actions */

const toggleSelection = (card: TableCard, collection: TableCard[]) =>
  collection.includes(card) ?
    collection.filter((c) => c !== card) :
    [...collection, card];


export const togglePlaySelection = (game: Game, card: TableCard) =>
  produce(game, (draft) => {
    draft.selectedForPlay = toggleSelection(card, game.selectedForPlay);
  });

export const toggleLongRestSelection = (game: Game, card: TableCard) =>
  produce(game, (draft) => {
    draft.selectedForLongRest = toggleSelection(card, game.selectedForLongRest);
  });


const playAction = (action: 'top' | 'bottom') =>
  (game: Game, card: TableCard) => produce(game, (draft) => {
    draft.deck[game.deck.indexOf(card)].location = card[action].lose ? 'lost' : 'discard';
  });

export const playTop = playAction('top');
export const playBottom = playAction('bottom');

const playToLocation = (location: TableLocation) =>
  (game: Game, card: TableCard) => produce(game, (draft) => {
    draft.deck[game.deck.indexOf(card)].location = location;
  });

export const playAttack = playToLocation('discard');
export const playMove = playToLocation('discard');

export const playSelection = (game: Game) =>
  produce(game, (draft) => {
    game.selectedForPlay.forEach((card) =>
      draft.deck[game.deck.indexOf(card)].location = 'played'
    );
    draft.selectedForPlay = [];
  });

export const playLongRest = (game: Game) =>
  produce(game, (draft) => {
    const discard = game.deck.filter(inDiscard);
    discard.forEach((card) =>
      draft.deck[game.deck.indexOf(card)].location = game.selectedForLongRest.includes(card) ? 'lost' : 'hand'
    );
    draft.selectedForLongRest = [];
  });

export const playShortRest = (game: Game) =>
  produce(game, (draft) => {
    const discard = game.deck.filter(inDiscard);
    const randomDiscard = discard[Math.floor(Math.random() * discard.length)];
    discard.forEach((card) =>
      draft.deck[game.deck.indexOf(card)].location = card === randomDiscard ? 'lost' : 'hand'
    );
  });
