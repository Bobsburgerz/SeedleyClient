import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../services/appApi";


const ToggleButton = ({isOn, setIsOn, user, updateUser}) => {
 

  const handleToggle = async () => {
    setIsOn(prevState => !prevState);
   await updateUser({id: user._id, byok: !isOn})
  };

  return (

    <div style={{display: 'flex', marginTop: "25px", marginBottom: "25px", alignItems: 'center', columnGap: '15px'}}>
    <div className={`toggle-button ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
      <div className="handle"></div>
    </div>


<div> {isOn ? <>Use My Own Enviroment Keys (Cheaper)</> :<> Use Seedley Keys</> }</div>

    </div>
  );
};

const Enviroment = () => {
  const user = useSelector((state) => state.user);
  const [openKey, setOpenKey] = useState(user?.open);
  const [deepKey, setDeepKey] = useState(user?.deep);
  const [voiceKey, setVoiceKey] = useState(user?.ellab);
  const [updateUser, { isError, isLoading, error }] = useUpdateUserMutation();
  const [isOn, setIsOn] = useState(user.byok);
  useEffect(() => {
 
    const makeUpdate = () => {
      updateUser({ id: user._id, open: openKey, ellab: voiceKey, deep:deepKey });
    };
 
  
    const interval = setInterval(() => {
     makeUpdate();
    }, 3000);  
  
    return () => {
      clearInterval(interval);  
    };
  }, [openKey, voiceKey, deepKey]);

  const handleOpenKeyChange = (event) => {
    setOpenKey(event.target.value);
  };
  const handleDeepKeyChange = (event) => {
    setDeepKey(event.target.value);
  };

  const handleVoiceKeyChange = (event) => {
    setVoiceKey(event.target.value);
  };

  return (
    <div style={{ display: "flex", columnGap: "25px", padding: "15px" }}>
      <div
        className="title-box"
        style={{
          padding: "25px",
          rowGap: "5px",
          fontSize: "21px",
          display: "flex",
          flexDirection: "column",
          minHeight: "540px",
        }}
      >
        <h3 style={{ margin: "0px" }}>Environment Keys</h3>


        <ToggleButton isOn={isOn} setIsOn={setIsOn} user={user} updateUser={updateUser}/>
        <label style={{ opacity: isOn ? '1' : '.5' }}>Open AI API Key</label>
        <input
        value={openKey}
          onChange={handleOpenKeyChange}
          style={{ width: "50%", opacity: isOn ? '1' : '.5' }}
          type="password"
        />
           <label style={{ opacity: isOn ? '1' : '.5' }}>Deepgram API Key</label>
        <input
        value={deepKey}
          onChange={handleDeepKeyChange}
          style={{ width: "50%", opacity: isOn ? '1' : '.5' }}
          type="password"
        />
        <label style={{ opacity: isOn ? '1' : '.5' }}>Eleven Labs API Key</label>
        <input
        value={voiceKey}
          onChange={handleVoiceKeyChange}
          style={{ width: "50%", opacity: isOn ? '1' : '.5' }}
          type="password"
        />
      </div>
      <div></div>
    </div>
  );
};

export default Enviroment;