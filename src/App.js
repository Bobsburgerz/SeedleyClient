import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import { ClipLoader } from 'react-spinners';
import Signup from './components/Form';
import Enviroment from "./components/Enviroment";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Pricing from './components/Pricing';
import Redirect from './components/redirect';
import axios from './api/axios'
import { useLocation } from 'react-router-dom';
import {Outlet } from 'react-router-dom';
import { updateCalls } from './features/callSlice';
import { useUpdateUserMutation } from "./services/appApi";
import ReactGA from 'react-ga4';
ReactGA.initialize('G-FT1VZ92J07');
ReactGA.send({ 
  hitType: "pageview", 
  page: "/", 
  title: "Home"})


const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const waitAndSetLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    waitAndSetLoading();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#21c23e" size={75} />
      </div>
    );
  }

  return user?._id ? <Outlet /> : <Navigate to="/login" />;
};
const App = () => {
  const [updateUser, { isError, isLoading, error }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const location = useLocation();
  const user = useSelector((state) => state.user);


  const socketRef = useRef(null);


  useEffect(() => {
if (user) {
    const intervalId = setInterval(() => {
      getUsage();
     
    },  30000);  
    return () => {
      clearInterval(intervalId);
    };}
  }, []);  

  const getUsage = async () => {
    try {
 
      const res = await axios.get(`/user/usage?userId=${user._id}`);
 
      if (res.data.usage && res.data.credits) {
        await updateUser({ id: user._id, usage: res.data.usage, credits: res.data.credits });
      } 
    } catch (error) {
      console.error('Error retrieving usage:', error);
    }
  };


 


  useEffect(() => {
    const connectSocket = () => {
      const socket = new WebSocket(`wss://coldcall.onrender.com/react-app?userId=${user?._id}`);
      socketRef.current = socket;

      socket.addEventListener('message', async (event) => {
        try {
          const message = event.data;
          let parsedMessage = message;

          // Check if the message is a string
          if (typeof message === 'string') {
            try {
              parsedMessage = JSON.parse(message);
            } catch (error) {
              // Handle the error when parsing fails
              console.error('Error parsing JSON message:', error);
            }
          }

          if (parsedMessage.calls && parsedMessage.user) {
            await updateUser({ id: user._id, credits: parsedMessage.user.credits, usage: parsedMessage.user.usage });
            dispatch(updateCalls(parsedMessage.calls));
          }
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
        }
      });

      socket.addEventListener('close', (e) => {
        console.log('Socket is closed');
        setTimeout(() => {
          connectSocket();
        }, 5000);
      });

      socket.addEventListener('error', (err) => {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        socket.close();
      });
    };

    connectSocket();

    const interval = setInterval(() => {
      if (socketRef.current && socketRef.current.readyState !== WebSocket.OPEN) {
        console.log('Socket is not open. Reconnecting...');
        socketRef.current.close();
        connectSocket();
      } else {
     return
      }
    }, 1000);  

    return () => {
      clearInterval(interval);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user?._id, dispatch]);


  return (
    <>
      <ReactFlowProvider>
      {location !== '/' &&  <Navbar />}
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/redirect" element={<Redirect/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/enviroment" element={<Enviroment />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />  
        
          <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
         </Route>  
        </Routes>
      </ReactFlowProvider>
    </>
  );
};


export default App;