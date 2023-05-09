import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../../fbase';
import { useNavigate } from 'react-router-dom';
import { RefreshUser } from '../router';

interface IProfileProps {
    userObj: {[key: string]: any}
    refreshUser: RefreshUser
}

const Profile = ({userObj, refreshUser}: IProfileProps) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const getMyJweets = async () => {
        // where은 필터링(로그인 한 user)하는 방법을 알려준다.
        // where 안에 createId 즉, 생성한 id가 userObj의 uId와 동일한 값의 정보를 .get() 가져온다.
        const jweets = await dbService
            .collection('jweets')
            .where("creatorId", "==", userObj.uid)
            .orderBy("createAt")
            .get();
        console.log(jweets.docs.map(doc => doc.data()));
    }

    const navigation = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigation('/');
        refreshUser();
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDisplayName(e.target.value)
    }
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userObj);
        console.log(newDisplayName);
        
        if(userObj.displayName !== newDisplayName) {
            
            if(typeof newDisplayName === 'string') {
                // 이미지 같은 경우는 다른 버켓에 사진을 업로드 하고, 다운로드 할 수 있는 URL을 가져와서 넣어주면 된다.
                await userObj.updateProfile({
                    displayName: newDisplayName
                })
            }
        }
        refreshUser();
    }
    
    useEffect(() => {
        // 내 Jweet를 얻는 함수를 호출.
        getMyJweets();
    }, []);

    return (
        <>
            <h2>Profile</h2>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder={newDisplayName} />
                <input type="submit" value={"Update Profile"} />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;