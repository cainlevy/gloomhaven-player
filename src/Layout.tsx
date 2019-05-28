import React from 'react';
import styled, { css } from "styled-components";
import { Link, useCurrentRoute } from 'react-navi';

const SPACE = 7;

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

  return <>
    <Header>
      <Navigation>
        <Tab href="/lost" active={route.url.pathname === '/lost'}>Lost</Tab>
        <Tab href="/hand" active={route.url.pathname === '/hand'}>Hand</Tab>
        <Tab href="/discard" active={route.url.pathname === '/discard'}>Discard</Tab>
      </Navigation>
    </Header>
    <Body>
      {props.children}
    </Body>
  </>
};

export default Layout;
