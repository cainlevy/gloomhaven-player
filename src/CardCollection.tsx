import styled from "styled-components";

// TODO: css grid
const CardCollection = styled.div`
  display: flex;
  flex-direction: row;
`;
export default CardCollection;

export const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  > * {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

export const CardPile = styled.div`
  display: inline-flex;
  flex-direction: column;
  > * {
    margin-bottom: -120%;
  }
`;
