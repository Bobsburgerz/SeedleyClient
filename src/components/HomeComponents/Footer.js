import React from 'react';
 
import styles from './styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
     
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Seedley.net All rights reserved.
          </p>
        </div>

        <div className={styles.right}>

          <a href="#" className={styles.socialIcon}>
         
          </a>
          <a href="#" className={styles.socialIcon}>
 
          </a>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;