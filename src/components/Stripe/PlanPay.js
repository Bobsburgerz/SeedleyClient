import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios.js"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardInput from "./CardInput.js";
import "./StripeStyles.css"
import Lottie from 'lottie-react';
import lottieFile from "./lottie/confirm.json"
import { useUpdateUserMutation } from "../../services/appApi.js";
function CheckoutForm({onClose}) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false)
  const [card, setCard] = useState([{}])
  const [selectedCard, setSelectedCard] = useState(card?.length > 0 ? card[0] : []);
  const [secret,setSecret] = useState(user?.client)
  const [amount, setAmount] = useState(2500)
  const [updateUser, { isError, isLoading, error }] = useUpdateUserMutation();
  const [selected, setSelected] = useState("Standard")
  const [failed, setFailed] = useState(false)
  const [success, setSuccess] = useState(false)

useEffect(() => {
  const getFlow = async () => {
    if (success) {
      
      setTimeout(() => {
       onClose();
    
      }, 2100);
    }
  };

  getFlow();
}, [success]);

useEffect(() => {
  const getFlow = async () => {
    if (failed) {
      setTimeout(() => {
      setFailed(false)
    
      }, 2100);
    }
  };

  getFlow();
}, [failed]);

 const handleAnimationComplete = () => {
  onClose()
 }
const handlePay = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      try {   
       setLoading(true)
        const clientSecret = secret
        
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                email: user.email,
              },        }   
          });
     
    
          if (result.error) {
            setFailed(true)
            setLoading(false)
            console.error(result.error);
            return false;
          } else {
        
            if (result.paymentIntent.status === "succeeded") {
         
            } else {
              console.log('err')
              setFailed(true)
              setLoading(false)
              return false;
            }
          }

setSuccess(true)
updateUser({id:user._id, paid:true, credits: amount + user.credits}) 
      }
      catch (error) {
     console.log('error.message');
      }
    };
 



    useEffect(() => {
    const getFlow = async () => {

      if(user) {
     
      setLoading(true)
      
      const cards = await axios.get(`/payments?customerId=${user.customer}`)
      const amount = selected == "Standard" ? 24900 : 8900
      const getSecret = await axios.post("/create-payment", {amount, customer:user?.customer})
      setSecret( getSecret?.data?.paymentIntent.client_secret)
       
       
    
      setLoading(false)
   
              
    }}



  getFlow()
  },[selected])
  
  
    return (
      <div style={{backgroundColor:'white'}} className="stripe-form">

        {!success ? <>
        Success
          <Lottie
      animationData={lottieFile}
      speed={0.5} // Set the playback speed to 0.5 to make it slower
      onComplete={handleAnimationComplete}
      autoplay
    />
        
         </> : <> 
      <form onSubmit={handlePay}>
   <div style={{ alignItems: 'center',display:'flex'}}> 
   <div style={{display:'flex',alignItems: 'center',  justifyContent:'space-between',columnGap:'10px'}}>
     
      
   <div className="info-wrap">
      <h2>Get Started</h2>{failed && <div style={{color: 'red', position: 'absolute' , top: '8px', right: '15px'}}><h3 > Payment failed </h3> </div> }
      <div className="plan-wrap">
     <div onClick={() => setSelected("Standard")} style={{opacity: selected == "Standard" ?  '1' :  '.3'}} className="plan-card"> 
      <h1>{user.plan == "standard" ? <>$249</> : <>$89</>}</h1>
      <p> {user.plan == "standard" ? "Standard" : "Basic"}</p>
      
      </div>
      <div onClick={() => setSelected("Basic")}style={{opacity: selected == "Basic" ?  '1' :  '.3'}}className="plan-card"> 
      <h1>{user.plan !== "standard" ? <>$249</> : <>$89</>}</h1>
      <p> {user.plan !== "standard" ? "Standard" : "Basic"}</p>
      
      </div></div>
      
      </div>
    
      </div>
 
      
      </div> 


  
           
    
 

 
    
          
          <>

          <h3>{selected} {selected == "Standard" ? "$249" : "$89"} per month</h3>
          <label htmlFor="card-element">Card Info</label>
          <div style={{border: failed && '1px solid red'}} className="card-element">
              <CardInput  failed={failed}/>
          </div>

          <label htmlFor="card-name">Name on Card</label>
          <input style={{border: failed && '1px solid red'}}id="card-name" className="inputName" />

          <button disabled={loading} style={{opacity: loading ? '.5':'1'}}className="pay-btn" type="submit">Checkout</button>
          </> 
  
      </form></>}
  </div>
    );
}

export default CheckoutForm;