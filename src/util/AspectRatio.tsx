import * as React from 'react';
import styled from 'styled-components';

interface Props {
  ratio: number;
  className?: string;
}

// defines a ratio using a padding trick
// https://stackoverflow.com/questions/1495407/maintain-the-aspect-ratio-of-a-div-with-css#10441480
const Frame = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: ${(props: Props) => props.ratio * 100}%;
  display: flex;
`;

/**
 * Stretched will fit the entire area of its positioning parent.
 */
export const Stretched = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

/**
 * A box that maintains a desired aspect ratio by filling the available width and calculating the
 * appropriate height. Must have a "Stretched" child with absolute positioning.
 */
const AspectRatio: React.SFC<Props> = ({ratio, className, children}) => (
  <Frame ratio={ratio} className={className}>
    <Stretched>{children}</Stretched>
  </Frame>
);

export default AspectRatio;
