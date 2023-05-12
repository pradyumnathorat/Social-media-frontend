import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav'
import "./home.css"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
const Home = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [posts, setposts] = useState(null);
    const [modal, setModal] = useState(false);
    const [commentData, setCommentData] = useState(null);
    const [commentText, setCommentText] = useState("");
    const navigate = useNavigate();
    const getPosts = async () => {
        const response = await fetch(`${apiUrl}/post`);
        const data = await response.json();
        setposts(data.data)
    }
    useEffect(() => {
        getPosts();
    }, [])


    const handleLike = async (_id) => {
        const data = await axios.patch(`${apiUrl}/post/${_id}`)
        const updateData = posts.map(ele => ele._id == data.data._id ? ele = data.data : ele)
        setposts(updateData)
    }

    const handleComment = (ele) => {
        setCommentData(ele);
        setModal(true)
    }
    const createComment = async () => {
        const data = await axios.patch(`${apiUrl}/post/comments/${commentData._id}`, { comment: commentText })
        setCommentData(data.data);
        const updateData = posts.map(ele => ele._id == data.data._id ? ele = data.data : ele);
        setposts(updateData);
        setCommentText("")
    }
    return (
        <>
            <Nav />
            <div className="container ">
                <Modal size='lg' isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalHeader toggle={() => setModal(!modal)}>
                        Comments
                    </ModalHeader>
                    <ModalBody>
                        {
                            commentData && commentData.comments.map(ele => (
                                <p className='comm_1'>{ele}</p>
                            ))
                        }
                        <div className="comment d-flex justify-content-center">
                            <textarea className="form-control z-depth-1" type="text" placeholder="Write your comment" onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                            <button className='btn btn-primary  btn-md' onClick={createComment}>Post</button>
                        </div>
                    </ModalBody>
                </Modal>
                <div className="row d-flex align-items-center justify-content-center ">
                    <div className="col-sm-4">
                        {
                            posts && posts.map((ele) => (
                                <div className="card mb-3">
                                    <div className="card-header d-flex align-items-center justify-content-between">
                                        <h6 className='mb-0 ms-2 username' >{ele.author}</h6>
                                        <i className="fa-solid fa-ellipsis fa-lg"></i>
                                    </div>
                                    <div className="card-body d-flex align-items-center justify-content-center">
                                        <img src={ele.selectFile} alt="" className='mw-100' />
                                    </div>
                                    <div className="card-footer">
                                        <div className="d-flex align-items-center mt-2">
                                            <i className="fa-regular fa-heart fa-xl like" onClick={() => handleLike(ele._id)}></i>
                                            <i className="fa-regular fa-comment fa-xl mx-3 like" onClick={() => handleComment(ele)}></i>
                                            <i className="fa-solid fa-circle-info fa-xl" onClick={() => navigate(`/post/details/${ele._id}`)}></i>
                                        </div>
                                        <div className="mt-3 fw-bold"> {ele.likes} Likes</div>
                                        <div className=""><b>{ele.author}</b> {ele.description}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home