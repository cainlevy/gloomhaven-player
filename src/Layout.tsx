import React, { useContext } from 'react';
import styled, { css } from "styled-components";
import { Link, useCurrentRoute } from 'react-navi';
import GameContext from './GameContext';
import { inLost, inDiscard } from './data/ActionCard';
import { ableToAct } from './data/Game';

export const SPACE = 7;

const Header = styled.header`
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tab = styled(Link)`
  display: block;
  text-decoration: none;
  flex: 1 1 auto;
  width: 33.33%;
  text-align: center;
  padding: ${SPACE}px 0;
  background-color: #aaa;
  border-bottom: 3px solid #aaa;
  ${(props) => props.active && css`
    border-color: #555;
  `};
` as unknown as typeof Link; // wut

const Body = styled.section`
`;

const Layout: React.FC = (props) => {
  const route = useCurrentRoute();
  const {game} = useContext(GameContext);

  return <>
    <Header>
      <Navigation>
        <Tab href="/lost" active={route.url.pathname === '/lost'}>
          Lost ({game.deck.filter(inLost).length})
        </Tab>
        {ableToAct(game) ? (
          <Tab href="/play" active={route.url.pathname === '/play'}>
            Play
          </Tab>
        ) : (
          <Tab href="/hand" active={route.url.pathname === '/hand'}>
            Hand
          </Tab>
        )}
        <Tab href="/discard" active={route.url.pathname === '/discard'}>
          Discard ({game.deck.filter(inDiscard).length})
        </Tab>
      </Navigation>
    </Header>
    <Body>
      {props.children}
    </Body>
  </>
};

export default Layout;
