import React from 'react';

const ToggleButton = ({isOn, setIsOn }) => {
 
  const handleToggle = () => {
    setIsOn((prevState) => ({
      
      ...isOn, 
      functions: {
        ...prevState.functions,
        transfer: !prevState.functions.transfer,
      },
    }));
  };
    return (
  
      <div style={{display: 'flex', marginTop: "25px", marginBottom: "25px", alignItems: 'center', columnGap: '15px'}}>
      <div style={{background: isOn ? '#ccc' : 'gray',}}className={`toggle-button ${isOn?.functions?.transfer ? 'on' : 'off'}`} onClick={handleToggle}>
        <div className="handle"></div>
      </div>

  
      </div>
    );
  };

  
  export default ToggleButton