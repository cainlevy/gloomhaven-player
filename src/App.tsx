import React, { useState } from 'react';
import { Bottom, Top, SmallCard } from './Card';
import { CardRow, CardPile } from './CardCollection';
import { Table, Discards, Lost, Hand, Play } from './Table';
import produce from 'immer';
import './normalize.css';
import { TableLocation, TableCard } from './data/ActionCard';
import Brute from './data/Brute';

const deck: TableCard[] = [
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
].map((c) => ({...c, location: 'hand'}));

const inLocation = (location: TableLocation) =>
  (card: TableCard) => card.location === location

const moveCard = (location: TableLocation) =>
  (card: TableCard, deck: TableCard[]) => {
    return produce(deck, (draftState) => {
      draftState[deck.indexOf(card)].location = location;
      return draftState;
    });
  }

const playCard = moveCard('played');
const discardCard = moveCard('discard');
const loseCard = moveCard('lost');

const App: React.FC = () => {
  const [cards, setCards] = useState(deck);
  const [selected, setSelected] = useState([] as TableCard[]);

  const played = cards.filter(inLocation('played'));
  const hand = cards.filter(inLocation('hand'));
  const discard = cards.filter(inLocation('discard'));
  const lost = cards.filter(inLocation('lost'));

  const toggleSelection = (card: TableCard) =>
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

  const playAction = (action: 'top' | 'bottom') =>
    (card: TableCard) => setCards(card[action].lose ? loseCard(card, cards) : discardCard(card, cards));
  const playTop = playAction('top');
  const playBottom = playAction('bottom');
  // TODO: clickable areas for general attack/move actions
  // const playAttack = (card: TableCard) => setCards(discardCard(card, cards));
  // const playMove = (card: TableCard) => setCards(discardCard(card, cards));

  return (
    <Table>
      <Play>
        <CardRow>
          {played.map((c) => (
            <SmallCard key={c.name}>
              <Top onClick={() => playTop(c)}>{c.name}</Top>
              <Bottom onClick={() => playBottom(c)} />
            </SmallCard>
          ))}
        </CardRow>
      </Play>

      <Hand>
        <h2>Hand <button disabled={!readyToPlay} onClick={playSelection}>PLAY</button></h2>
        <CardRow>
          {hand.map((c) => (
            <div key={c.name} style={{border: (selected.includes(c) ? '1px solid red' : undefined)}}>
              <SmallCard key={c.name} onClick={(readyToSelect && (!readyToPlay || selected.includes(c))) ? () => toggleSelection(c) : undefined}>
                <Top>{c.name}</Top>
                <Bottom />
              </SmallCard>
            </div>
          ))}
        </CardRow>
      </Hand>

      <Discards>
        <h2>Discard</h2>
        <CardPile>
          {discard.map((c, idx) => (
            <SmallCard key={c.name}>
              <Top>{c.name}</Top>
              <Bottom />
            </SmallCard>
          ))}
        </CardPile>
      </Discards>

      <Lost>
        <h2>Lost</h2>
        <CardPile>
          {lost.map((c, idx) => (
            <SmallCard key={c.name}>
              <Top>{c.name}</Top>
              <Bottom />
            </SmallCard>
          ))}
        </CardPile>
      </Lost>
    </Table>
  );
}

export default App;
