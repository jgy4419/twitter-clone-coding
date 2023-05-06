import React, { useEffect, useState } from 'react';
import { dbService, storageService } from '../../fbase';
import Jweet from '../Jweet';
// uuidv4() 를 사용해주면 ex. '9b1deb4d-3b7d...' 같은 문자열을 랜덤으로 받을 수 있듬.
import {v4 as uuidv4} from 'uuid';

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
    }, []);

    // submit 할 때 마다 document를 생성해주기
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        /* 
            - 사진이 있다면 사진을 올리고
            - URL을 받아서 jweet에 넣기.
        */
        // 이미지가 없는 사용자들을 위해서 분리 시켜주기. 
       let attachmentUrl = "";
        if(attachment){
            // reference에서 폴더를 만들 수 있다.
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            // download url을 만들어줌. 해당 url을 jweet에서 사용할 것이다.
            attachmentUrl = await response.ref.getDownloadURL();
        }
        // 만약 사진이 없다면 업로드 
        const jweetObj = {
            text: jweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        dbService.collection('jweets').add(jweetObj);
        
        setJweet("");
        setAttachment("");
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