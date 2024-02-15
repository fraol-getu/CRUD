"use client"

import { URL } from '@/api/api';
import axios from 'axios';
import { useState } from "react";


const Create = ({ getData }) => {
    const initial = {
      name: '',
      email: ''
    }
    const [inputData, setInputData] = useState(initial)
    const handleSubmit = (event) => {
      event.preventDefault()
      if(inputData.name && inputData.email){
      axios.post(URL, inputData)
        .then(res => {
          alert('data posted sucesfully')
          getData()
          setInputData(initial)
          
        })
        .catch(err => console.log(err))
      }
  
    }
    
    return (
      <div className='create-container'>
        <h2>Create User.</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <span>Name</span>
            <input required className='input' value={inputData.name} type="text" onChange={e => setInputData({ ...inputData, name: e.target.value })} />
          </div>
          <div className="input-container">
            <span>Email</span>
            <input required className='input' type="email" value={inputData.email} onChange={e => setInputData({ ...inputData, email: e.target.value })} />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
  
    )
  }
  export default Create