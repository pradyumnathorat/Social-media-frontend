import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./details.css"
import Nav from '../Nav';

const Details = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [single, setSingle] = useState(null);
  
  const { id } = useParams()
  const getSinglePost = async () => {
    const response = await fetch(`${apiUrl}/post/${id}`);
    const data = await response.json();
    setSingle(data)
    
  }
  useEffect(() => {
    getSinglePost()
  }, [])

  if (!single) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Nav />
      <div className="main_1 m-3">
        <div className="img_1 shadow-lg">
          <img src={single.selectFile} alt="no img" />
        </div>
        <div className="details">
          <h3 className="details-name">{single.author}</h3>
          <p className="details-description">{single.description}</p>
          <div className="details-likes">
            <span className="likes-count">{single.likes} Likes</span>
          </div>
          <div className="details-likes">
            <span className="likes-count">{single.comments.length} Comments</span>
          </div>
          <div className="comments_a">
            <h4>All Comments:-</h4>
            <div className="allcomments">
              {
                single.comments.map((ele) => (
                  <div className='mb-2'>{ele}</div>
                ))
              }
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Details