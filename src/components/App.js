import React, { useState } from 'react';
import Router from './router';
import { authService } from '../fbase.js';

function App() {

  const [isLoggedIn, setIsLoggeIn] = useState(authService.currentUser);
  return <Router isLoggedin={isLoggedIn}/>;
}

export default App;
