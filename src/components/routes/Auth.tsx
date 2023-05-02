import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import { authService, firebaseInstance } from '../../fbase';

const Auth =  () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const { email, password } = inputs;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }
    const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if(newAccount) {
                // create account (새로운 계산 생성)
                data = createUserWithEmailAndPassword(auth, email, password)
            }else {
                // login
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleAccount = () => {
        setNewAccount(prev => !prev);
    }

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
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder='Email' 
                    required value={email} 
                    name='email'
                    onChange={onChange}
                />
                <input 
                    type='password' 
                    placeholder="Password" 
                    required value={password} 
                    name='password'
                    onChange={onChange}
                />
                <input type='submit' value={newAccount ? "Create Account" : "Sign In"} />
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
            </div>
        </div>
    );
};

export default Auth;