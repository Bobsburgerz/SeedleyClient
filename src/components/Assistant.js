import React, { useState , useEffect} from 'react';
import axios from "../api/axios";
import { useSelector , useDispatch} from "react-redux";
import Delete from "./assets/delete.png";
import { useAddAssistantMutation } from "../services/appApi";
import { updateAssistants } from '../features/assistantSlice';
import AssistModal from './AssistantComponents/Modals/AssistantModal';
import Stream from "./StreamAudio";
import { useNavigate } from 'react-router-dom';
import Toggle from './AssistantComponents/Toggle';
import UploadDoc from './AssistantComponents/UploadDocument';
import Modal from './AssistantComponents/Modals/DeleteAssistant';  
import { useUpdateUserMutation } from "../services/appApi";
import { Navigate, useLocation } from 'react-router-dom';
 
const Assistant = () => {
const dispatch = useDispatch()
const [updateUser, { isError, isLoading, error }] = useUpdateUserMutation();
const [isOpen, setIsOpen] = useState(false);
const assistantsArray = useSelector((state) => state.assistants);
const user = useSelector((state) => state.user);
const [currentInvite, setCurrentInvite] = useState("");
const [addAssis] = useAddAssistantMutation();
const [gCal, setgCal] = useState({
    g_description: "",
    g_invites: [""],
    g_title: "",
    g_duration: ""
  })

const [isOpt,  setIsOpt] = useState("Model");
const [filteredData, setFilteredData] = useState([]);
const [gauth, setGauth] = useState(false);
const [id, setId] = useState(null);
const navigate = useNavigate()
const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
const location = useLocation(); 
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.elevenlabs.io/v1/voices'
    };

    axios(options)
      .then(response => {
      
        const filteredData = response.data.voices.map(item => ({
          name: item.name,
          voice_id: item.voice_id
        }));
        
        setFilteredData(filteredData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);  
  
  const newAssistant = {
  name: 'New Assistant',
  owner: user?._id,
  firstMessage: 'Hello how can I assist you?',
  prompt:`Prompt goes here`
}

  const assistants = assistantsArray
  const [selected, setSelected] = useState(assistants[0]);
  const [prompt, setPrompt] = useState( assistants[0]?.prompt)
  const [firstMsg, setFirstMsg] = useState(assistants[0]?.firstMessage)
  const [contacts, setContacts] = useState(assistants[0]?.contacts ? assistants[0]?.contacts : [])
  const [knowledgeBase, setKnowledgeBase] = useState(assistants[0]?.knowledgeBase ? assistants[0]?.knowledgeBase :[]);
  const [isOn, setIsOn] = useState(false)
  const [success, setSuccess] = useState(false)
  const [textMessage, setTextMessage] = useState(assistants[0]?.textMessage)
  const [assistModal, setAssistModal] = useState(false)
 


useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const gauthValue = queryParams.get('gauth') === 'true';
  const idValue = queryParams.get('id');
  setGauth(gauthValue);
  setId(idValue);
  setSelected(assistantsArray.find((assistant) => assistant?._id === idValue));
}, [location.search, assistantsArray]);

 useEffect(() => {
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    if (gauth) {
      const getUserAuth = async () => {
        try {
          // Wait for 3 seconds
          await wait(3000);

          const res = await axios.get(`/user?id=${user._id}`);
          await updateUser({ id: user._id, g_access: res.data.g_access, g_refresh: res.data.g_refresh });
          navigate('/dashboard');
          setIsOpt("Functions");
          setSuccess(true);
        } catch (error) {
          console.error('Error fetching user auth:', error);
          // Handle error (e.g., show an error message)
        }
      };

      getUserAuth();
    }
  }, [gauth, id, user._id, navigate]);

  const openAssistModal = () => {
    setAssistModal(true)
  }

  useEffect(() => {
  
    if (assistants.length > 0) {
      setSelected(
        assistants[0]
      )
      setPrompt(assistants[0]?.prompt)
      setFirstMsg(assistants[0]?.firstMessage)
      setContacts(assistants[0]?.contacts ? assistants[0]?.contacts : [])
      setKnowledgeBase(assistants[0]?.knowledgeBase || []);
      setgCal(assistants[0]?.gCal)
    }
  }, [assistants.length]);



  useEffect(() => {
   if (success) {
   setTimeout(() => {
   setSuccess(false)}, 1700)}
  }, [success]);
 
  
   
  useEffect(() => {
    const prevAssis = assistantsArray.find((assistant) => assistant._id === selected?._id); 
    const updateAssistantData = async () => {
      if (prevAssis !== selected) {
        try {
          const res = await axios.post("https://pizzaserver.onrender.com/assistant/updateAssistant", selected);
          dispatch(updateAssistants(res.data));
        } catch (error) {
      
        }
      }
    };
  
    const interval = setInterval(() => {
      updateAssistantData();
    }, 3000);  
  
    return () => {
      clearInterval(interval);  
    };
  }, [selected]);
   
  useEffect(() => {
    const prevAssis = assistantsArray.find((assistant) => assistant._id === selected?._id);

    const updateAssistantData = async () => {
        if (prevAssis !== selected) {
            try {
                const res = await axios.post("https://pizzaserver.onrender.com/assistant/updateAssistant", selected);
                dispatch(updateAssistants(res.data));
            } catch (error) {
                console.error('Error updating assistant:', error);
            }
        }
    };

    const interval = setInterval(() => {
        updateAssistantData();
    }, 3000);

    return () => {
        clearInterval(interval);
    };
}, [selected, assistantsArray, dispatch]);

