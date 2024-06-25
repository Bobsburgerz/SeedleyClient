import { useDeleteAssistantMutation } from "../../../services/appApi";
const Modal = ({ onClose, selected , setSelected}) => {
   
    const [deleteAssistant] = useDeleteAssistantMutation();
    
    const handleSubmit = async (e) => {
  deleteAssistant(selected)
  setSelected()
      onClose()
    };
  
    return (
      <div style={{ zIndex: '9999999999999999' }} className="modal">
        <div style={{ maxWidth: '350px', textAlign : 'center', color: 'black', padding:'0px' }} className="modal-content">
        <div className="closer-wrap-2">
                <div style={{ cursor: 'pointer' , marginRight: '5px', marginTop: '5px' }} onClick={() => onClose()} className="closer-btn-2"> <div>x</div> </div>
              </div>
              <div style={{padding: '15px'}}>
         <h2 style={{marginTop: '25px'}}>Are you sure you want to delete your assistant? </h2>
         <p>This is permanent and can't be undone </p>
         <button className="btn-new"   style={{ cursor: 'pointer' , width: '100%', color : 'red', fontWeight: '700'}}  onClick={() => handleSubmit()}> Delete Permanently</button> </div>
        </div>
      </div>
    );
  };


  export default Modal