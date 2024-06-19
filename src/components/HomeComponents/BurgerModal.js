import React, { useState } from 'react';
import styles from './styles/BurgerModal.module.css';

export default function CircularToggleButton() {
 

  return (

    <div className={styles.Modal}>
    
  <a href="/login">  <div  style={{  fontSize: '18px'}} className={styles.ModalOption}>
        Login
    </div> </a>

    <a href="/signup"> <button  style={{background: 'orange', width: '100%', color: 'white', fontSize: '18px', padding: '3px'}}className={styles.ModalOption}>
        Sign Up
    </button> </a> 
    </div>
  ); 
}