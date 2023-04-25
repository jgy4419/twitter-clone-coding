import React, { useState } from 'react';
import Router from './router';
import { authService } from '../fbase';

function App() {

  const [isLoggedIn, setIsLoggeIn] = useState(authService.currentUser);
  return <Router isLoggedIn={isLoggedIn}/>;
}

export default App;
