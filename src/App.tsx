import React, { useState } from 'react';
import Card, { Bottom, Top } from './Card';
import { CardRow, CardPile } from './CardCollection';
import produce from 'immer';
import './normalize.css';

type LocationType = 'hand' | 'discard' | 'lost' | 'played';

interface ActionCard {
  name: string;
  location: LocationType;
}

const BruteCards: ActionCard[] = [
  {name: 'Foo', location: 'hand'},
  {name: 'Bar', location: 'hand'},
  {name: 'Baz', location: 'hand'},
  {name: 'Qux', location: 'hand'},
];

const withLocation = (location: LocationType | LocationType[]) =>
  typeof location === 'string' ?
    (card: ActionCard) => card.location === location :
    (card: ActionCard) => location.includes(card.location);

const moveCard = (location: LocationType) =>
  (card: ActionCard, deck: ActionCard[]) => {
    return produce(deck, (draftState) => {
      draftState[deck.indexOf(card)].location = location;
      return draftState;
    });
  }

const playCard = moveCard('played');
const discardCard = moveCard('discard');
const loseCard = moveCard('lost');

// TODO: some cards are lost when played but it depends what action was taken
// TODO: select top/bottom/attack/move when playing card
const App: React.FC = () => {
  const [cards, setCards] = useState(BruteCards);
  const [selected, setSelected] = useState([] as ActionCard[]);

  const played = cards.filter(withLocation('played'));
  const hand = cards.filter(withLocation('hand'));
  const discard = cards.filter(withLocation('discard'));
  const lost = cards.filter(withLocation('lost'));

  const toggleSelection = (card: ActionCard) =>
    setSelected(
      selected.includes(card) ?
        selected.filter((c) => c !== card) :
        [...selected, card]
    );

  const playSelection = () => {
    setCards(selected.reduce((memo, card) => playCard(card, memo), cards));
    setSelected([]);
  };

  const readyToPlay = selected.length === 2;
  const readyToSelect = played.length === 0;

  return (
    <>
      <h2>Play</h2>
      <CardRow>
        {played.map((c, idx) => (
          <div key={c.name} style={{width: 100, marginRight: 5}}>
            <Card onClick={() => setCards(discardCard(c, cards))}>
              <Top>{c.name}</Top>
              <Bottom />
            </Card>
          </div>
        ))}
      </CardRow>

      <h2>Hand <button disabled={!readyToPlay} onClick={playSelection}>PLAY</button></h2>
      <CardRow>
        {hand.map((c, idx) => (
          <div key={c.name} style={{width: 100, border: (selected.includes(c) ? '1px solid red' : undefined)}}>
            <Card onClick={(readyToSelect && (!readyToPlay || selected.includes(c))) ? () => toggleSelection(c) : undefined}>
              <Top>{c.name}</Top>
              <Bottom />
            </Card>
          </div>
        ))}
      </CardRow>

      <h2>Discard</h2>
      <CardPile>
        {discard.map((c, idx) => (
          <div key={c.name} style={{width: 100}}>
            <Card>
              <Top>{c.name}</Top>
              <Bottom />
            </Card>
          </div>
        ))}
      </CardPile>

      <h2>Lost</h2>
      <CardPile>
        {lost.map((c, idx) => (
          <div key={c.name} style={{width: 100}}>
            <Card>
              <Top>{c.name}</Top>
              <Bottom />
            </Card>
          </div>
        ))}
      </CardPile>
    </>
  );
}

export default App;
