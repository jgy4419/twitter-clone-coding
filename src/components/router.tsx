import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Navigation from './Navigation';
import React from 'react';
import Profile from './routes/Profile';

export type RefreshUser = () => void;

interface IAppRouterProps {
    refreshUser: RefreshUser;
    isLoggedIn: boolean;
    userObj: {[key: string]: string}
}

const AppRouter =  ({isLoggedIn, userObj, refreshUser}: IAppRouterProps) => {
    return ( 
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? 
                <>
                    <Route path='/' element={<Home userObj={userObj}/>}/>
                    <Route path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj}/>}/>
                </> 
                : <Route path='/' element={<Auth/>} />}
            </Routes>
        </Router>
    )
}

export default AppRouter;