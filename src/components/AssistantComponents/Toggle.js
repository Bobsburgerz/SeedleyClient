import React from 'react';

const ToggleButton = ({isOn, setIsOn , type}) => {
 
  const handleToggle = () => {


    if (type == "transfer") {
    setIsOn((prevState) => ({ 
      ...isOn, 
      functions: {
        ...prevState.functions,
        transfer: !prevState.functions.transfer,
      },
    })
  )
} else if (type == "textMessage") {
  setIsOn((prevState) => ({ 
    ...isOn, 
    functions: {
      ...prevState.functions,
      textMessage: !prevState.functions.text,
    },
  })
)
}
  };
    return (

      <div>
  {type == "transfer" ? 
      <div style={{display: 'flex', marginTop: "25px", marginBottom: "25px", alignItems: 'center', columnGap: '15px'}}>
      <div style={{background: isOn ? '#ccc' : 'gray',}}className={`toggle-button ${isOn?.functions?.transfer ? 'on' : 'off'}`} onClick={handleToggle}>
        <div className="handle"></div>
      </div>
      </div>
      :       
      <div style={{display: 'flex', marginTop: "25px", marginBottom: "25px", alignItems: 'center', columnGap: '15px'}}>
      <div style={{background: isOn ? '#ccc' : 'gray',}}className={`toggle-button ${isOn?.functions?.textMessage ? 'on' : 'off'}`} onClick={handleToggle}>
        <div className="handle"></div>
      </div>
      </div>
 }</div> );
  };

  
  export default ToggleButton