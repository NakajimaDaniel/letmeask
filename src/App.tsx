import {auth, firebase} from '../src/services/firebase'

import React from 'react';
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';

import { createContext } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';




import { AuthContext, AuthContextProvider } from './contexts/AuthContext'




function App() {



  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} /> 
        <Route path="/rooms/new" component={NewRoom} /> 
        <Route path="/rooms/new" component={NewRoom} /> 
      </AuthContextProvider>


    </BrowserRouter>
    
  );
}

export default App;
