import AssistantTemplates from '../AssistantTemplates';
const AssistModal = ({ onClose, addAssistant}) => {
    return (
      <div style={{ zIndex: '9999999999999999' }} className="modal">
     <div style={{ maxWidth: '615px', color: 'black', padding:'20px' }} className="modal-content">
      <div className="flex-end">
  
     <div style={{ cursor: 'pointer', marginTop: '-10px', marginRight: '-12px', zIndex: '99999999' }} 
     onClick={() => onClose()} className="closer-btn-2"> <div>x</div> </div>
      </div>  
  
  
         <h2>Choose your assistant </h2>
  
    <AssistantTemplates onClose={onClose} />
  <div className="flex-end">
    <p onClick={() => addAssistant()} className="wht-btn"> <b>OR</b> start from scratch </p></div>
        </div>
      </div>
    );
  };

  export default AssistModal