import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Navigation from './Navigation';
import React from 'react';
import Profile from './routes/Profile';

interface IAppRouterProps {
    isLoggedIn: boolean;
    userObj: {[key: string]: string}
}

const AppRouter =  ({isLoggedIn, userObj}: IAppRouterProps) => {
    return ( 
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? 
                <>
                    <Route path='/' element={<Home userObj={userObj}/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </> 
                : <Route path='/' element={<Auth/>} />}
            </Routes>
        </Router>
    )
}

export default AppRouter;