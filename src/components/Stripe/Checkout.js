import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import CheckoutForm from "./Payment.js";
import PlanForm from "./PlanPay.js";
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_51LGwewJ0oWXoHVY4KaHYgICxXbe41zPhsxY9jYfVqgyEHK3oX4bwaoAvgXByAF2Ek2UAVZ0L6FjddQvAvBIMsB7t00fE5UAlwI");
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