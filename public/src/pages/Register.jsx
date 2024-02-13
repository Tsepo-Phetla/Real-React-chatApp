import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Logo from "../assets/finger-tapping.gif";
import { Link } from 'react-router-dom';
import { ToastContainer, toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    username:"",
    email:"",
    password: "",
    confirmPassword: "",
  });

  const toastOptions ={
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  }

  useEffect(() => {
    console.log('Register component mounted');
    // Optionally, you can return a cleanup function here
    return () => {
      console.log('Register component unmounted');
    };
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const registerRoute = '/api/register'; 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, confirmPassword, username, email } = values;
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
          confirmPassword
        });
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
   
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      console.log("inm validation', toast");
      toast.error("Passwords and confirm password should be the same.", 
      toastOptions
      
      );
      return false;
    } else if (username.length <3){
      toast.error("Username should be greater than 3 characters.", 
      toastOptions
      );
    } else if (password.length < 8){
      toast.error("password should be greater than 8 characters.", 
      toastOptions
      );
      return false;
    } else if(email ===""){
toast.error("email is required", toastOptions);
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chat`Sphere</h1>
          </div>

          <input
            type='text'
            placeholder='Username'
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type='email'
            placeholder='Email'
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <input
            type='password'
            placeholder='Password'
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <input
            type='password'
            placeholder='Confirm Password'
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>

          <span>Already have an account ? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
height:100vh;
with:100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items: center;
background-color:#DCDCDC ;
.brand{
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  img{
    height: 5rem;
    border-radius:5px;
  }
  h1{
    color:#1E90FF;
    text-transform: uppercase;
  }
}

form {
  display:flex;
  flex-direction: column;
  gap: 2rem;
 border-radius: 2rem;
 padding: 3rem 5rem;
background-color:lightgray;
 input{
background-color: transparent;
padding:1rem;
border: 0.1rem solid #4e0eff;
border-radius: 0.4rem;
color:black;
width: 100%;
font-size: 1rem;

&: focus{
  border: 0.1rem solid #997af0;
  outline: none;
}
 }
 button{
  background-color: #997af0;
  color: white;
  padding: 1rem 2rem;
  boder:none;
  font-weight: bold;
  cursor:pointer;
  border-radius:0.4rem;
  transition: 0ms.5s ease-in-out;
  &:hover{
    background-color:#4e0eff;

  }
 }
 span{
  color:#2F4F4F;
  
  a {
color: #04e0eff;
text-transform: none;
font-weight: bold;
text-decoration:
  }
 }
}
}
`;


export default Register;