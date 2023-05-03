import React, { useEffect, useState } from 'react';

const Test = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchTodo = async () => {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/posts/`
            );
            const newUser = await res.json();
            setUser(newUser);
        }
        fetchTodo();
    }, [user]);
    return (
        <div>
            
        </div>
    );
};

    
export default Test;