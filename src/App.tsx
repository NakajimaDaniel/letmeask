import React from 'react';
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';

import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} /> 
      <Route path="/rooms/new" component={NewRoom} /> 
    </BrowserRouter>
    
  );
}

export default App;
