import * as React from 'react';
import styled from 'styled-components';
import AspectRatio from './util/AspectRatio';

const CardIconInner = styled.div`
  color: red;
  background-color: white;
  border-radius: 4px;
  border-width: 0;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardIcon: React.FC<{className?: string}> = ({className, children}) => (
  <div style={{width: 20}}>
    <AspectRatio ratio={1.39}>
      <CardIconInner>{children}</CardIconInner>
    </AspectRatio>
  </div>
);

export default CardIcon;
