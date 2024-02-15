"use client"

import { URL } from '@/api/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaIdCard, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Read = ({id,close}) => {

  const [data, setData] = useState(null); // Initialize data to null to avoid errors
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  function getData(id){
    setIsLoading(true);
    axios
      .get(`${URL}${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));  
  }

  function handleClose(){
    if(document){
      document.body.style.overflowY = "scroll"
    }
    close(state => !state)
  }
  useEffect(() => {
    getData(id)
    
  }, [id]); 



  return (
    <div className='read-container'>
      <button className="btn" onClick={handleClose}  onKeyDown={e => e.key === "Enter" ? handleClose(): null}>Back</button>
      <div className="user-detail">
      {isLoading ? (
        <h2>Loading...</h2>
        
      ) : (data ? (
          <div className='user'>
            <h2>User</h2>
            <div className="lable">
            <span><FaIdCard />:</span>
            <p>{data?.id}</p>
            </div>
            <div className="lable">
            <span><FaUser/>:</span>
            <p>{data?.name}</p>
            </div>
            <div className="lable">
            <span><MdEmail />:</span>
            <p>{data?.email}</p>
            </div>


          </div>
        ) : (<h2>User not found or error. Please check console for details.</h2> )
      )}
      </div>

    </div>
  );
}

export default Read