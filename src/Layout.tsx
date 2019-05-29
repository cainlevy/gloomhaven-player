import React, { useContext } from 'react';
import styled, { css } from "styled-components";
import { Link, useCurrentRoute, useNavigation } from 'react-navi';
import GameContext from './GameContext';
import { inLost, inDiscard } from './data/ActionCard';
import { ableToAct } from './data/Game';
import { useSwipeable } from 'react-swipeable'

export const SPACE = 7;

const Page = styled.div`
  height: 100vh;
`;

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
  padding: ${SPACE}px ${SPACE}px 0;
`;

const Layout: React.FC = (props) => {
  const {game} = useContext(GameContext);
  const route = useCurrentRoute();

  const locations = [
    {path: '/lost', name: `Lost (${game.deck.filter(inLost).length})`},
    ableToAct(game) ? {path: '/play', name: 'Play'} : {path: '/hand', name: 'Hand'},
    {path: '/discard', name: `Discard (${game.deck.filter(inDiscard).length})`},
  ];
  const currentIndex = locations.findIndex(({path}) => path === route.url.pathname);
  const leftLocation = currentIndex > 0 ? locations[currentIndex - 1] : undefined;
  const rightLocation = currentIndex < locations.length - 1 ? locations[currentIndex + 1] : undefined;
  const navigation = useNavigation();
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => rightLocation && navigation.navigate(rightLocation.path),
    onSwipedRight: () => leftLocation && navigation.navigate(leftLocation.path),
  });

  return <>
    <Page {...swipeHandlers}>
      <Header>
        <Navigation>
          {locations.map(({path, name}) => (
            <Tab key={path} href={path} active={route.url.pathname === path}>
              {name}
            </Tab>
          ))}
        </Navigation>
      </Header>
      <Body>
        {props.children}
      </Body>
    </Page>
  </>
};

export default Layout;
