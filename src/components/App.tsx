import React, { useEffect, useState } from 'react';
import Router from './router';
import { authService } from '../fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(authService.currentUser);
  // firebase가 프로그램을 초기화 할 때 까지 기다려주기.
  useEffect(() => {
    authService.onAuthStateChanged((user) =>  {
      if(user) {
        setIsLoggedIn(true);
      }else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);
  // init 값이 false라면 router를 숨기기 때문에 true로 변경 시켜줘야 된다.
  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App;
 