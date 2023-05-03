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
    const [attachment, setAttachment] = useState<string | null>();
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
    // 이미지 파일을 업로드 해주는 함수
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {files}
        } = event;
        if(files) {
            const theFile = files[0];
            const reader = new FileReader();
            // 2. 여기 실행(onload : 실행이 완료되면 실행되는 함수
            reader.onload = (finishEvent) => {
                const {currentTarget: 
                    {result}
                } = finishEvent as any;
                setAttachment(result)
            }
            // 1. 읽기 시작하고 다 읽으면
            reader.readAsDataURL(theFile);
        }
    }
    // 이미지를 지워주는 함수
    const onClearAttachmentClick = () => setAttachment(null);
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
                {/* accept로 어떤 이미지를 가져와야 되는지 파일 형식을 정해줄 수 있다.(필수는 x) */}
                <input type="file" accept='image/*' onChange={onFileChange}/>
                <input type="submit" value={'jweet'} />
                {/* attachment 값이 null이 아니면 img 보여주기 */}
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="파일 이미지" />
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>
                )}
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