import React, { useState, useEffect } from 'react';
import Phone from "./assets/phone.png"
import axios from "../api/axios";
import { useSelector } from "react-redux";
import { useAddNumberMutation } from "../services/appApi.js"
import Delete from "./assets/delete.png"
import { useDeleteNumberMutation } from "../services/appApi";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';
const Modal = ({ onClose, isDelete, selected, setSelected, setDelete }) => {
  const phone = useSelector((state) => state.phoneNum);
  const [deleteNumber] = useDeleteNumberMutation();
  const [saveNumber, { isSaveError }] = useAddNumberMutation();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    twilioToken: '',
    label: '', 
    number: '',
    twilioSID: '',
    owner: user._id
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    const handleError = () => {
      if (isSaveError) {
        alert('Invalid number. Please try again later.');
      }
    };

    handleError();
  }, [isSaveError]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDelete) {
   
      await deleteNumber({ _id: selected._id, owner: user._id });
      const updatedPhone = phone.filter((item) => item._id !== selected._id);
      setSelected(updatedPhone.length > 0 ? updatedPhone[0] : null);
      setDelete(false)
      onClose();
    } else {
     try {
      await saveNumber(formData);
      onClose();
     } catch(e) {
        console.log("trouble saving number")

     }
        
    }

  };
  return (
    <div style={{ zIndex: '99999999995999999' }} className="modal">
      <div style={{ minWidth: '400px', color: 'black', padding: '10px' }} className="modal-content">
        <form style={{ width: '100%' }} onSubmit={handleSubmit} className="contact-form">
          <div style={{ padding: '15px', paddingTop:'25px', width: '100%' }}>
            <div className="closer-wrap-2">
              <div style={{ cursor: 'pointer', marginTop: '-13px', marginRight: '-6px', zIndex: '99999999' }} 
              onClick={() => onClose()} className="closer-btn-2"> <div>x</div> </div>
            </div>
            {isDelete ? <>


              <h2 style={{ marginTop: '55px' }}>Are you sure you want to delete your number?</h2>
              <button className="submit-b2" type="submit">Delete</button>
            </> : <>



              <h2 style={{ marginTop: '0px', marginBottom: '-5px' }}>Add your number</h2>
              <br/>
              <label style={{ marginTop: '10px'  }}>Twillio number</label>
    
              <input type="number" name="number"
               placeholder="123456789101" value={formData.number} onChange={handleChange} required />
              <label>Twilio SID</label>
              <input type="text" name="twilioSID" placeholder="Account twilioSID" value={formData.twilioSID} onChange={handleChange} required />
              <label>Twilio Token</label>
              <input type="text" name="twilioToken" placeholder="Account twilioToken" value={formData.twilioToken} onChange={handleChange} required />
            
              <br />
              <div style={{display: 'flex', columnGap:'5px'}}> 
              <button className="submit-b" type="submit">Import Number</button>
             
              </div>
               </>}

          </div>
        </form>
      </div>
    </div>
  );
};



