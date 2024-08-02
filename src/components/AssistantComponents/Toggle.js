import React from 'react';
import { useSelector , useDispatch} from "react-redux";
const ToggleButton = ({isOn, setIsOn ,aiid,  type}) => {
  const user = useSelector((state) => state.user);
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
      textMessage: !prevState.functions.textMessage,
    },
  })
)
}

else if (type == "gCal") {

  if (user.g_accessToken) {
  setIsOn((prevState) => ({ 
    ...isOn, 
    functions: {
      ...prevState.functions,
      gCal: !prevState.functions.gCal,
    },
  })


)}
else {
  window.location.href = `https://pizzaserver.onrender.com/gauth?aiid=${aiid}`;
}


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
      :     type == "textMessage" ?  
      <div style={{display: 'flex', marginTop: "25px", marginBottom: "25px", alignItems: 'center', columnGap: '15px'}}>
      <div style={{background: isOn ? '#ccc' : 'gray',}}className={`toggle-button ${isOn?.functions?.textMessage ? 'on' : 'off'}`} onClick={handleToggle}>
        <div className="handle"></div>
      </div>
      </div>
      :  <div style={{display: 'flex', marginTop: "25px", marginBottom: "25px", alignItems: 'center', columnGap: '15px'}}>
      <div style={{background: isOn ? '#ccc' : 'gray',}} className={`toggle-button ${isOn?.functions?.gCal ? 'on' : 'off'}`} onClick={handleToggle}>
        <div className="handle"></div>
      </div>
      </div> }</div> );
  };

  
  export default ToggleButton