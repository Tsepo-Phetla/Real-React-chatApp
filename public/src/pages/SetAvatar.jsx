import React, { useState, useEffect } from 'react'; // Importing React and hooks
import styled from "styled-components";
import loader from "../assets/Loader.gif";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

import { Buffer } from 'buffer';

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };

useEffect(() => {
    async function checkUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");                              
      }
    }
    
    checkUser();
  }, [navigate]); 

const setProfilePicture = async () => {
  if (selectedAvatar === undefined) {
    toast.error("Please select an avatar", toastOptions);
    return;
  }

  // Get the user data from localStorage
  const userString = localStorage.getItem("chat-app-user");

  // Check if user data exists and is not null
  if (!userString) {
    toast.error("User data not found. Please log in again", toastOptions);
    return;
  }

  // Parse the user data from JSON
  const user = JSON.parse(userString);

  // Check if user data is valid and contains _id
  if (!user || !user._id) {
    toast.error("Invalid user data. Please log in again", toastOptions);
    return;
  }

  try {
    // Make the POST request to set the avatar
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    console.log(data);

    if (data.isSet) {
      // Update the user object and save it to localStorage
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem("chat-app-user", JSON.stringify(user));
      navigate('/');
    } else {
      toast.error("Error setting avatar. Please try again", toastOptions);
    }
  } catch (error) {
    console.error("Error setting avatar:", error);
    toast.error("Error setting avatar. Please try again", toastOptions);
  }
};


  useEffect(() => {
    async function fetchAvatars() {
      const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        return data;
      };
  
      const fetchedData = await fetchData();
      setAvatars(fetchedData);
      setIsLoading(false);
    }
  
    fetchAvatars();
  }, []); // Empty dependency array to run the effect only once
  

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                key={index}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color:  #997af0;
  height: 100vh;
  width: 100%;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex; 
    justify-content: center;
    gap: 1rem;
  }

  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease-in-out;

    img {
      height: 6rem;
    }
  }

  .selected {
    border: 0.4rem solid #4e0eff;
  }

  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #4e0eff;
    }
  }
`;


export default SetAvatar;