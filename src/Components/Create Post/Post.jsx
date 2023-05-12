import React, { useState } from 'react'
import "./post.css"
import Nav from '../Nav'
import { useNavigate } from 'react-router-dom';
import FileBase from "react-file-base64";
const Post = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [postData, setPostData] = useState({ author: "", description: "", selectFile: "" });
    const navigate = useNavigate();
    const handlePost = async (e) => {
        console.log(postData);
        e.preventDefault();
        await fetch(`${apiUrl}/post`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        })
        navigate("/")
    }
    return (
        <>
            <Nav />
            <div className="post">
                <div className="form">
                    <div className="heading">
                        <h1>Create Post</h1>
                    </div>
                    <input className="inputs" type="text" placeholder='Author' value={postData.author} onChange={(e) => setPostData({ ...postData, author: e.target.value })} />
                    <textarea className="inputs" type="text" placeholder='Description' value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                    <div className='file'>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectFile: base64 })} />
                    </div>
                    <button onClick={handlePost}>Post</button>
                </div>
            </div>
        </>
    )
}

export default Post