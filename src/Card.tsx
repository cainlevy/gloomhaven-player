import * as React from 'react';
import styled from 'styled-components';
import AspectRatio from './util/AspectRatio';

interface Props {
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}

const SelectableDiv: React.FC<React.HTMLAttributes<HTMLDivElement> & {selected: boolean}> = ({selected, ...props}) => <div {...props}/>

const Frame = styled(SelectableDiv)`
  display: flex;
  flex-direction: column;
  background-color: grey;
  border: 5px solid ${(props) => props.selected ? 'blue' : 'grey'};
  border-radius: 4%;
  height: 100%;
  cursor: ${(props) => props.onClick ? 'pointer' : 'inherit'};
`;

export const Top = styled.div`
  flex: 1 1 50%;
  background-color: #aaa;
  cursor: ${(props) => props.onClick ? 'pointer' : 'inherit'};
`;

export const Bottom = styled.div`
  flex: 1 1 50%;
  background-color: #999;
  cursor: ${(props) => props.onClick ? 'pointer' : 'inherit'};
`;

const Card: React.FC<Props> = ({className, children, onClick, selected}) => (
  <AspectRatio ratio={1.39} className={className}>
    <Frame onClick={onClick} selected={!!selected}>
      {children}
    </Frame>
  </AspectRatio>
)

export const SmallCard: React.FC<Props> = (props) => <div style={{width: 150}}><Card {...props} /></div>

export default Card;
