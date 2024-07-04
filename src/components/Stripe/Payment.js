  import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
  import React, { useState, useEffect } from "react";
  import axios from "../../api/axios.js"
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import CardInput from "./CardInput.js";
  import { useContext } from "react";
  import { useUpdateUserMutation } from "../../services/appApi.js";
  function CheckoutForm({onClose}) {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    const [firstStep, setFirstStep] = useState(true)
    const [loading, setLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [show, setshow] = useState("");
    const [addressError, setAddressError] = useState(false)
    const [errState, setErrState] = useState(false);
    const isAddFunds = true
    const [card, setCard] = useState([{}])
    const [selectedCard, setSelectedCard] = useState(card?.length > 0 ? card[0] : []);
    const [secret,setSecret] = useState(user?.client)
    const emailInput = document.querySelector('#email');
    const [amount, setAmount] = useState(2500)
    const [updateUser, { isError, isLoading, error }] = useUpdateUserMutation();


  const refreshPage = () => {
   onClose()


  };

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
 

setSelectedCard(card[0])

  }}, [card])
      
 
const getFlow = async () => {

  if(user) {
 
  setLoading(true)
  
  const cards = await axios.get(`/stripe/payments?customerId=${user.customer}`)
      
  const getSecret = await axios.post("/stripe/create-payment", {amount, customer:user?.customer})
  setSecret( getSecret?.data?.paymentIntent.client_secret)
  setCard(cards?.data?.cards?.data)
   
  setSelectedCard(cards?.data?.cards?.data[0])
  setLoading(false)
  setFirstStep(false)
          
}}

const handlePay = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
          return;
        }
        try {   
         setLoading(true)
          const clientSecret = secret
          
          const result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: selectedCard ? selectedCard?.id : {
                card: elements.getElement(CardElement),
                billing_details: {
                  email: user.email,
                },        }   
            });
       
      
            if (result.error) {
              // Handle payment error
              console.error(result.error);
              return false;
            } else {
              // The payment has been processed!
              if (result.paymentIntent.status === "succeeded") {
           
              } else {
                console.log('err')
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

      const handleCardSelection = (card) => {
        setSelectedCard(card);
      };
      
  
    
    
      return (
        <div style={{backgroundColor:'white'}} className="checkout-form">
  
          
        <form onSubmit={handlePay}>
     <div style={{justifyContent: 'space-between', alignItems: 'center',display:'flex'}}> 
     <div style={{display:'flex',alignItems: 'center', columnGap:'10px'}}>
       <div style={{marginTop: '-12px', marginLeft:'-3px',backgroundColor:'white', color: 'gray', border:'1px solid gray'}}className="closer-btn-2" onClick={() => setFirstStep(true)}> <div>{"<"}</div></div> 
        <h3>{isAddFunds ? <>Add Funds </> : <>Get Started</>}</h3></div>
        
        <div style={{marginTop: '-39px', backgroundColor: 'white', color: 'black', marginRight: '-12px'}} className="closer-btn-2" onClick={() => onClose()}> <div>{"x"}</div></div> 
        
        </div> 
 
  
    
            {card?.length > 0 ? <>
              {firstStep ? <> 
                <p style={{fontSize:'12px', color:'gray'}}>$25 minimum</p>
               <input value={amount / 100} onChange={(e) => setAmount(e.target.value * 100)} style={{fontSize:'16px'}}placeholder="Dollar Amount" type="number"/>
            <button style={{opacity: loading || amount / 100 < 25 || amount / 100 > 500 ? '.5' : '1'}}
             disabled={loading || amount / 100 < 25 ||  amount / 100 > 500} onClick={() => getFlow()}> 
            {loading ? <> Loading ... </> : <> Next </>}</button>   </> :
             <> 
{success ? <> Success!


<div><span style={{color: 'green'}}> ${amount / 100} </span>credit has been added </div>
 </> : <>
             
            {card?.map((pay, index) => (
              <>
          <div
            key={index}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >   
            <div style={{ display: 'flex', width: '200px', alignItems: 'center' }}>
              {pay?.card?.last4} {pay?.card?.brand}
            </div>
            <input
  style={{
    marginBottom: '-0px',
    height: '20px',
    width: '20px', 
  }}
  type="radio"
  name="paymentMethod"
  checked={selectedCard === pay}
  onChange={() => handleCardSelection(pay)}
/>     
</div>
</> ))}
        
        
       <div style={{marginTop:'15px', fontSize:'16px'}}>+ Add another card </div> 
<button style={{marginTop: '10px', opacity: loading ? '.5' : '1'}}type="submit">
{loading ? <> Loading ... </>: <>Checkout </>}</button>
</>}
        </>}
            
            
            </>: <>
            <label htmlFor="card-element">Card Info</label>
            <div className="card-element">
                <CardInput />
            </div>
  
            <label htmlFor="card-name">Name on Card</label>
            <input id="card-name" className="inputName" />

            <button type="submit">Checkout</button>
            </>}
    
        </form>
    </div>
      );
  }
  
  export default CheckoutForm;