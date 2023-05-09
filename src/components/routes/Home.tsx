import React, { useEffect, useState } from 'react';
import { dbService } from '../../fbase';
import Jweet from '../Jweet';
import JweetFactory from '../JweetFactory';

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
    const [jweets, setJweets] = useState<IJweetObject[]>([]);
    useEffect(() => {
        // jweets collection에 있는 snapshot(데이터들)을 모두 가져와서 jweets state에 넣어주기.
        dbService.collection("jweets").onSnapshot((snapshot) => {
            const jweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setJweets(jweetArray);
            
        })
    }, []);

    
    return (
        <div>
            <JweetFactory userObj={userObj}/>
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