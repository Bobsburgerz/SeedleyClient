import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./Payment.js";

const stripePromise = loadStripe("pk_live_51LGwewJ0oWXoHVY4hzmdZ1i4COqqKZ8PVlcoPHwL4lg6oAgqjEzR5EdVZXBrwjnToi3VfU9lT2vReJyVcRVuskDI00DovYoz0Y");
function CartPage({onClose}) {

return (
            <div className="cart-payment-container">
     
                <Elements stripe={stripePromise}>

         
                  <CheckoutForm onClose={onClose}/> 
                              
                </Elements>

            </div>
   
  );
}

export default CartPage;