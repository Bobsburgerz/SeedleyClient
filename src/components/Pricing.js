import React, {useEffect, useState} from 'react';
import "./styles/Pricing.css"
import axios from 'axios';



const Modal = ({ onClose, setSuccess }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    role: '',
    businessEmail: '',
    website: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
    await axios.post('https://pizzaserver.onrender.com/contact', formData);
    onClose();
    setSuccess(true);
  }catch(e) {
      console.log(e.message)
    }
  };

  return (
    <div style={{ zIndex: '9999999999999999' }} className="modal">
      <div style={{ width: '350px', color: 'black', padding:'20px' , border: '2px solid  orange'}} className="modal-content">
      <div style={{display:'flex', justifyContent:'end'}}><div style={{ cursor: 'pointer', marginTop: '-10px', marginRight: '-12px', zIndex: '99999999' }} 
   onClick={() => onClose()} className="closer-btn-2"> <div>x</div> </div>
   </div>
   
      <form onSubmit={handleSubmit}>
        <div>
          <h2 style={{marginTop:'3px'}}>Learn more</h2>
          <p>Get in touch with sales </p>
          <label htmlFor="businessName">Business Name:</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="businessEmail">Business Email:</label>
          <input
            type="email"
            id="businessEmail"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
    
        <button   className="submit-form" type="submit"> <p>Submit</p></button>
         
      </form>
    </div>    </div>
  );
};
const PricingPage = () => {

const [open, setOpen] = useState()
const [success, setSuccess] = useState(false)
useEffect(() => {
 setTimeout(() => {
  if(success) {
  setSuccess(false)
  }
 }, 2000)
},[success])


const closeModal = () => {
  setOpen(false)
}



  return (
    <div className="pricing-container">
{open && <>

<Modal onClose={closeModal} setSuccess={setSuccess}/>

</>}

<h1  className="pricing-text" style={{color: '#34a853', top: '-65px', position:'relative', borderBottom:'2px solid white',fontSize:'30px', color:'white', marginBottom:'2px'}}>Pricing & Plans</h1>

<div style={{alignItems: 'end'}}className='pricing-wrap'>
 
      
<div style={{height:"85%"}} className="pricing-tier pro">
        <h2 style={{color: 'gray',fontSize: '22px', marginBottom: '0px'}} className="tier-title">Starter</h2>
        <div className="price">$89/month</div>
        <ul className="features-list">
       
          <li>Up to 2 Agents</li>
          <li>90,000 tokens</li>
          <li>Basic Support</li>
          <li>1 seat included</li>
          <li>Function Calling</li>
          <li style={{color: 'lightgray'}}>Bulk Calling</li>
          <li style={{color: 'lightgray'}}>Multi Lingual Models</li>
          <li style={{color: 'lightgray'}}>Custom Integrations</li>
        
        </ul>
        <a href="/signup?plan=basic" style={{width:'100%'}}>  <button style={{width:'100%'}}  className="btn">Get Started</button></a> 
      </div>
      
      <div style={{height:"85%"}}  className="pricing-tier pro">
        <h2 style={{color: 'green' , fontSize: '22px',marginBottom: '0px'}} className="tier-title">Standard</h2>
        <div className="price">$249/month</div>
        <ul className="features-list">
       
          <li>Up to 6 Agents</li>
          <li>400,000 tokens</li>
          <li>Standard Support</li>
          <li>4 seats included</li>
          <li>Function Calling</li>
          <li>Bulk Calling</li>
          <li >Multi Lingual Models</li>
          <li style={{color: 'lightgray'}}>Custom Integrations</li>
        
        </ul>
        <a href="/signup?plan=standard" style={{width:'100%'}}>  <button style={{width:'100%'}}  className="btn">Get Started</button></a> 
      </div>

      <div style={{height:"85%"}}  className="pricing-tier premium">
        <h2 style={{color: 'purple', fontSize: '22px',marginBottom: '0px'}} className="tier-title">Enterprise ✨</h2>
        <div className="price">Talk to sales</div>
        <ul className="features-list">
         
          <li>Unlimited Agents</li>
          <li>Custom pricing</li>
          <li>Priorty Support</li>
          <li>10 seats included</li>
          <li>Function Calling</li>
          <li>Bulk Calling</li>
          <li>Multi Lingual Models</li>
          <li>Custom Integrations</li>
        </ul>
          <button onClick={() => setOpen(true)}   className="btn">Get Started</button>
      </div></div>

{success && <div style={{backgroundColor: '#34a853', border:'2px solid orange', fontWeight: '700', padding: '8px' ,color: 'white', borderRadius: '5px', width: 'fit-content', minWidth: '160px', textAlign: 'center', position:'absolute', bottom: '15px', right:'15px'}} className="success-animation">Form Submitted!</div>}
    </div>
  );
};

export default PricingPage;
