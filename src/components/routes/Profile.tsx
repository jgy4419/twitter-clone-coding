import React from 'react';
import { authService } from '../../fbase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigation = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigation('/');
    }
    return (
        <>
            <h2>Profile</h2>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;