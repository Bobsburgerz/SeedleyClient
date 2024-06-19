import React, { useState } from 'react';
import PlanWrap from "../Stripe/PlanWrap"

const Modal = ({onClose}) => {
  
  
    return (
      <div style={{ zIndex: '9999999999999999' }} className="modal">
        <div style={{ width: 'fit-content', color: 'black' }} className="modal-content">
  <PlanWrap onClose={onClose}/>
      </div>    </div>
    )}


    export default Modal