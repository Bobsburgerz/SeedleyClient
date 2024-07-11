import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import { useSelector } from "react-redux";
import CardInput from "./CardInput.js";
import "./StripeStyles.css";
import Lottie from 'lottie-react';
import lottieFile from "./lottie/confirm.json";
import { useUpdateUserMutation } from "../../services/appApi.js";

function CheckoutForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("Standard");
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onClose();
        onClose();
      }, 1000);
    }
  }, [success]);

 
  useEffect(() => {
    if (failed) {
      setTimeout(() => {
        setFailed(false);
        setFailed(false);
      }, 2100);
    }
  }, [failed]);


  useEffect(() => {
    if (user?.plan === "standard") {
      setSelected("Standard");
    }
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      setLoading(true);

      const cardElement = elements.getElement(CardElement);

      // Create a Payment Method
      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: user?.email,
        },
      });

      if (paymentMethodError) {
        console.error(paymentMethodError);
        setFailed(true);
        setLoading(false);
        return;
      }

      // Create Setup Intent to save the card for future use
      const setupIntentResponse = await axios.post('/create-setup-intent', {
        customerId: user?.customer,
      });

      const setupIntentClientSecret = setupIntentResponse.data.clientSecret;

      const { setupIntent, error: setupIntentError } = await stripe.confirmCardSetup(setupIntentClientSecret, {
        payment_method: paymentMethod.id,
      });

      if (setupIntentError) {
        console.error(setupIntentError);
        setFailed(true);
        setLoading(false);
        return;
      }

      // Create subscription using the saved Payment Method
      const subscriptionResponse = await axios.post('/create-subscription', {
        customerId: user?.customer,
        paymentMethodId: paymentMethod.id,
        priceId: selected === "Standard" ? 'price_1PXd71J0oWXoHVY4RyCHHOIX' : 'price_1PXd96J0oWXoHVY4ggjF4pbx', // Replace with actual price IDs
      });

      const subscription = subscriptionResponse.data.subscription;

      if (subscription.status === "active") {
        setSuccess(true);
        updateUser({ id: user?._id, paid: true, credits: selected === "Standard" ? 265000 : 89000 + user?.credits });
      } else {
        setFailed(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setFailed(true);
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }} className="stripe-form">
      {success ? (
        <>
          <h1 style={{ color: "#34a853" }}>Payment Successful</h1>
          <Lottie animationData={lottieFile} loop={false} />
        </>
      ) : (
        <form onSubmit={handlePay}>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: '10px' }}>
              <div className="info-wrap">
                <h2>Get Started</h2>
                {failed && <div style={{ color: 'red', position: 'absolute', top: '8px', right: '15px' }}><h3>Payment failed</h3></div>}
                <div className="plan-wrap">
                  <div onClick={() => setSelected("Standard")} style={{ opacity: selected === "Standard" ? '1' : '.3' }} className="plan-card">
                    <h1>$265</h1>
                    <p>Standard</p>
                  </div>
                  <div onClick={() => setSelected("Basic")} style={{ opacity: selected === "Basic" ? '1' : '.3' }} className="plan-card">
                    <h1>$89</h1>
                    <p>Basic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <>
            <h3>{selected} {selected === "Standard" ? "$265" : "$89"} per month</h3>
            <label htmlFor="card-element">Card Info</label>
            <div style={{ border: failed && '1px solid red' }} className="card-element">
              <CardInput failed={failed} />
            </div>
            <label htmlFor="card-name">Name on Card</label>
            <input style={{ border: failed && '1px solid red' }} id="card-name" className="inputName" />
            <button disabled={loading} style={{ opacity: loading ? '.5' : '1' }} className="pay-btn" type="submit">Checkout</button>
          </>
          <div className="trial-btn" onClick={() => onClose()}><div>Or try it for free.</div></div>
        </form>
      )}
    </div>
  );
}
export default CheckoutForm;

