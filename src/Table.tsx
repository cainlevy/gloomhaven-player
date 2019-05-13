import styled from 'styled-components';

export const Table = styled.div`
  display: grid;
  grid-template-columns: 150px auto 150px;
  grid-template-rows: auto;
  grid-template-areas:
    '.    play play .       '
    'lost hand hand discards';
`;

export const Discards = styled.div`
  grid-area: discards;
`;

export const Lost = styled.div`
  grid-area: lost;
`;

export const Hand = styled.div`
  grid-area: hand;
`;

export const Play = styled.div`
  grid-area: play;
  display: flex;
  justify-content: center;
`;
