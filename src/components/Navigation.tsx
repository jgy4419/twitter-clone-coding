import React from 'react';
import {Link} from 'react-router-dom';

interface INavigationProps {
    userObj: {[key: string]: string}
}

const Navigation = ({userObj}: INavigationProps) => {
    console.log(userObj);
    
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">{userObj.displayName}의 Profile</Link></li>
        </ul>
    );
};

export default Navigation;