import React from 'react'
import "./nav.css"
import { useNavigate } from 'react-router-dom';
const Nav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <img src="https://maxst.icons8.com/vue-static/icon/popular-request/request-social-media.png" alt="" />
        <div className="home">
          <div className="d-flex align-items-center nav-button" onClick={() => { navigate("/") }}>
            <i className="fa-solid fa-house"></i>
            <div className="home-c mx-2" >Home</div>
          </div>
          <div className="d-flex align-items-center nav-button" onClick={() => { navigate("/post") }}>
            <i className="fa-solid fa-plus"></i>
            <div className="home-c mx-2" >Create Post</div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Nav