import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import Logo from "./assets/Smart.png"
const Form = () => {
 
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwd, setpwd] = useState('');
  const [firstName , setFirstName] = useState('');
  const [plan, setPlan] = useState('')
   const [lastName , setLastName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    if (errMsg) {
      const timeoutId = setTimeout(() => {
        setErrMsg('');
      }, 2500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [errMsg]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isValidEmail = validateEmail();



 useEffect(() => {
  const url = new URL(window.location.href);
  const planParam = url.searchParams.get('plan');
  const confirmParam = url.searchParams.get('confirm');
 
if (planParam) {
  setPlan(planParam)
 
} else if (confirmParam) {
  return
}
  else
  {
  navigate('/pricing')
}
   
}, [])

  useEffect(() => {
    const url = new URL(window.location.href);
    const confirmParam = url.searchParams.get('confirm');
    const uidParam = url.searchParams.get('uid');
    const code = url.searchParams.get('code');
if (confirmParam) {

 
  setConfirm(true)
}

async function fetchUserDetails() {
  try {
    const res = await axios.post("/register/confirm", {confirmationCode: code, _id:uidParam})

    if (res.data.success) {
       setTimeout(() => {
         
      navigate('/login?success=true');
  
  }, 10);
    }

  } catch (error) {
    console.error(error);
  }
}

if (uidParam && code) {
  fetchUserDetails()
}
    
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        pwd, firstName,lastName, email, plan
      }
     const res = await axios.post('/register', data )
    if (res.data.success) {
      setSuccess(true)
    }

      setFirstName()
      setLastName()
setConfirm(true)
navigate("/signup?confirm=true")
      setpwd('');

    } catch (err) {
      if (!err?.originalStatus) 
      {
        setErrMsg('Account Already Exists');
      } else if (err.originalStatus === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } 
      errRef.current.focus();
    }
  };

  const [code, setCode] = useState('')
const checkEmail = async () => {
  try {
    
  const res = await axios.post("/register/confirm", {confirmationCode: code, email, })
 

  if (res.data.success) {

    setTimeout(() => {
         
      navigate('/login?success=true');
  
  }, 1000);

  }
  } catch (e) {
console.log("code didnt match")
  }

}
  const handleUserInput = (e) => setEmail(e.target.value);
  const [isPatternMatch, setIsPatternMatch] = useState(false);

  const handlePwdInput = (e) => {
    const password = e.target.value;
    setpwd(password);
    const pattern = /(?=.*\d)(?=.*[!@#$%^&*])\S{10,}/;
    setIsPatternMatch(pattern.test(password));
 
  };
 

  return (
    <div className="pricing-container">



   <p ref={errRef} style={{marginTop: '-5px'}}className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
{
confirm ? <>


<div style={styles.form}>

<div style={{textAlign: 'center', width: '100%',display: 'flex', backgroundColor: 'white', justifyContent: 'center', flexDirection: 'column'}}>

<h3 style={{marginTop: '3px'}}>Great! A code has been sent to your email </h3>
<p style={{marginTop: '-5px'}}>Enter the code below to continue. </p>

  <input onChange={(e) => setCode(e.target.value)} placeholder="Enter your code"style={styles.input} />
<button className="sign-up-button" style={{opacity: code === ''  ? '.5' : "1", padding:'5px'}} onClick={() => checkEmail()} >Confirm Email</button>
<p>Didn't get the code? Check your spam or <span style={{color: 'green', cursor: 'pointer', fontWeight: '700'}}>resend code</span></p>
  
  
  </div>
</div>



</> :


      <form onSubmit={handleSubmit} style={styles.form}><div style={{textAlign: 'center',  backgroundColor: 'white', width: '100%',display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <div> <img src={Logo} style={{width: '45px', margin: '0px'}} /></div> 
      <h3 style={{marginTop: '3px'}}>Get Started Today</h3> 
      <p style={{marginTop: '-5px'}}>See how Seedley can enhance your business</p></div>
        <input id="username"
          ref={userRef}
          onChange={handleUserInput}
          value={email} type="text" placeholder="Email" style={styles.input} />

   
<input
  id="name"
  ref={userRef}
  onChange={handlePwdInput}
  value={pwd}
  type="password"
  placeholder="Password"
  style={styles.input}
/>
{isPatternMatch ? <p style={{fontSize:'12px', marginTop: '-5px', color: 'green'}}>Password is strong</p> : <p style={{fontSize:'12px', marginTop: '-5px', color: 'gray'}}>Password must be at least 10 characters & have a number & symboyl</p>}
        <button type="submit" className="sign-up-button" disabled={isValidEmail == false || isPatternMatch == false}style={{padding:'8px', opacity:isValidEmail == false || isPatternMatch == false? '.5' : '1'}}>Sign Up</button>
        <p>
        Already have an account? <Link to="/login">Go to Login</Link>
      </p>
      </form>

}
    </div>
  );
}

export default Form;