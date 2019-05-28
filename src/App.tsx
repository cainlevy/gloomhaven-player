import React from 'react';
import './normalize.css';
import Layout from './Layout';
import { mount, route, redirect } from 'navi';
import { Router, View } from 'react-navi';
import {Provider as GameProvider} from './GameContext';
import Play from './Play';
import Hand from './Hand';
import Discard from './Discard';
import Lost from './Lost';

const routes = mount({
  '/': redirect('/hand'),
  '/play': route({view: <Play />}),
  '/hand': route({view: <Hand />}),
  '/discard': route({view: <Discard />}),
  '/lost': route({view: <Lost />}),
});

const App: React.FC = () => {
  return (
    <GameProvider>
      <Router routes={routes}>
        <Layout>
          <View />
        </Layout>
      </Router>
    </GameProvider>
  );
}

export default App;
