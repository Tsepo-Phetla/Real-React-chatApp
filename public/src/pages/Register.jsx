import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom';

function Register() {

  const handleSubmit = (event)=>{
    event.peventDefault();
    alert("form");
  }

  const handleChange = (event)=>{
    event.peventDefault();
    alert("form");
  }


  return (
    <>
    <FormContainer>
<form onSubmit={(event)=>handleSubmit(event)}></form>
<div className="brand">
<img src="" alt=""/>
<h1>snappy</h1>
</div>

<input type='text' 
placeholder='Username' 
name="username"
onChange={(e) => handleChange(e)}

/>
<input type='email' 
placeholder='Email' 
name="email"
onChange={(e) => handleChange(e)}

/>

<input type='password' 
placeholder='Password' 
name="password"
onChange={(e) => handleChange(e)}

/>

<input type='password' 
placeholder='Confirm Password' 
name="confirmPassword"
onChange={(e) => handleChange(e)}

/>

<button type="submit">Create User</button>
<span>Already have an account ? <Link to="/login" >Login</Link></span>
    </FormContainer>
    </>
  )
}

const FormContainer = styled.div``;

export default Register;