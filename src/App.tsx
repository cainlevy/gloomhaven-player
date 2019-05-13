import React, { useState } from 'react';
import Card, { Bottom, Top } from './Card';
import CardCollection from './CardCollection';
import produce from 'immer';

type LocationType = 'hand' | 'discard' | 'lost' | 'selected';

interface ActionCard {
  name: string;
  location: LocationType;
}

const BruteCards: ActionCard[] = [
  {name: 'Foo', location: 'hand'},
  {name: 'Bar', location: 'hand'},
];

const withLocation = (location: LocationType | LocationType[]) =>
  typeof location === 'string' ?
    (card: ActionCard) => card.location === location :
    (card: ActionCard) => location.includes(card.location);

const moveCard = (location: LocationType) =>
  (name: string, cards: ActionCard[]) => {
    const idx = cards.findIndex((c) => c.name === name);
    return produce(cards, (draftState) => {
      draftState[idx].location = location;
      return draftState;
    });
  }

const selectCard = moveCard('selected');
const unselectCard = moveCard('hand');
const discardCard = moveCard('discard');
const loseCard = moveCard('lost');

// TODO: select two cards maximum (disable onclick on hand when two are selected)
// TODO: require two cards to play selection
// TODO: some cards are lost when played but it depends what action was taken
// TODO: select top/bottom/attack/move when selecting card
const App: React.FC = () => {
  const [cards, setCards] = useState(BruteCards);

  const hand = cards.filter(withLocation(['hand', 'selected']));
  const discard = cards.filter(withLocation('discard'));
  const lost = cards.filter(withLocation('lost'));

  const toggleSelection = (card: ActionCard) =>
    card.location === 'hand' ? selectCard(card.name, cards) : unselectCard(card.name, cards);

  const playSelection = () =>
    cards
      .filter(withLocation('selected'))
      .reduce((memo, card) => discardCard(card.name, memo), cards);

  return (
    <>
      <h2>Hand <button onClick={() => setCards(playSelection())}>PLAY</button></h2>
      <CardCollection>
        {hand.map((c, idx) => (
          <div key={c.name} style={{width: 100, marginRight: 5, border: (c.location === 'selected' ? '1px solid red' : undefined)}}>
            <Card onClick={() => setCards(toggleSelection(c))}>
              <Top>{c.name}</Top>
              <Bottom />
            </Card>
          </div>
        ))}
      </CardCollection>

      <h2>Discard</h2>
      <CardCollection>
        {discard.map((c, idx) => (
          <div key={c.name} style={{width: 100, marginRight: 5}}>
            <Card>
              <Top>{c.name}</Top>
              <Bottom />
            </Card>
          </div>
        ))}
      </CardCollection>

      <h2>Lost</h2>
      <CardCollection>
        {lost.map((c, idx) => (
          <div key={c.name} style={{width: 100, marginRight: 5}}>
            <Card>
              <Top>{c.name}</Top>
              <Bottom />
            </Card>
          </div>
        ))}
      </CardCollection>
    </>
  );
}

export default App;
