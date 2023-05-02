import React, { useEffect, useState } from 'react';
import { dbService } from '../../fbase';
import Jweet from '../Jweet';

interface IJweetObject {
    createAt?: number,
    jweet?: string,
    id: string,
    creatorId?: string,
    text?: string
}

interface IHomeProps {
    userObj: {
        [key: string]: string;
    }
}

const Home = ({ userObj }: IHomeProps) => {
    const [jweet, setJweet] = useState("");
    const [jweets, setJweets] = useState<IJweetObject[]>([]);
    // const getJweets = async () => {
    //     const dbJweets = await dbService.collection("jweets").get()
    //     dbJweets.forEach(document => {
    //         const jweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setJweets((prev) => [jweetObject, ...prev]);
    //         console.log(jweets);
    //     });
    // }
    useEffect(() => {
        dbService.collection("jweets").onSnapshot((snapshot) => {
            const jweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setJweets(jweetArray);
            
        })
        // getJweets();
    }, []);

    // submit 할 때 마다 document를 생성해주기
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dbService.collection('jweets').add({
            text: jweet,
            createAt: Date.now(),
            creatorId: userObj.uid
        });
        setJweet("");
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // event 안에 있는 target 안에 있는 value 호출.
        const { 
            target: {value}
        } = event;
        setJweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={jweet}
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120} 
                    onChange={onChange}
                />
                <input type="submit" value={'jweet'} />
            </form>            
            <div>
                {
                    jweets.map((item, index) => {
                        return (
                            <Jweet 
                                key={index} 
                                jweetObj={item} 
                                isOwner={item.creatorId === userObj.uid} 
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Home;