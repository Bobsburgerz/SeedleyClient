import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import axios from "../api/axios";
import Assistant from "./Assistant"
import Calls from "./Calls";
import Billing from "./Billing";
import PhoneNum from "./PhoneNum";
import {resetProducts} from "../features/productSlice"
import useLogout from "../hooks/useLogout";
import { logout } from "../features/userSlice";

import { updateAssistants } from '../features/assistantSlice';
import { updatePhoneNum } from '../features/phoneNumSlice';
import { useLocation } from 'react-router-dom';
import { updateCalls } from '../features/callSlice';
import Modal from "./ModalComponents/PlanPayment"
import "./styles/Home.css"
import { useUpdateUserMutation } from "../services/appApi";
 

 


const Dashboard = () => {
 
 


  const loading = useSelector((state) => state.loading);
  const logouts = useLogout();
  const handleLogout =  () => {
    dispatch(resetProducts());
      logouts();
      dispatch(logout());
  }






const dispatch = useDispatch()
const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState('')
  const [option, setOption] = useState('Assistants')
  const user = useSelector((state) => state.user)
  const userId = user?._id;
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const makeCall = queryParams.get('makeCall');

    if (page === 'phone' && makeCall === 'true') {
   setOption("Phone Numbers")
      
    }
  }, [location.search]);
  useEffect(() => {
    const getFlow = async () => {
   const res = await axios.get(`/user/dashboard-data/${user?._id}`)
 
   if (res.data) {
 
   dispatch(updateAssistants(res.data.assistants))}
   dispatch(updatePhoneNum(res.data.phoneNums))
   dispatch(updateCalls(res.data.calls)) 
    }
    getFlow()
    }, []);

    useEffect(() => {
  if(user?.paid == false) {
setIsOpen(true)
 
  }
      }, []);
    const searchParams = new URLSearchParams(window.location.search);
    useEffect(() => {
      const getFlow = async () => {
  
        const pricingParam = searchParams.get('pricing');
  
        if (pricingParam === 'true') {
        return;
        }
      };
  
      getFlow();
    }, [option, searchParams]);
 
const flow = []

  const isLinkDisabled = flow?.length === 2;
 
  const options = [
    { label: 'Assistants'  },
    { label: 'Phone Numbers' },
    { label: 'Calls'},
 
  ];
  



    if (loading) {
   
      return (
        <div style={{ display: 'flex', 
        justifyContent: 'center', alignItems: 'center', height: '110vh' }}>
         
        </div>
      );
    }
 return (  
  <div className="bg-2" style={{ padding: '0px' }}>
    <div style={{ 
    display: 'flex', 
    width:'100%', 
    columnGap: '15px' }}>
      <div style={{ minWidth: '255px',
       background: '#34a853',
        margin: '0px', 
        height: '100%',
         minHeight: '115vh',
          fontWeight: '700',
           borderRight: '2px solid orange' }}>
        <div style={{ padding: '0px', 
        paddingTop: '15px',
        display:'flex', 
        flexDirection: 'column',
         rowGap:'10px' }}>
  <div style={{ background: '#34a853',zIndex:'99999999', color: '#34a853', position: 'absolute', width: '255px', left: '0', height: '5px', top: '54px' }}>.</div>
        {options.map((opt, index) => (
      <Link key={index} style={{ color: opt.label == option ? '#34a853' : '#f2f2f2' }} to={isLinkDisabled ? "#" : "#"}>
        <div onClick={() => setOption(opt.label)} className="nav-side" style={{ 
         padding: '10px',color: opt.label == option ? '#34a853' : '#f2f2f2', background: opt.label == option && '#f2f2f2' ,
          boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.2)', margin: '0px 15px', cursor: 'pointer',
          borderRadius: '5px' }}>
          {opt.label} 
        </div>
      </Link>
    ))}


        </div>
{isOpen  &&  <>  <Modal onClose={() => setIsOpen(false)} /></>}
        <div onClick={() => setOption("Billing")} className="nav-side"style={{  bottom: '70px', padding: '10px',color:'#f2f2f2', width: '215px',
          boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.2)', margin: '0px 15px',  cursor: 'pointer', position:'absolute', opacity: '1',
          borderRadius: '5px' }}>
      Billing
        </div>
<div onClick={() => handleLogout()} className="nav-side" style={{  bottom: '25px', padding: '10px',color:  '#f2f2f2', width: '215px',
          boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.2)', margin: '0px 15px', cursor: 'pointer', position:'absolute',
          borderRadius: '5px' }}>
         Logout
        </div>
      </div>

        <div style={{width:'77.5%'}} >


          {option == "Assistants" ? <Assistant/> : option == "Calls" ? <Calls/> : option == "Billing"  ?  <Billing/>  : <PhoneNum/> }
  

  

         


        </div>
      </div>

  </div>
)

};

export default Dashboard;
