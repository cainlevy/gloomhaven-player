import * as React from 'react';
import styled, { css } from 'styled-components';
import AspectRatio from './util/AspectRatio';
import { ActionCard } from './data/ActionCard';
import CardIcon from './CardIcon';
import { SPACE } from './Layout';

interface Props {
  className?: string;
  selected?: boolean;
  card: ActionCard;

  // sometimes you can select a whole card
  onSelect?: () => void;

  // sometimes you can choose one of four actions
  onTopClick?: () => void;
  topSelected?: boolean;
  onBottomClick?: () => void;
  bottomSelected?: boolean;
  onAttack?: () => void;
  attackSelected?: boolean;
  onMove?: () => void;
  moveSelected?: boolean;
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

const Top = styled(SelectableDiv)`
  grid-area: top;
  background-color: #aab;
  position: relative;
  border-top-left-radius: 4%;
  ${(props) => props.selected ? 'border: 1px solid red;' : null}
  ${(props) => props.onClick && css`
    cursor: pointer;
    &:hover {
      filter: hue-rotate(180deg);
    }
  `}
`;

const Bottom = styled(SelectableDiv)`
  grid-area: bottom;
  background-color: #99a;
  position: relative;
  border-bottom-left-radius: 4%;
  ${(props) => props.selected ? 'border: 1px solid red;' : null}
  ${(props) => props.onClick && css`
    cursor: pointer;
    &:hover {
      filter: hue-rotate(180deg);
    }
  `}
`;

const Attack = styled(SelectableDiv)`
  grid-area: attack;
  background-color: #99a;
  writing-mode: vertical-rl;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${SPACE}px;
  border-top-right-radius: 4%;
  ${(props) => props.selected ? 'border: 1px solid red;' : null}
  ${(props) => props.onClick && css`
    cursor: pointer;
    &:hover {
      filter: hue-rotate(180deg);
    }
  `}
`;

const Move = styled(SelectableDiv)`
  grid-area: move;
  background-color: #889;
  writing-mode: vertical-rl;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${SPACE}px;
  border-bottom-right-radius: 4%;
  ${(props) => props.selected ? 'border: 1px solid red;' : null}
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
      <Top onClick={props.onTopClick} selected={!!props.topSelected}>
        {card.top.lose && <BottomLeft><CardIcon>x</CardIcon></BottomLeft>}
      </Top>
      <Attack onClick={props.onAttack && onAttack} selected={!!props.attackSelected}>attack</Attack>
      <Bottom onClick={props.onBottomClick} selected={!!props.bottomSelected}>
        {card.bottom.lose && <BottomLeft><CardIcon>x</CardIcon></BottomLeft>}
      </Bottom>
      <Move onClick={props.onMove && onMove} selected={!!props.moveSelected}>move</Move>
    </Frame>
  </AspectRatio>;
};

export default Card;
