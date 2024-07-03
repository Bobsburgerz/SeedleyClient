 
import React, {   useState } from "react";
 import Checkout from "./Stripe/Checkout"
 
 import { useSelector , useDispatch} from "react-redux";

 const Modal = ({ onClose}) => {
  return (
    <div style={{ zIndex: '9999999999999999' }} className="modal">
      <div style={{ width: 'fit--content', color: 'black' }} className="modal-content">
  <Checkout onClose={onClose}/>  
      </div>
    </div>
  );
};
const Billing = () => {
  const user = useSelector((state) => state.user);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const [open, setOpen] = useState(false)
const onClose =() => {
  setOpen(false)
}
 
 return (  

  <div style={{display:'flex', columnGap: '25px', padding: '15px'}}>
  <div className="title-box" style={{ padding: '25px',rowGap: '15px', fontSize:'21px', display:'flex' , justifyContent: 'space-between', minHeight: '540px' }}>
  <div style={{  display: 'flex', flexDirection: 'column', rowGap: '15px' }}> <div style={{fontWeight:'700', color: 'orange',marginRight:'15px'}}>{currentMonth}</div > 
 
  
   {open && <Modal onClose={() => setOpen(false)} /> }
  </div>
  <div style={{width:'500px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
 
    <div style={{ display: 'flex', justifyContent:'space-between' , width:'500px' }}>
    <div style={{fontWeight:'700'}}>Account credits:</div>
<div>${(user.credits / 100).toFixed(2)}</div>
</div>

<div style={{ display: 'flex', justifyContent:'space-between', width:'500px', marginTop: '5px' }}>
<div style={{fontWeight:'700'}}>Total usage:</div>
<div>${(user.usage / 100).toFixed(2)}</div>
</div>


  <div style={{ display: 'flex', justifyContent:'space-between', width:'500px',marginTop: '5px' }}>
   
  </div></div>




  </div>
  <div>
 
  </div>
  </div>
)

};

export default Billing;