const handleGCalChange = (field, value) => {
  setSelected((prevSelected) => ({
    ...prevSelected,
    gCal: {
      ...prevSelected.gCal,
      [field]: value
    }
  }));
};

const handleAddInvite = () => {
  if (currentInvite && currentInvite.trim() !== "") {
    setSelected((prevSelected) => ({
      ...prevSelected,
      gCal: {
        ...prevSelected.gCal,
        g_invites: [...prevSelected.gCal.g_invites, currentInvite]
      }
    }));
    setCurrentInvite("");
  }
};

const handleInviteChange = (e) => {
  setCurrentInvite(e.target.value);
};

const onSelect = (assistant) => {
    setSelected(assistant);
    setPrompt(assistant?.prompt);
    setFirstMsg(assistant?.firstMessage);
    setContacts(assistant?.contacts);
    setKnowledgeBase(assistant?.knowledgeBase);
    setgCal(assistant?.gCal)
    setIsOpt("Model")
};

const addKnowledgeBase = (doc, name) => {
  setSelected((prev) => {
      const updatedKnowledgeBase =  prev?.knowledgeBase?.length > 0 ?[... prev?.knowledgeBase, {url:doc, name:name}] : [{url:doc, name:name}];
      return {
          ...prev,
          knowledgeBase: updatedKnowledgeBase,
      };
  });
  setKnowledgeBase((prev) => {
      const updatedKnowledgeBase =  prev?.length > 0 ? [...prev, {url:doc, name:name}] : [{url:doc, name:name}];
      
      return updatedKnowledgeBase;
  });
};
 

 
const removeKnowledgeBase = (index) => {
  setSelected((prev) => {
      const updatedKnowledgeBase = prev?.knowledgeBase?.length > 0 ? [...prev?.knowledgeBase] : [];
      updatedKnowledgeBase.splice(index, 1);
      return {
          ...prev,
          knowledgeBase: updatedKnowledgeBase,
      };
  });
  setKnowledgeBase((prev) => {
      const updatedKnowledgeBase = prev?.length > 0 ? [...prev] : [];
      updatedKnowledgeBase.splice(index, 1);
      return updatedKnowledgeBase;
  });
};
   const updateContact = (index, field, value) => {
    setSelected((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      ),
    }));
    setContacts((prev) =>
      prev.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      )
    );
  };
  const saveText = () => {
    setSelected((prev) => ({
      ...prev,
      textMessage: textMessage
    }));
    setIsOn(false)
  };
  const addContact = () => {
    setSelected((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', value: '' }],
    }));
    setContacts((prev) => [...prev, { name: '', value: '' }]);
  };

  const removeContact = (index) => {
    setSelected((prev) => {
      const updatedContacts = [...prev.contacts];
      updatedContacts.splice(index, 1);
      return { ...prev, contacts: updatedContacts };
    });
    setContacts((prev) => {
      const updatedContacts = [...prev];
      updatedContacts.splice(index, 1);
      return updatedContacts;
    });
  };

  const saveChanges = async () => {
    try {
      setSuccess(true);
      setIsOn(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  
 

const addAssistant = async () => {
  try {
    if (assistants.length < 5) {
      addAssis(newAssistant);
      setAssistModal(false)
    } else {
      alert('Limit reached');
      setAssistModal(false)
    }
  } catch (error) {
    
   
  }
};
 
  return (
    <div className="flex-cont-1">{assistModal && <><AssistModal onClose={() =>  setAssistModal(false)} 
    addAssistant={() => addAssistant()} /></>}

      <div style={{display:'flex', flex: '.83', flexDirection:'column', rowGap: '8px'}}>
      <div style={{cursor:'pointer', background: '#f2f2f2', padding: '10px'}} className="btn-new" 
      onClick={() => openAssistModal()}>+ Add an Assistant</div>
      <div style={{display:'flex', flexDirection:'column', cursor: 'pointer', rowGap: '8px'}}>
        {assistantsArray.map((assistant, index) => (
          <div style={{color: selected?._id == assistant?._id ? "green" : 'black', backgroundColor: '#f2f2f2'}} 
          onClick={() => onSelect(assistant)}className="btn-new"
           key={index}>{assistant?.name} 
           <div style={{color: selected?._id == assistant?._id ? "green" : 'gray', fontSize: '12px'}}>{assistant?._id} </div></div>
        ))}

      </div>
      </div>


<div style={{flex:'2.6', width: '68%'}}>
<div style={{display:'flex', alignItems: 'center',
padding: '0px 16px',justifyContent: 'space-between'}} className="title-box">
<div style={{display:'flex', flexDirection: 'column'}}>
  <div style={{display:'flex'}}>
    <div>
<h2 style={{marginBottom: '0px'}} >

  <input style={{fontSize:'26px', background: '#fbfbfb', borderRadius: '0px', fontWeight: '700'}} value={selected?.name} className="edit-name" 
   onChange={(e) => setSelected((prev) =>({ ...prev, name: e.target.value}))}/>
 

</h2>      
<p style={{marginTop: '0px', color: 'gray'}}>{selected?._id}</p> </div></div></div>

<div style={{display:'flex', marginTop: '-47px', alignItems: 'center', columnGap: '15px'}}>
  
 <Stream settings={selected}/>

<button onClick={() =>
     setIsOpen(true)} style={{borderRadius:'5px',height: '31.1px', backgroundColor: '#fbfbfb', cursor:'pointer'}}>
      <img src={Delete} style={{width:'18px'}}/> </button></div>
  </div>

<div style={{minHeight: '550px'}} className="title-box">
 
  <div style={{display:'flex', justifyContent:'space-between'}}>
<div style={{ display:'flex'}} className="selector-opt">


    <div  onClick={() => setIsOpt("Model")} style={{ backgroundColor : isOpt == "Model" ? '#34a853' : '#fbfbfb' , color: isOpt == "Model" ? '#fbfbfb' : 'black'}} className="opt-sel"> Model</div> 
    <div onClick={() => setIsOpt("Voice")} style={{ backgroundColor : isOpt == "Voice" ? '#34a853' : '#fbfbfb' , color: isOpt == "Voice" ? '#fbfbfb' : 'black'}} className="opt-sel-mid-1"> Voice </div>
    <div onClick={() => setIsOpt("Functions")} style={{ backgroundColor : isOpt == "Functions" ? '#34a853' : '#fbfbfb' , color: isOpt == "Functions" ? '#fbfbfb' : 'black'}} className="opt-sel-mid-1"> Functions </div>
    {/*<div onClick={() => setIsOpt("Lists")} style={{ backgroundColor : isOpt == "Lists" ? '#34a853' : '#fbfbfb' , color: isOpt == "Lists" ? '#fbfbfb' : 'black'}} className="opt-sel-mid-1"> Lists</div>*/}
  <div onClick={() => setIsOpt("KnowledgeBase")} style={{ backgroundColor : isOpt == "KnowledgeBase" ? '#34a853' : '#fbfbfb' , color: isOpt == "KnowledgeBase" ? '#fbfbfb' : 'black'}} className="opt-sel1"> Knowledge Base</div>
   
   
   
    </div>

<div style={{display: 'flex', columnGap: '10px'}}>
 

{isOpen && <>

<Modal onClose={() => setIsOpen(false)} 
selected={selected} setSelected={() => setSelected(assistants[0])} />

 

</>}
 
   </div>
   
   </div> 
<div style={{display:'flex', columnGap:'15px'}}>

{isOpt == "Model" ? <>
<div style={{flex:'2'}}>
<label>First Message </label>
<input value={selected?.firstMessage} onChange={(e) => setSelected((prev) =>({ ...prev, firstMessage: e.target.value}))} className="first-msg"/>
<label>System Prompt </label>
<textarea style={{fontFamily: 'sans-serif', background: '#fbfbfb'}} value={selected?.prompt} onChange={(e) => setSelected((prev) =>({ ...prev, prompt: e.target.value}))}className="prompt-text"/>


</div>  


<div className="model-sel"style={{flex:'1.1', marginLeft:'20px',  maxWidth: '200px'}}>
<label>Provider</label>
  <select style={{background: '#fbfbfb'}} ><option>Open AI </option> </select>
  <label style={{marginTop:'8px'}}>Model</label>
  <select style={{background: '#fbfbfb'}} ><option>gpt-4o</option><option>gpt-4o-mini</option>  </select>
 
</div>
</> :  isOpt == "Voice" ? <>

<div style={{width: '50%'}}>
<label>Voice</label>
<select style={{background: '#fbfbfb'}} value={selected?.voice} onChange={(e) => setSelected((prev) =>({ ...prev, voice: e.target.value}))} className="voice-select">
  <option value="asteria">Amy</option> 
  <option value="arcas">Dave</option> 
  <option value="perseus">Clark</option>
  <option value="luna">Mandy</option>
  <option value="zeus">Kevin</option>
</select></div>
 </> :  isOpt == "Functions" ? <>  
 <div style={{width: '50%'}} >
{isOn == "transfer" ? <>
 
              <div style={{ zIndex: '9999999999999999' }} className="modal">
                <div
                  style={{
                    width: '550px',
                    color: 'black',
                    padding: '15px',
                    justifyContent: 'center',
                  }}
                  className="modal-content"
                >
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <div onClick={() => saveChanges()} className="closer-btn-3">
                      X
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      columnGap: '15px',
                      marginTop: '-8px',
                      marginBottom: '5px',
                    }}
                  >
                    <h3>Add transfer contacts</h3>
                  </div>

                  <label>Add contacts</label>
                  {contacts.map((contact, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        placeholder="name"
                        value={contact.name}
                        onChange={(e) => updateContact(index, 'name', e.target.value)}
                        style={{ marginRight: '10px' }}
                      />
                      <input
                        placeholder="number"
                        value={contact.value}
                        type="number"
                        onChange={(e) => {
                          if (e.target.value.length < 12) {
                            updateContact(index, 'value', e.target.value);
                          }
                        }}
                        style={{ marginRight: '10px' }}
                      />
                      <button
                        className="standardBtn"
                        style={{ marginTop: '-10px' }}
                        onClick={() => removeContact(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button className="standardBtn" onClick={addContact}>
                    Add Number +
                  </button>
                </div>
           </div> 
</>  : isOn == "textMessage" ?  <>  
<div style={{ zIndex: '9999999999999999' }} className="modal">
                <div
                  style={{
                    width: '400px',
                    color: 'black',
                    padding: '15px',
                    justifyContent: 'center',
                  }}
                  className="modal-content"
                >
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <div onClick={() => saveChanges()} className="closer-btn-3">
                      X
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      columnGap: '15px',
                      marginTop: '-8px',
                      marginBottom: '5px',
                    }}
                  >
                    <h3>Send a text</h3>
                  </div>
                 <label>Text message body</label>
                 <textarea value={textMessage} onChange={(e) => setTextMessage(e.target.value)}style={{width: '95%', resize:'none'}}/>
                 <br/>
                  <button className="standardBtn" onClick={saveText}>
                   Save
                  </button>
                </div>
           </div> 


</>   : isOn == "gCal" ? <> <div style={{ zIndex: '9999999999999999' }} className="modal">
                <div
                  style={{
                    width: '400px',
                    color: 'black',
                    padding: '15px',
                    justifyContent: 'center',
                  }}
                  className="modal-content"
                >
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <div onClick={() => saveChanges()} className="closer-btn-3">
                      X
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      columnGap: '15px',
                      marginTop: '-8px',
                      marginBottom: '5px',
                    }}
                  >
                    <h3>Google Calendar</h3>
                  </div>
                  <label>Title</label>
    <input
      value={selected.gCal.g_title}
      onChange={(e) => handleGCalChange('g_title', e.target.value)}
      style={{ width: '95%', resize: 'none' }}
    />
    <label>Description</label>
    <input
      value={selected.gCal.g_description}
      onChange={(e) => handleGCalChange('g_description', e.target.value)}
      style={{ width: '95%', resize: 'none' }}
    />
    <label>Invites</label>
    <input
      value={currentInvite}
      onChange={handleInviteChange}
      style={{ width: '80%', resize: 'none' }}
    />
    <button  className="standardBtn" onClick={handleAddInvite}>Add Person</button>
    <ul>
      {selected.gCal.g_invites.map((invite, index) => (
        <li key={index}>{invite}</li>
      ))}
    </ul>
                 <label>Meeting duration</label>
    <select value={selected.gCal.g_duration} onChange={(e) => handleGCalChange('.g_duration', e.target.value)} style={{ padding: '5px' }}>
      <option value="15 min">15 min</option>
      <option value="30 min">30 min</option>
      <option value="45 min">45 min</option>
      <option value="1 hr">1 hr</option>
    </select>
                 <br/>
                  <button style={{marginTop:'15px'}} className="standardBtn" onClick={saveText}>
                   Save
                  </button>
                </div>
           </div> 
</>  : <> </>}

<div style={{display:'flex', flexDirection: 'column' , gap: '5px'}}> 

<h3>Built in functions</h3>
<div style={{marginBottom: '15px'}} className="func-item-parent">

<div className="func-item" style={{opacity: selected?.functions?.transfer ? '1' : '.5'}}>
<div>
<p>
  Call transfers
</p>
<button disabled={!selected?.functions?.transfer} className="standardBtn"  onClick={() => setIsOn("transfer")}>Add contacts to transfer</button>
</div>
<Toggle isOn={selected} setIsOn={setSelected} aiid={selected?._id} type={"transfer"}/>
</div>
</div>
 
</div>
 
<div  className="func-item-parent">

<div style={{opacity: selected?.functions?.textMessage ? '1' : '.5'}} className="func-item">
<div>
<p>
  Text message
</p>
<button  className="standardBtn"  onClick={() => setIsOn("textMessage")}>Edit Settings</button>
</div>
<Toggle isOn={selected} setIsOn={setSelected} aiid={selected?._id} type={"textMessage"}/>
</div>
</div>
</div>
<div style={{display:'flex', flexDirection:'column', gap:'5px'}}> 
<h3>Integrations</h3>
<div style={{minWidth:'275px', marginTop: '-4px'}} className="func-item-parent">

<div style={{opacity: selected?.functions?.gCal ? '1' : '.5'}} className="func-item">
<div>
  <div style={{display:'flex', alignItems: 'center', margin: '10px 3px' , columnGap: '8px'}}> 
<p style={{margin: '0px'}}>
 Google Calendar
</p> 
 <img style={{width:'32px', height:'32px', marginTop: '0px'}}src="https://res.cloudinary.com/dre1imks8/image/upload/v1721977786/Google_Calendar_icon__2020_.svg_livsb8.png"/></div>
 <button  className="standardBtn"  onClick={() => setIsOn("gCal")}>Edit Settings</button>
</div>
<Toggle isOn={selected} setIsOn={setSelected} aiid={selected?._id} type={"gCal"}/>
</div>
</div></div>
 
 
 
</> : <>  {isOpt == "KnowledgeBase" && <div  className="func-item-parent"> 


<p style={{marginBottom:'10px', paddingBottom:'5px'}}>Upload a document to reference</p>
      <UploadDoc
              addKnowledgeBase={addKnowledgeBase}
              knowledgeBase={knowledgeBase}
              removeKnowledgeBase={removeKnowledgeBase}
            />
 
</div> }

 

</> }
  </div>
 
</div>
</div>
{success && <div style={{backgroundColor: '#34a853', border:'2px solid orange', fontWeight: '700', padding: '8px' ,color: 'white', borderRadius: '5px', width: 'fit-content', minWidth: '160px', textAlign: 'center', position:'absolute', bottom: '15px', right:'15px'}} className="success-animation">Assistant Updated! </div>}
    </div>
  );
};

export default Assistant;