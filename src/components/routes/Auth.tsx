import React from 'react';
import { authService, firebaseInstance } from '../../fbase';
import AuthForm from '../AuthForm';

const Auth =  () => {

    const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement> & {
        target: {
            name: string
        }
    }) => {
        console.log(event);
        const {target: {name}} = event;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else return;
        // TypeScript 에서는 조건문 처리 반환해주지 않으면 에러 발생 (여기선 provider에서 에러 발생)
        const data = await authService.signInWithPopup(provider);
        console.log(data);
        console.log(event.target.name);
    }
    return (
        <div>
            <AuthForm/>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
            </div>
        </div>
    );
};

export default Auth;