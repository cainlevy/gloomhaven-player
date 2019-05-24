import * as React from 'react';
import styled, { css } from 'styled-components';
import AspectRatio from './util/AspectRatio';
import { ActionCard } from './data/ActionCard';
import CardIcon from './CardIcon';

interface Props {
  className?: string;
  selected?: boolean;
  card: ActionCard;

  // sometimes you can select a whole card
  onSelect?: () => void;

  // sometimes you can choose one of four actions
  onTopClick?: () => void;
  onBottomClick?: () => void;
  onAttack?: () => void;
  onMove?: () => void;
}

const SelectableDiv: React.FC<React.HTMLAttributes<HTMLDivElement> & {selected: boolean}> = ({selected, ...props}) => <div {...props}/>

const Frame = styled(SelectableDiv)`
  display: flex;
  flex-direction: column;
  background-color: #666;
  border: 5px solid ${(props) => props.selected ? 'blue' : '#666'};
  border-radius: 4%;
  height: 100%;
  cursor: ${(props) => props.onClick ? 'pointer' : 'inherit'};

  display: grid;
  grid-template-columns: 70% auto;
  grid-template-rows: auto 1fr 1fr;
  grid-template-areas:
    'name name'
    'top attack'
    'bottom move';
`;

const Top = styled.div`
  grid-area: top;
  background-color: #aab;
  position: relative;
  ${(props) => props.onClick && css`
    cursor: pointer;
    &:hover {
      filter: hue-rotate(180deg);
    }
  `}
`;

const Bottom = styled.div`
  grid-area: bottom;
  background-color: #99a;
  position: relative;
  ${(props) => props.onClick && css`
    cursor: pointer;
    &:hover {
      filter: hue-rotate(180deg);
    }
  `}
`;

const Attack = styled.div`
  grid-area: attack;
  background-color: #99a;
  ${(props) => props.onClick && css`
    cursor: pointer;
    &:hover {
      filter: hue-rotate(180deg);
    }
  `}
`;

const Move = styled.div`
  grid-area: move;
  background-color: #889;
  ${(props) => props.onClick && css`
    cursor: pointer;
    &:hover {
      filter: hue-rotate(180deg);
    }
  `}
`;

const Name = styled.div`
  grid-area: name;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  color: white;
`;

const BottomLeft = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
`;

const Card: React.FC<Props> = ({card, ...props}) => {
  const onAttack = (e: React.MouseEvent<HTMLElement>) => {
    if (props.onAttack) {
      e.stopPropagation();
      props.onAttack();
    }
  }

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (props.onMove) {
      e.stopPropagation();
      props.onMove();
    }
  }

  return <AspectRatio ratio={1.39} className={props.className}>
    <Frame onClick={props.onSelect} selected={!!props.selected}>
      <Name>{card.name}</Name>
      <Top onClick={props.onTopClick}>
        {card.top.lose && <BottomLeft><CardIcon>x</CardIcon></BottomLeft>}
      </Top>
      <Attack onClick={props.onAttack && onAttack} />
      <Bottom onClick={props.onBottomClick}>
        {card.bottom.lose && <BottomLeft><CardIcon>x</CardIcon></BottomLeft>}
      </Bottom>
      <Move onClick={props.onMove && onMove} />
    </Frame>
  </AspectRatio>;
};

export const SmallCard: React.FC<Props> = (props) => <div style={{width: 150}}><Card {...props} /></div>

export default Card;
