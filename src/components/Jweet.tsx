import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';

const Jweet = ({jweetObj, isOwner}: any) => {
    const [editing, setEditing] =  useState(false);
    const [newJweet, setNewJweet] = useState(jweetObj.text);

    const onDeleteClick = async () => {
        // user를 확인하고 nweet을 지우길 원하는지 확인.
        const ok = window.confirm("Are you sure want to delete this jweet?");
        console.log(ok)
        if(ok) {
            // delete jweet + delete image
            /* 
                .doc()은 DocumentReference 에서 지정된 경로에서 문서를 참조하는 인스턴스를 가져온다.
                안자 : 문서 경로(슬래시로 구분된 문서 경로. 문자열로 넣어주기.) "collection명/jweet아이디" 즉, 게시글 을 가져오고 .delete()로 삭제를 시켜주는 식.
                .doc()과 연결해서 쓸 수 있는 메서드는 collection, onSnapshot, delete, set, get, update, isEqual, withConverter가 있다.
            */
            await dbService.doc(`jweets/${jweetObj.id}`).delete(); // jweet delete
            /* 
                .refFromURL method는 주어진 절대 URL에 대한 참조를 반환한다.
                .refFromURL랑 연결해서 사용할 수 있는 method는 child, listAll, delete, put, list, toString, putString 등이 있다.
            */
            await storageService.refFromURL(jweetObj.attachmentUrl).delete(); // delete storage image
        }
    }

    const toggleEditting = () => setEditing(prev => !prev);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        // dbService의 update 기능 실행.
        await dbService.doc(`jweets/${jweetObj.id}`).update({
            text: newJweet
        });
    }
    const onChange = (event: any) => {
        const {
            target: {value}
        } = event;
        setNewJweet(value);
    }

    return (
        <div>
            <div key={jweetObj.id}>
                {
                    // 글을 작성한 주인이고 수정을 원한다면 ? update 가능한 버튼이 생긴다.
                    editing ? <>
                        <form onSubmit={onSubmit}>
                            <input 
                                onChange={onChange}
                                type="text" 
                                placeholder='Edit your jweet' 
                                value={newJweet} 
                                required
                            />
                            <input type="submit" value="Update Jweet" />
                        </form>
                        <button onClick={toggleEditting}>Cancel</button>
                    </>
                    : <>
                        <h4>{jweetObj.text}</h4>
                        {/* attachmentUrl 있을 때만 실행 시켜주기 왜냐하면 몇몇 
                            jweet는 attackment 를 가지고 있지 않기 때문이다. */}
                        {jweetObj.attachmentUrl && <img src={jweetObj.attachmentUrl} width="50px" height="50px" alt='메인 이미지'/>}
                        {
                            isOwner && <>
                                <button onClick={onDeleteClick}>Delete Jweet</button>
                                <button onClick={toggleEditting}>Edit Jweet</button>
                            </> 
                        }
                    </>
                    
                }
            </div>
        </div>
    );
};

export default Jweet;