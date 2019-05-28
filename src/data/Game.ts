import {TableCard, inDiscard, inHand, inPlayed, ActionType} from './ActionCard';
import produce from 'immer';

interface ActionPlan {
  top?: TableCard,
  bottom?: TableCard,
  attack?: TableCard,
  move?: TableCard,
}

export interface Game {
  deck: TableCard[];
  selectedForPlay: TableCard[];
  selectedForLongRest: TableCard[];
  actionPlan: ActionPlan;
}

const newGame = (deck: TableCard[]): Game => ({
  deck: deck,
  selectedForPlay: [],
  selectedForLongRest: [],
  actionPlan: {},
});
export default newGame;

/* Computed States */

export const ableToAct = (game: Game) => game.deck.filter(inPlayed).length === 2;
export const readyToAct = (game: Game) => {
  const topCard = game.actionPlan.top || game.actionPlan.attack;
  const bottomCard = game.actionPlan.bottom || game.actionPlan.move;
  return topCard && bottomCard && topCard !== bottomCard;
}
export const ableToPlay = (game: Game) => game.selectedForLongRest.length === 0 && game.deck.filter(inHand).length >= 2 && !ableToAct(game);
export const readyToPlay = (game: Game) => game.selectedForPlay.length === 2;
export const ableToRest = (game: Game) => game.selectedForPlay.length === 0 && game.deck.filter(inDiscard).length >= 2 && !ableToAct(game);
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

const actionPairs: [ActionType, ActionType][] = [['top', 'attack'], ['bottom', 'move']];
export const planAction = (game: Game, card: TableCard, action: ActionType) =>
  produce(game, (draft) => {
    // unselect the paired action
    const paired = actionPairs.filter((pair) => pair.includes(action))[0].filter((a) => a !== action)[0];
    delete draft.actionPlan[paired];

    // unselect other plans for the same card
    let kind: ActionType;
    for (kind in game.actionPlan) {
      if (game.actionPlan[kind] === card) {
        delete draft.actionPlan[kind];
      }
    }

    // make this plan
    draft.actionPlan[action] = card;
  });

export const playAction = (game: Game) =>
  produce(game, (draft) => {
    if (game.actionPlan.top) {
      draft.deck[game.deck.indexOf(game.actionPlan.top)].location = game.actionPlan.top.top.lose ? 'lost' : 'discard';
    }
    if (game.actionPlan.bottom) {
      draft.deck[game.deck.indexOf(game.actionPlan.bottom)].location = game.actionPlan.bottom.bottom.lose ? 'lost' : 'discard';
    }
    if (game.actionPlan.attack) {
      draft.deck[game.deck.indexOf(game.actionPlan.attack)].location = 'discard';
    }
    if (game.actionPlan.move) {
      draft.deck[game.deck.indexOf(game.actionPlan.move)].location = 'discard';
    }
    draft.actionPlan = {};
  });

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
