import React, { useState, useRef } from 'react';
import Phone from "./assets/phone.png"
import { useSelector, useDispatch } from "react-redux";
import  InSVG from './assets/call-incoming.svg';
import  OutSVG from './assets/call-outgoing.svg';
import Filter from "./assets/edit.png"
import "./styles/Calls.css"
const Calls = () => {
  const callArray = useSelector((state) => state.calls);
  const calls = callArray.filter(call => call.type !== "web").reverse();
  const [isOpt, setIsOpt] = useState("Model");
  const [assistants, setAssistants] = useState([{ script: "", name: `3-20 9:24am 224 545-4354` }]);
  const [selected, setSelected] = useState(calls[0]  || {transcription:[]});
  const [isModal, setModal] = useState(false);
  const audioRef = useRef(null);  
 
  const handlePlay = (call) => {
  
   setSelected(call)
    if (audioRef.current && !audioRef.current.paused) {
   
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }   
        if (audioRef.current) {
          audioRef.current.src = call.recording;
       
        }
      }

    

  const renderConversation = () => {
    return selected?.transcription.filter((message) => !message.content.includes('{')).map((message, index)  => {
      const isUser = message.role === 'user';
      const backgroundColor = isUser ? '#34a853' : 'white';
      const textAlign = isUser ? 'end' : 'start';
    
      return (
        <div
          key={index}
          style={{
            color: isUser ? 'white' : 'black',
            width: 'fit-content',
            display: 'flex',
            margin: '10px',
            fontSize: '15px',
            textAlign: 'start',
            justifyContent: textAlign,
            width: '87%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {!isUser && (
              <div style={{ display: 'flex' }}>
{!isUser && <div style={{ display: 'flex' }}><span style={{ fontSize: '13px' }}></span></div>}
              
              </div>
            )}
            <div style={{ padding: '10px',  borderRadius: '5px', backgroundColor: backgroundColor, alignSelf: textAlign }}>
              {message.content}
            </div>
          </div>
        </div>
      );
    });
  };
  const [favorite, setFavorite] = useState([])
  const [filters, setFilters] = useState(false);  
  const [durationFilter, setDurationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');  
  const [filteredCalls, setFilteredCalls] = useState(calls); 
  const applyFilters = () => {
    const filtered = calls.filter(call => {
      let durationMatch = true;
      let typeMatch = true;
 
      if (durationFilter) {
        durationMatch = call.duration >= durationFilter;
      }
 
      if (typeFilter) {
        typeMatch = call.type === typeFilter;
      }
 
      return durationMatch && typeMatch;
    });
 
    setFilteredCalls(filtered);
  };




  return (
    <div className="flex-cont-1">
      <div style={{ display: 'flex', flex: '1.2', flexDirection: 'column', rowGap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f2f2f2', alignItems:'center' }}
         className="btn-new">
           <div>Search Phone Call Logs </div> 
           <img onClick={() => setFilters(!filters)}style={{width: '30px', cursor: 'pointer'}} src={Filter}/></div>
       
        {filters && (
          <div className="filters-popup">
            
            <input type="number" placeholder="Duration is at least (x seconds)" value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)} />
           <div className="space-between">
            <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">Call Type</option>
              <option value="inbound">Inbound</option>
              <option value="outbound">Outbound</option>
              <option value="outbound">Favorite</option>
            </select>
            <button className="btn-set" onClick={applyFilters}>Apply Filters</button> </div>
          </div>
        )}
       
        <div style={{ display: 'flex', flexDirection: 'column',  height:'80vh' , overflowY:'scroll', rowGap: '8px' }}>
 
        {filteredCalls.map((call, index) => {
  const dateTime = new Date(call.date);
  const formattedDateTime = dateTime.toLocaleString();
 
  if (call.recording !== "") {
    return (
      <div
        style={{
          color: selected._id === call._id ? "green" : "black",
          cursor: "pointer", padding:'10px', height: '55px',background: '#f2f2f2'
        }}
        onClick={() => handlePlay(call)}
        className="btn-new"
        key={index}
      >


        <div style={{ display: "flex",   justifyContent: "space-between" }}>
   
          <div style={{display: "flex", width: '98px', justifyContent: "space-between" }}> 
     
          <div >From:</div> <div style={{marginLeft:'4px'}}>{call.fromNumber}</div> 
          </div>

          <div style={{ fontSize: "12px", marginRight:'0px', marginTop: '-5px', alignItems: 'center', display:'flex', columnGap: '15px', color: "gray" }}>
          <div>  {formattedDateTime}     </div>             <img   onClick={() => {
    // Check if the index already exists in the array
    const indexExists = favorite.includes(index);
    
    if (indexExists) {
      // If it exists, remove it
      setFavorite(favorite.filter(item => item !== index));
    } else {
      // If it doesn't exist, add it
      setFavorite([...favorite, index]);
    }
  }}style={{width:'18px', height:'18px' }} src={ favorite.includes(index) ? "https://res.cloudinary.com/dojwag3u1/image/upload/v1717195891/star_1_erikvu.png": "https://res.cloudinary.com/dojwag3u1/image/upload/v1717195891/star_a3cdvl.png" }/>
          </div>
        </div >
        <div  style={{display: "flex", width: '98px', marginTop: '2px',justifyContent: "space-between" }}> <div>To:</div> <div style={{marginLeft: '25px'}}>{call.toNumber}</div> </div>
    
    
        <div style={{display: 'flex', justifyContent: 'space-between'  }}>
      <div style={{display:'flex',
       flexDirection: 'row',  width: '100%', justifyContent: 'space-between'}}>
    
     <div style={{marginLeft:'4px', marginTop: '3px', color: 'gray', fontSize: '12px'}}>{call._id}</div>
     <div style={{marginLeft:'8px', marginTop:'-10px'}}>
      {call.type == "inbound" ? <img style={{width:'25px'}}src={InSVG}/> 
      : <img  style={{width:'25px'}} src={OutSVG}/>} </div>
     </div> 
       </div>
    
        <div style={{display: "flex", width: '98px', 
        color: 'gray', marginTop: '8px', marginBottom: '-4px', fontSize: '12px', justifyContent: "space-between" }}> 
   
   
   
     <div style={{display:'flex', flexDirection: 'row', width:'415px', justifyContent: 'space-between'}}>
 
      
      </div>
     </div>
      </div>
    );
  } else {
    return null; 
  }
})}
        </div>
      </div>

<div style={{flex:'1'}}> 
<div style={{ background: '#f2f2f2'}} className='btn-new'>
      <audio style={{marginLeft: '18px', height:'24px' , borderRadius:'5px', marginTop: '4px'}} ref={audioRef} controls></audio></div> </div>
      <div style={{display:'flex',background:'#f2f2f2',padding:'10px', maxHeight: '83vh', overflowY: 'scroll', borderRadius:'5px', border:'1px solid gray' ,flex:'1.2',flexDirection:'column'}}>
<div><p style={{marginTop: '0px', marginLeft: '5px',fontWeight: '700', fontSize: '17px'}}>Transcription</p></div>
      {renderConversation()}</div>
    </div>
  );
};

export default Calls;