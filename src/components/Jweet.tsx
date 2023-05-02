import React, { useState } from 'react';
import { dbService } from '../fbase';

const Jweet = ({jweetObj, isOwner}: any) => {
    const [editing, setEditing] =  useState(false);
    const [newJweet, setNewJweet] = useState(jweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure want to delete this jweet?");
        console.log(ok)
        if(ok) {
            // delete jweet
            await dbService.doc(`jweets/${jweetObj.id}`).delete();
        }
    }

    const toggleEditting = () => setEditing(prev => !prev);

    const onSubmit = async (event: any) => {
        event.preventDefault();
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