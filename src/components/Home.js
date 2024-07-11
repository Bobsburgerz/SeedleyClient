import React , { useState } from 'react';
import styles from './styles/home.module.css'; // Import the CSS module
import Footer from './HomeComponents/Footer';
 import Sound from "./Sound"
import BurgerModal from './HomeComponents/BurgerModal'
import Logo from "./assets/Logo.png";
 
 
function App() {
  const [modal, setModal] = useState(false)
  

  return (

    <>
 
    <div style={{ borderBottom :'10px solid orange', }} className={styles.App}>
    <div className={styles.sliderThumb}></div>
      <div style={{ padding: '15px', display: 'flex', justifyContent: 'center' }}> <div className={styles.nav_container}>
 
      <div className={styles.logoContainer}>

        <img className={styles.logo} src={Logo} alt="Logo" />
 
      </div>
      <div className={styles.loginContainer}>
      <a href="https://docs.seedley.net" target="_blank">  <div  className={styles.navBtn}style={{cursor: 'pointer'}}>Docs</div></a>
      
      
      <a href="/pricing"><div className={styles.navBtn}style={{cursor: 'pointer'}}>Pricing</div></a>
      <a href="/login"><div className={styles.navBtn}style={{cursor: 'pointer'}}>Login</div></a> 
        <a href="/signup"><button className={styles.gradientButton} style={{ cursor: 'pointer', fontSize: '16px', fontWeight: '700', borderRadius: '5px' }}>
          Sign up</button>
          </a>
      </div>
      
      <div className={styles.burgerWrap}
      
      
      >


        {modal == true ? <> 
        
        <img onClick={() => setModal(false)} className={styles.burger} src="https://res.cloudinary.com/dojwag3u1/image/upload/v1717746301/cancel_plgwsd.png"/>
       
        </> : <>
        <img onClick={() => setModal(true)}className={styles.burger} src="https://res.cloudinary.com/dojwag3u1/image/upload/v1717746163/menu_1_xhiwgo.png"/>
        </>}
        
        </div>
      









      </div>

      {modal && <>
      
      <BurgerModal/> </>}
      </div>
      <div style={{ padding: '15px', display: 'flex', justifyContent: 'center' }}>
        <div id="img-parent" className={styles.imgParent}>
          <div   className={styles.image_main} > <Sound/> </div>
          <div  className={styles.words}id="words" style={{ marginLeft: '10px' }}>
            <h1 className={styles.main_text}>Voice</h1>
            <h1 className={styles.main_text} style={{ marginTop: '-25px'}}><span style={{ color: 'white',
            textShadow: '0 0 4px orange, 0 0 4px orange, 0 0 4px orange, 0 0 4px orange',}}>Automation</span></h1>
            <h1 className={styles.main_text} style={{ marginTop: '-23px'}}>Made Simple</h1>

            <div style={{ display: 'flex', columnGap: '12px', marginTop: '10px' }}>
            <a href="/pricing?contact=true"><button className={styles.gradient_button4} >
         Get a demo
               <img style={{ width: '28px', height: '28px' }} src="https://res.cloudinary.com/dre1imks8/image/upload/v1715902508/right-arrow_id8bpb.png" />
              </button></a>
              <a href="/pricing">  <button className={styles.gradient_button3}>
              Sign up
                <img style={{ width: '28px', height: '28px' }} src="https://res.cloudinary.com/dre1imks8/image/upload/v1715902508/right-arrow_id8bpb.png" />
              </button></a>
            </div>
          </div>
        </div>

      </div>




      <div style={{display:'flex', justifyContent:'center'}}>
<div  className={styles.textbox} style={{maxWidth: '900px', marginTop: '15px', marginBottom: '15px', color: 'white', textAlign: 'center'}}>


<h2>AI that automates your business communications.</h2>

 <h3> Enhance your sales, customer service, or appointment setting efforts with low latency AI assistants. Discover how Seedley can improve your business today. </h3>
</div>
</div>

  </div>
  <div className={styles.fwrap} style={{bottom: '0',  width: '100%'}}>
<Footer/>
</div>
 
  </>
  );
}

export default App;
