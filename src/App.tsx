import React, { useState } from 'react';
import Card, { Bottom, Top } from './Card';
import CardCollection from './CardCollection';
import produce from 'immer';

interface ActionCard {
  name: string;
  location: 'hand' | 'discard' | 'lost' | 'played';
}

const BruteCards: ActionCard[] = [
  {name: 'Foo', location: 'hand'},
  {name: 'Bar', location: 'hand'},
];

const App: React.FC = () => {
  const [cards, setCards] = useState(BruteCards);

  const hand = cards.filter((c) => c.location === 'hand' || c.location === 'played');
  const discard = cards.filter((c) => c.location === 'discard');
  const lost = cards.filter((c) => c.location === 'lost');

  const playCard = (name: string) =>
    setCards(produce(cards, (draftState) => {
      const idx = cards.findIndex((c) => c.name === name);
      draftState[idx].location = 'played';
      return draftState;
    }));

  return (
    <>
      <h2>Hand</h2>
      <CardCollection>
        {hand.map((c, idx) => (
          <div key={c.name} style={{width: 100, marginRight: 5, border: (c.location === 'played' ? '1px solid red' : undefined)}}>
            <Card onClick={() => playCard(c.name)}>
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
