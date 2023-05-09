import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';

const AuthForm = () => {
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
        </div>
    );
};

export default AuthForm;