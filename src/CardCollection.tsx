import styled from "styled-components";
import { SPACE } from "./Layout";

const CardCollection = styled.div`
  display: flex;
  flex-direction: row;
`;
export default CardCollection;

export const CardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  grid-gap: ${SPACE}px;
`;

export const CardPile = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: -120%;
  }
`;
