import React from 'react'
import React, { useState, useEffect} from 'react';
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvatarRoute } from "../utils/APIRoutes";

function SetAvatar() {

    const api = "https://api.multiavatar.com/45678945";

const navigate = useNavigate();


  return
  <>
  <Container>SetAvatar</Container>;
  <ToastContainer/>
  </>
  
  
}

const Container = styled.div``;
