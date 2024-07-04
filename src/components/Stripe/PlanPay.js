import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import lottieFile from './lottie/confirm.json';
import { useUpdateUserMutation } from '../../services/appApi.js';
import './StripeStyles.css';

function CheckoutForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [priceId, setPriceId] = useState('price_123'); // Update with your actual price IDs
  const [selected, setSelected] = useState('Standard');
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateUser, { isError, isLoading, error }] = useUpdateUserMutation();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [success, onClose]);

  useEffect(() => {
    if (failed) {
      setTimeout(() => {
        setFailed(false);
      }, 2100);
    }
  }, [failed]);

  useEffect(() => {
    if (user) {
      if (selected === 'Standard') {
        setPriceId('price_123'); // Standard plan price ID
      } else {
        setPriceId('price_456'); // Basic plan price ID
      }
    }
  }, [selected, user]);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post('/stripe/create-subscription', {
        customerId: user.customerId,
        priceId,
      });
      setClientSecret(data.clientSecret);

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
          },
        },
      });

      if (result.error) {
        setFailed(true);
        setLoading(false);
        console.error(result.error);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setSuccess(true);
          updateUser({ id: user._id, paid: true, plan: selected });
        } else {
          setFailed(true);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error.message);
      setFailed(true);
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }} className='stripe-form'>
      {success ? (
        <>
          <h1 style={{ color: '#34a853' }}>Payment Successful</h1>
          <Lottie animationData={lottieFile} loop={false} />
        </>
      ) : (
        <>
          <form onSubmit={handlePay}>
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: '10px' }}>
                <div className='info-wrap'>
                  <h2>Get Started</h2>
                  {failed && (
                    <div style={{ color: 'red', position: 'absolute', top: '8px', right: '15px' }}>
                      <h3> Payment failed </h3>
                    </div>
                  )}
                  <div className='plan-wrap'>
                    <div onClick={() => setSelected('Standard')} style={{ opacity: selected === 'Standard' ? '1' : '.3' }} className='plan-card'>
                      <h1>$249</h1>
                      <p>Standard</p>
                    </div>
                    <div onClick={() => setSelected('Basic')} style={{ opacity: selected === 'Basic' ? '1' : '.3' }} className='plan-card'>
                      <h1>$89</h1>
                      <p> Basic</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <>
              <h3>
                {selected} {selected === 'Standard' ? '$249' : '$89'} per month
              </h3>
              <label htmlFor='card-element'>Card Info</label>
              <div style={{ border: failed && '1px solid red' }} className='card-element'>
                <CardElement />
              </div>

              <label htmlFor='card-name'>Name on Card</label>
              <input style={{ border: failed && '1px solid red' }} id='card-name' className='inputName' />

              <button disabled={loading} style={{ opacity: loading ? '.5' : '1' }} className='pay-btn' type='submit'>
                Checkout
              </button>
            </>
            <div className='trial-btn' onClick={() => onClose()}>
              <div>Or try it for free.</div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default CheckoutForm;
