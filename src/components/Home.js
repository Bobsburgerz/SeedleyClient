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
 
      <div style={{ padding: '15px', display: 'flex', justifyContent: 'center' }}> <div className={styles.nav_container}>
 
      <div style={{color: 'white'}}className={styles.logoContainer}>

        <img style={{ filter: 'invert(10%) sepia(0%) saturate(70%) hue-rotate(145deg) brightness(1910%) contrast(100%)'}} className={styles.logo} src={Logo} alt="Logo" />
 
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
      <div style={{ padding: '15px', display: 'flex', justifyContent: 'center', flexDirection:'column', alignItems: 'center', textAlign: 'center' ,margin:'70px 0px'}}>
        <div id="img-parent" className={styles.imgParent}>
      
          <div  className={styles.words}id="words" style={{ marginLeft: '10px' }}>
            <h1 className={styles.main_text}>Voice <span style={{ color: 'white',
            textShadow: '0 0 4px orange, 0 0 4px orange, 0 0 4px orange, 0 0 4px orange',}}>Automation</span> Made</h1>
 
            <h1 className={styles.main_text} style={{ marginTop: '-23px'}}>  Simple</h1>

            <div style={{ display: 'flex', columnGap: '12px', marginTop: '50px' , justifyContent: 'center'}}>
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
<div className={styles.info} style={{display:'flex', marginTop: '155px', justifyContent: 'center'}}>
      <div className={styles.info}style={{display:'flex', justifyContent: 'center',gap:'60px', maxWidth: '900px'}}> 
        <div  style={{maxWidth:'300px', flex: '2',marginTop: '15px'}} className={styles.image_main} > <Sound/> </div>
      
      
        <div style={{display:'flex', flex: '.7',}}>
<div  className={styles.textbox} style={{maxWidth: '900px', marginTop: '15px',
   marginBottom: '15px', color: 'white', textAlign: 'start'}}>


<h1 className='header-font'>AI that automates your business communications.</h1>

 <h3> Enhance your sales, customer service, or appointment setting efforts with low latency AI assistants. Discover how Seedley can improve your business today. </h3>
</div>
</div>

  </div>
      </div>
<div  className={styles.info} style={{display:'flex', justifyContent: 'center',gap:'60px', marginTop:'100px', columnGap:'86px',maxWidth: '950px'}}>
      <div style={{display:'flex', flex: '.92',}}>
<div  className={styles.textbox} style={{maxWidth: '952px', marginTop: '15px',
   marginBottom: '15px', color: 'white', textAlign: 'start'}}>


<h1 className='header-font'>Lightning Fast Responses</h1>

 <h3> Leverage natrual sounding agents that respond on average in less than .35 seconds. </h3>
 <h3> Our agents are optimized for latency to delivrer a seamless customer experience  </h3>
</div>
</div>

      <img className={styles.home_img_bolt} src={'https://res.cloudinary.com/dojwag3u1/image/upload/v1721436726/Vector_41_nfvdtp.png'}  />
      </div>
      
      
      <div  className={styles.info} style={{display:'flex', justifyContent: 'center',gap:'60px', marginTop:'50px', columnGap:'86px',maxWidth: '950px'}}>

<img className={styles.home_img_ai}  src={'https://res.cloudinary.com/dojwag3u1/image/upload/v1721439340/Group_50_qsb794.png'}/>
      <div style={{display:'flex', flex: '.92',}}>
<div  className={styles.textbox} style={{maxWidth: '952px', marginTop: '15px',
   marginBottom: '15px', color: 'white', textAlign: 'start'}}>

<h1 className='header-font'>Cutting Edge AI Models</h1>

 <h3> Gain access to the latest and best AI models available, all in one platform</h3>
 <h3> Upload your own documents and customize your agents to your needs.  </h3>
</div>
</div>

      
      </div>
      
     
      
       </div>
       
       
       
       <div style={{ padding: '15px', display: 'flex', justifyContent: 'center', flexDirection:'column', alignItems: 'center', textAlign: 'center' ,margin:'70px 0px'}}>
        <div id="img-parent" className={styles.imgParent}>
      
          <div  className={styles.words}id="words" style={{ marginLeft: '10px' }}>
          <h1 className={styles.main_text}>Get <span style={{ color: 'white',
            textShadow: '0 0 4px orange, 0 0 4px orange, 0 0 4px orange, 0 0 4px orange',}}>
              In</span> Touch</h1>
 
            <h1 className={styles.main_text} style={{ marginTop: '-23px'}}>  Today</h1>

            <div style={{ display: 'flex', columnGap: '12px', marginTop: '50px' , justifyContent: 'center'}}>
            <a href="/pricing?contact=true"><button className={styles.gradient_button4} >
         Get a demo
               <img style={{ width: '28px', height: '28px' }} src="https://res.cloudinary.com/dre1imks8/image/upload/v1715902508/right-arrow_id8bpb.png" />
              </button></a>
              <a href="/pricing">  <button className={styles.gradient_button3}>
              Sign up
                <img style={{ width: '28px', height: '28px' }} src="https://res.cloudinary.com/dre1imks8/image/upload/v1715902508/right-arrow_id8bpb.png" />
              </button></a>
            </div>   </div>
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
