"use client"
import React, {useState } from 'react'
import axios from 'axios'
import { URL } from '@/api/api'
const Update = ( {user,close,getData}) => {
 
  

  const initial = user
    const [inputData, setInputData] = useState(initial)
      const handleSubmit = (event, id) => {
        event.preventDefault()
        axios.put(URL + id, inputData)
        .then(res => {
           alert('data Updated sucesfully') 
        })
        .catch(err => console.log(err))
        if(document){
            document.body.style.overflowY = "scroll"
          }
          close(state => !state)
          getData()
        }
  
    return (
   
   <div className='update-container'>
    <h2>Update User.</h2>
    <form onSubmit={e => handleSubmit(e, user.id)} onKeyDown={e => e.key === "Enter" ? handleSubmit(e, user.id): null}>
    <div className="input-container">
      <span>Id:</span>  
      <input className='input'  type="text" value={inputData.id} disabled/>
     </div>
    
     <div className="input-container">
      <span>Name</span>  
      <input className='input' type="text" value={inputData.name} onChange={e => setInputData({...inputData, name: e.target.value})}/>
     </div>
     <div className="input-container">
      <span>Email</span>  
      <input className='input' type="email" value={inputData.email} onChange={(event) => setInputData({...inputData, email: event.target.value})}/>
     </div>
     <button className='btn'>Update</button>
    </form>
    </div>
    
  )
}

export default Update