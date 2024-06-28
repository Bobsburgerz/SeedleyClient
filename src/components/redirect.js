import React, {useEffect} from 'react';
import axios from 'axios'
import cam from './assets/caa.png';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
const Redirect = () => {
const navigate = useNavigate()
const user = useSelector((state) => state.user);
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        async function getCode() {
          if (code) {
            try {
              const res = await axios.get(`https://5500-andrewmta-seedleybacken-80dth4pna3v.ws-us114.gitpod.io/redirect?code=${code}&user=${user._id}`);
              navigate('/dashboard');
            } catch (e) {
              console.log('e.message');
            }
          }
        }
    
        getCode();
      }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
Success!
    </div>
  );
};

export default Redirect;
