import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './context/themeContext';

import Router from './route/Router';

function App() {

  return (
    <BrowserRouter>
      <DarkModeProvider>
        <Router />
      </DarkModeProvider>
    </BrowserRouter>    
  )
}

export default App