const Modal2 = ({ onClose, leads, setLeads }) => {
 
  const keys = ["firstName", "lastName", "phone", "email"];
  const keys2 = ["firstname", "lastname", "phone", "email"];
const clearLeads = () => {
  setLeads([])
  onClose()
}
  return (
    <div style={{ zIndex: '9999999999999999' }} className="modal">
      <div style={{ minWidth: '400px', color: 'black', padding: '15px' }} className="modal-content">
       <div style={{display:'flex', justifyContent: 'space-between', marginBottom: '5px'}}> <h3>Lead List</h3>   <button style={{height:'34px'}} onClick={()=> clearLeads()}className="red-btn">Remove leads</button> </div>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {keys2.map((key, index) => (
                <th key={index} style={{ padding: '8px', border: '1px solid black' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                {keys.map((key, index) => (
                  <td key={index} style={{ padding: '8px', border: '1px solid black' }}>{lead[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button style={{marginTop: '5px'}}className="submit-b" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};




const Modal3 = ({ onClose }) => {
  const [selected, setSelected] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([{ value: '' }]);

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { value: '' }]);
  };

  const updatePhoneNumber = (index, value) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index].value = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const removePhoneNumber = (index) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const clearLeads = () => {
    onClose();
  };

  return (
    <div style={{ zIndex: '9999999999999999' }} className="modal">
      <div
        style={{
          minWidth: '400px',
          color: 'black',
          padding: '15px',
          justifyContent: 'center',
        }}
        className="modal-content"
      >



        <div style={{display:'flex', justifyContent: 'end'}}> <div onClick={() => onClose()}className="closer-btn-3"> X</div> </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            columnGap: '15px',
            marginTop: '-8px',
            marginBottom: '5px',
          }}
        >
          <h3
            style={{
              cursor: 'pointer',
              color: selected ? 'orange' : 'gray',
              fontWeight: selected ? 700 : 'inherit',
              borderBottom: selected ? '1px solid orange' : 'none',
            }}
            onClick={() => setSelected(true)}
          >
            Allow only
          </h3>
          <h3
            style={{
              cursor: 'pointer',
              color: selected ? 'gray' : 'orange',
              fontWeight: !selected ? 700 : 'inherit',
              borderBottom: !selected ? '1px solid orange' : 'none',
            }}
            onClick={() => setSelected(false)}
          >
            Block callers
          </h3>
        </div>
        {phoneNumbers.map((number, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              value={number.value}
              onChange={(e) => updatePhoneNumber(index, e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button className="standardBtn" style={{marginTop: '-10px'}}onClick={() => removePhoneNumber(index)}>Remove</button>
          </div>
        ))}
        <button className="standardBtn" onClick={addPhoneNumber}>Add Number +</button>
      </div>
    </div>
  );
};


const PhoneNum = () => {
  const assistantsArray = useSelector((state) => state.assistants);
  const phone = useSelector((state) => state.phoneNum);
  const [selected, setSelected] = useState(phone[0]);
  const [isModal, setModal] = useState(false);
  const [num, setNum] = useState('');
  const [isDial, setDial] = useState(false);
  const [open, setOpen] = useState(false);

  const [restrict, setRestrict] = useState(false)
  const user = useSelector((state) => state.user);
  const [outAssistant, setOutAssistant] = useState(assistantsArray[0]); 
  const [selectedAssistantId, setSelectedAssistantId] = useState(assistantsArray[0]?._id);
  const [lang, setLang] = useState(assistantsArray[0]?.language ? assistantsArray[0]?.language : 'en-US');
  const [leads, setLeads] = useState([]); 
  const [keys, setKeys] = useState([])
  const [dialSuccess, setDialSuccess] = useState(false) 
  const handleAssistantChange = (event) => {
    const selectedAssistant = assistantsArray.find((assistant) => assistant._id === event.target.value);
    setOutAssistant(selectedAssistant);
    setSelectedAssistantId(selectedAssistant._id);
    setLang(selectedAssistant.language ? selectedAssistant.language : 'en-US');
  };
console.log(outAssistant)
  useEffect(() => {
    if (dialSuccess) {
      const timeoutId = setTimeout(() => {
        setDialSuccess(false);
      }, 2500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [dialSuccess]);


  const setInbound = async (event, number) => {
    try{
    await axios.post('/phone/configure-webhook', {aiid: event, twilNum: number, userId: user._id, lang: lang})
   
    }catch(
      e
    ) {
      console.log("error", e.message)
    }
  };
 

  const singleCall = async (twilNum, SID, token) => {

    try {
  
  
    await axios.post('https://coldcall.onrender.com/outbound-live', { phone: num, twilNum, aiid: selectedAssistantId, userId: user._id, SID, token , lang: lang});
 
    setDial(false)
    setDialSuccess(true)

    } catch(e) {
      console.log(e.message)
    }
  };
  
 
 
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const makeCall = queryParams.get('makeCall');
 
    if (page === 'phone' && makeCall === 'true') {
      if(phone.length > 0) {
         setDial(true)
  } 
   else {
    setModal(true)
   }
   navigate('/dashboard');
      
    }
  }, [location.search]);

  useEffect(() => {
    if (phone.length > 0) {
      setSelected(phone[0])
    }
  }, [phone]);

  const saveChanges = async () => {
    await axios.post('/phone/updatePhone',{id: selected._id , callback: callback })
  }
  const openDelete = (number) => {
    setModal(true)
    setDelete(true)
  }
  const [isDelete, setDelete] = useState(false)

  const [callback, setCallback] = useState("")

  return (
    <div className="flex-cont-1">

 
       {isModal && <Modal onClose={() => setModal(false)} isDelete={isDelete} selected={selected} setSelected={setSelected} setDelete={setDelete} />}
      {open && <Modal2 onClose={() => setOpen(false)} leads={leads} keys={keys} setLeads={setLeads}/>}
      {restrict && <Modal3 onClose={() => setRestrict(false)}   />}
      {isDial && (
        <div style={{ zIndex: '9999999999999999' }} className="modal">
          <div style={{ minWidth: '400px', color: 'black', padding: '20px' }} className="modal-content">
            <div className="closer-wrap-2">
              <div style={{ cursor: 'pointer' }} onClick={() => setDial(false)} className="closer-btn-2"> <div>x</div> </div>
            </div>
            <div className="contact-form">
              <div>
                <h2 style={{ marginTop: '0px', zIndex: '97' }}>Make a single call</h2>
                <p>Have your AI reach out to a single person</p>
                <label>Your phone number</label>
                <input
  disabled={user.credits < 50}
  style={{ opacity: user.credits < 50 ? ".5" : "1" }}
  type="text"
  name="phone"
  value={num}
  maxLength={11}
  onChange={(e) => {
<<<<<<< HEAD
    const newValue = e.target.value.replace(/\D/g, '');
=======
    const newValue = e.target.value.replace(/\D/g, ''); // Remove non-digits
>>>>>>> 773e06fc533864b4c14b3efd5fc6a0f77ca713c3
    if (newValue.length <= 11) {
      setNum(newValue);
    }
  }}
  placeholder="12345678910"
/>
 
                <br />
                <button
                disabled={user.credits < 50}
                style={{opacity: user.credits < 50 ? ".5" : "1"}}
                onClick={() => singleCall(selected.number, selected.twilioSID, selected.twilioToken)} className="submit-b">Start Call</button>
             </div>
            </div>
          </div>
        </div>
      )}

<div style={{ display: 'flex', flex: '.87', flexDirection: 'column', rowGap: '8px' }}>
<div style={{display:'flex', columnGap:'5px'}}>  
<div className="btn-new" style={{cursor:'pointer', display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
  backgroundColor: '#f2f2f2',fontSize: '14px', flex: '1', padding: '10px'}}
  onClick={() => setModal(true)}> <span>Import Number</span></div>
<button className="btn-new" style={{cursor:'pointer', opacity: '.5',
  backgroundColor: '#f2f2f2', flex: '1',fontSize: '14px',padding: '10px'}} > Buy a Number</button></div>

<div style={{ display: 'flex', flexDirection: 'column', height: '550px', overlowy: 'scroll', cursor: 'pointer', rowGap: '8px' }}>
{phone?.map((assistant, index) => (
<div onClick={() => setSelected(assistant)} style={{cursor:'pointer', backgroundColor: '#f2f2f2', padding: '10px'}} className="btn-new" key={index}>{assistant.number}</div>
))}
</div>
</div>
<div style={{ flex: '2.1', width: '76%' }}>
<div style={{ display: 'flex', alignItems: 'center', padding: '0px 16px', justifyContent: 'space-between' }} className={selected ? 'title-box' : ''}>
<h2>{selected?.number}</h2>
{phone.length >= 1 && <> <button onClick={() => openDelete()}
style={{ borderRadius: '5px',background: '#fbfbfb', height: '31.1px', cursor: 'pointer' }}>
<img src={Delete} style={{ width: '18px' }} /> </button> </>}
</div>
        
        {phone.length >= 1 ? (
          <>
{ callback !== "" && <button onClick={() => saveChanges()}>Save Changes</button> }
<div style={{  flexDirection: 'column', textAlign: 'start', padding: '0px 16px', justifyContent: 'space-between' }} className={'title-box'}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h2>Call back url</h2> 
          
            
               </div>  
              
          <input onChange={(e) => setCallback(e.target.value)} placeholder="url" style={{padding:'8px', width:'98.3%'}}/>
            </div>
            <div style={{  flexDirection: 'column', textAlign: 'start', padding: '0px 16px', justifyContent: 'space-between' }} className={'title-box'}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h2>Inbound</h2>        
               </div>  
              <p style={{margin: '3px'}}>Assign an assistant to receive incoming phone calls</p>
              <select disabled={true} value={selected?.inbound} onChange={(e) => setInbound(e.target.value, selected.number)}style={{ padding: '8px', background: '#fbfbfb', width: '100%',borderRadius: '5px', marginBottom: '15px' }}>
               
               <option value="none"> No assistant selected</option>
                {assistantsArray.map((assistant, index) => {
                  return <option key={index} value={assistant._id}>{assistant.name}</option>;
                })}
              </select>
            </div>
            <div className="title-box">
<div >
   
              <h2>Outbound  </h2>  </div>
              <p style={{margin: '3px'}}>Assign an assistant to make outbound phone calls</p>
         
              <select value={selectedAssistantId} onChange={handleAssistantChange} style={{ padding: '8px', background: '#fbfbfb', width: '100%', borderRadius: '5px', marginBottom: '15px' }}>
                {assistantsArray.map((assistant, index) => {
                  return <option key={index} value={ assistant._id }>{assistant.name}  </option>;
                })}
              </select>
              <div style={{ display: 'flex', width: '100%', columnGap: '15px'  }}>
                <div style={{ display: 'flex', maxHeight: '37px', columnGap: '15px' }}>

            

                  <span style={{
                    maxHeight: '37px', outline: 'none', border: 'none',
                    alignItems: 'center', display: 'flex', columnGap: '10px',
                    opacity:    user.credits < 50 || dialSuccess == true  ? '.5' : '1', display: 'flex', background:  '#34a853'
                  }}

          
                  
                    onClick={() => user.credits < 50 || dialSuccess == true ? setDial(false) : setDial(true)} className="submit-b">
                    <img style={{ width: '20px' }} src={Phone} />
                    <div >Make a Single Call</div>
                  </span>
                </div>
                <div style={{display:'flex', columnGap :'10px'}}>
        
 
         </div>
              </div>
              {user.credits < 50 && <> 
              <p  style={{opacity: user.credits < 50 ? "1" : "0",
               display:user.credits < 50 ? 'block': 'none', marginBottom: '0px'}}>Insufficent
                funds to make call. Add credits in billing settings</p></> }
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', marginTop: '-40px', flexDirection: 'column', textAlign: 'start', padding: '0px 16px', justifyContent: 'space-between' }} className={'title-box'}>
            <h2>No numbers yet</h2>
            <p>Import a Twilio number to start</p>
          </div>
        )}
       
   
      </div>

      {dialSuccess && <div style={{backgroundColor: '#34a853', border:'2px solid orange', fontWeight: '700', padding: '8px' ,color: 'white', borderRadius: '5px', width: 'fit-content', minWidth: '160px', textAlign: 'center', position:'absolute', bottom: '15px', right:'15px'}} className="success-animation">Success, Call Initated! </div>}
      </div>

    
  );
};

export default PhoneNum;
