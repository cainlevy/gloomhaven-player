interface Action {
  lose?: boolean;
}

export interface ActionCard {
  name: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'x';
  initiative: number;
  top: Action;
  bottom: Action;
}

export type TableLocation = 'hand' | 'discard' | 'lost' | 'played';

export interface TableCard extends ActionCard {
  location: TableLocation;
}

const inLocation = (location: TableLocation) =>
  (card: TableCard) => card.location === location

export const inHand = inLocation('hand');
export const inDiscard = inLocation('discard');
export const inLost = inLocation('lost');
export const inPlayed = inLocation('played');
