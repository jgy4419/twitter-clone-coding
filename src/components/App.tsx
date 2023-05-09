import React, { useEffect, useState } from 'react';
import Router from './router';
import { authService } from '../fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<any>(null);

  // firebase가 프로그램을 초기화 할 때 까지 기다려주기.
  useEffect(() => {
    // 로그인한 유저를 받고
    authService.onAuthStateChanged((user) =>  {
      // autoService가 바뀐다면 우리가 받을 user에 setUserObj 넣기
      if(user) {
        // 이곳에 user를 저장하고 저장된 user를 나중에 사용 가능.
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args: { displayName?: string | null | undefined; photoURL?: string | null | undefined; }) => user.updateProfile(args)
        });
      }else {
        setUserObj(null);
        setInit(true);
      }
    })
  }, []);
  // init 값이 false라면 router를 숨기기 때문에 true로 변경 시켜줘야 된다.

  const refreshUser = () => {
    const user = authService.currentUser;
    if(user !== null) {
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args: { displayName?: string | null | undefined; photoURL?: string | null | undefined; }) => user.updateProfile(args)
      });
    }
  }
  return (
    <>
      {/* 받은 유저를 AppRouter로 보내기 */}
      {init ? <Router refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App;