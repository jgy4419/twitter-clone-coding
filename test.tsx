import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    } from 'firebase/auth';
    import React, { useState } from 'react';
    
    const Auth = () => {
        const [inputs, setInputs] = useState({
            email: '',
            password: '',
        });
        const [newAccount, setNewAccount] = useState(true);
        
        const { email, password } = inputs;
        
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    
    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if (newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
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
                <input type='submit' value={newAccount ? "Create Account" : "Login"} />
            </form>
            <div>
                <button>Continue with Google</button>
            </div>
        </div>
    );
};

export default Auth;