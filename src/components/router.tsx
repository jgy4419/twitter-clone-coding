import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Navigation from './Navigation';
import React from 'react';
import Profile from './routes/Profile';

interface IAppRouterProps {
    isLoggedIn: any;
}

const AppRouter =  ({isLoggedIn}: IAppRouterProps) => {
    return ( 
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? 
                <>
                    <Route path='/' element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </> 
                : <Route path='/' element={<Auth/>} />}
            </Routes>
        </Router>
    )
}

export default AppRouter;