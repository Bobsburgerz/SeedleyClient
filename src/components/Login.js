import React from 'react';
import styles from './styles';
import axios from '../api/axios';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from "../services/appApi";
import Logo from "./assets/Smart.png"
import { setLoading } from '../features/loadingSlice';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
const LoginPage = () => {
const user = useSelector((state) => state.user)
  const LOGIN_URL="/auth"
  const { setAuth, persist, setPersist } = useAuth();
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
const [loading, setLoading] = useState(false)
  const userRef = useRef();
  const errRef = useRef();
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
const [forgot, setForgot] = useState(false)



const [success, setSuccess] = useState(false);

useEffect(() => {
  // Get the current URL
  const url = new URL(window.location.href);

  // Get the value of the 'success' query parameter
  const successParam = url.searchParams.get('success');
  if (successParam) {
  setSuccess(true);}
}, []);


useEffect(() => {
  // Get the current URL
  const url = new URL(window.location.href);

  // Get the value of the 'success' query parameter
  const successParam = url.searchParams.get('success');
  if (successParam) {
  setSuccess(true);}
}, []);



useEffect(() => {
  if (success) {
  setTimeout(() => {
         
    navigate('/login');
    setSuccess(false);
  }, 3500);}

}, []);


useEffect(() => {
  if (success) {
  setTimeout(() => {
         
    navigate('/login');
    setSuccess(false);
  }, 3500);}

}, [success]);


  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);
  useEffect(() => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    if (user) {
      navigate('/dashboard')
    }
}, [user])

useEffect(() => {
    setErrMsg('');
}, [email, pwd])

const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({ email, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
   e.preventDefault()
 
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ email, pwd, roles, accessToken });
        login({ email, pwd });
        setLoading(true)
        setTimeout(() => {
         
            navigate('/dashboard');
            setLoading(false);
        }, 800);
        
   
       setPwd('');
       setEmail('');



    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
       
    }
}

const resetPassword = async () => {

  try { 
  const res = axios.post('/user/resetPassword', email) 
 
  }
  
  catch (e) {
    console.log('e.message')
  }



}

const togglePersist = () => {
    setPersist(prev => !prev);
}

useEffect(() => {
    localStorage.setItem("persist", persist);
}, [persist])
if (loading) {
    // Render a loading spinner while waiting for data to load
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#21c23e" size={75} />
      </div>
    );
  }
  return (
   <div className="pricing-container">
   <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
   {success == true && <> <p style={{backgroundColor:'green', color:'white',padding:'5px', borderRadius:'5px' }}>Email confirmed! Login to continue</p></>}
      <form onSubmit={handleSubmit} style={styles.form}><div style={{textAlign: 'center', backgroundColor: 'white', width: '100%',display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <div> <img src={Logo} style={{width: '45px', mrgin: '0px'}} /></div> 
     
     
     {!forgot ? <> <h3 style={{marginTop: '3px'}}>Welcome Back</h3>
      <p style={{marginTop: '-5px'}}>Log into your Seedley account</p> </> : <>
     
      <h3 style={{marginTop: '3px'}}>Forgot Password?</h3>
      <p style={{marginTop: '-5px'}}>Enter your email to reset password</p>
      </>}
      
      </div>



<div>

  


  {forgot ? <>  <input id="username"
         ref={userRef}
         onChange={handleUserInput}
         value={email} type="text" placeholder="Email" style={styles.input} />
                 <button type="submit" style={{padding:'8px', }}>Send Reset</button> </> : <>
                 
                 <input id="username"
         ref={userRef}
         onChange={handleUserInput}
         value={email} type="text" placeholder="Email" style={styles.input} />

       

       <input 
         id="password"
         onChange={handlePwdInput}
         value={pwd} type="password" placeholder="Password" style={styles.input} />
       <button type="submit" className="sign-up-button">Login</button>
       <p>
       Don't have an account? <Link to="/signup">Get started</Link>      </p>
    {/** <p style={{marginTop:'-5px'}}>
      Forgot your password? <span  onClick={() => setForgot(true)}>Reset it here.</span>
     </p> */}  
                 
                 </>}
</div>
      </form>
    </div>
  );
};

export default LoginPage;







