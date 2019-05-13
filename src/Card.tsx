import * as React from 'react';
import styled from 'styled-components';
import AspectRatio from './util/AspectRatio';

interface Props {
  onClick?: () => void;
  className?: string;
}

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  background-color: grey;
  border: 5px solid grey;
  border-radius: 4%;
  height: 100%;
  cursor: pointer;
`;

export const Top = styled.div`
  flex: 1 1 50%;
  background-color: #aaa;
`;

export const Bottom = styled.div`
  flex: 1 1 50%;
  background-color: #999;
`;

const Card: React.FC<Props> = ({className, children, onClick}) => (
  <AspectRatio ratio={1.39} className={className}>
    <Frame onClick={onClick}>
      {children}
    </Frame>
  </AspectRatio>
)

export default Card;
