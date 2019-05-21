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
const refreshCard = moveCard('hand');

const App: React.FC = () => {
  const [cards, setCards] = useState(deck);
  const [selectedForPlay, setSelectedForPlay] = useState([] as TableCard[]);
  const [selectedForLongRest, setSelectedForLongRest] = useState([] as TableCard[]);

  const played = cards.filter(inLocation('played'));
  const hand = cards.filter(inLocation('hand'));
  const discard = cards.filter(inLocation('discard'));
  const lost = cards.filter(inLocation('lost'));

  const ableToPlay = hand.length >= 2 && played.length === 0 && selectedForLongRest.length === 0;
  const readyToPlay = selectedForPlay.length === 2;

  const ableToRest = discard.length >= 2 && played.length === 0 && selectedForPlay.length === 0;
  const readyToLongRest = selectedForLongRest.length === 1;

  /*
   * Planning Actions
   */

  const togglePlaySelection = (card: TableCard) =>
    setSelectedForPlay(
      selectedForPlay.includes(card) ?
        selectedForPlay.filter((c) => c !== card) :
        [...selectedForPlay, card]
    );

  const toggleLongRestSelection = (card: TableCard) =>
    setSelectedForLongRest(
      selectedForLongRest.includes(card) ?
        selectedForLongRest.filter((c) => c !== card) :
        [...selectedForLongRest, card]
    );

  /*
   * Game Actions
   */

  const playAction = (action: 'top' | 'bottom') =>
    (card: TableCard) => setCards(card[action].lose ? loseCard(card, cards) : discardCard(card, cards));
  const playTop = playAction('top');
  const playBottom = playAction('bottom');
  // TODO: clickable areas for general attack/move actions
  // const playAttack = (card: TableCard) => setCards(discardCard(card, cards));
  // const playMove = (card: TableCard) => setCards(discardCard(card, cards));

  const playSelection = () => {
    setCards(selectedForPlay.reduce((memo, card) => playCard(card, memo), cards));
    setSelectedForPlay([]);
  };

  const playLongRest = () => {
    setCards(discard.reduce((memo, card) => selectedForLongRest.includes(card) ? loseCard(card, memo) : refreshCard(card, memo), cards));
    setSelectedForLongRest([]);
  };

  const playShortRest = () => {
    const randomDiscard = discard[Math.floor(Math.random() * discard.length)];
    setCards(discard.reduce((memo, card) => card === randomDiscard ? loseCard(card, memo) : refreshCard(card, memo), cards));
  };

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
        <h2>Hand <button disabled={!ableToPlay || !readyToPlay} onClick={playSelection}>PLAY</button></h2>
        <CardRow>
          {hand.map((c) => (
            <SmallCard
              key={c.name}
              selected={selectedForPlay.includes(c)}
              onClick={(ableToPlay && (!readyToPlay || selectedForPlay.includes(c))) ? () => togglePlaySelection(c) : undefined}
            >
              <Top>{c.name}</Top>
              <Bottom />
            </SmallCard>
          ))}
        </CardRow>
      </Hand>

      <Discards>
        <h2>Discard <button disabled={!ableToRest} onClick={readyToLongRest ? playLongRest : playShortRest}>{readyToLongRest ? 'Long' : 'Short'} Rest</button></h2>
        <CardPile>
          {discard.map((c, idx) => (
            <SmallCard
              key={c.name}
              selected={selectedForLongRest.includes(c)}
              onClick={(ableToRest && (!readyToLongRest || selectedForLongRest.includes(c))) ? () => toggleLongRestSelection(c) : undefined}
            >
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
