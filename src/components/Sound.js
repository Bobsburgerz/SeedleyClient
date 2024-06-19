import React, { useState, useRef } from 'react';
import audioSrc from "./assets/sample2.mp3";
import "./styles/Sound.css"

const SoundVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      videoRef.current.pause();
      setLoading(false)
      setIsPlaying(!isPlaying);
    } else {
         
   
if ( audioRef.current.currentTime == 0 ) {
        setTimeout(() => {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
          }, 3050);
          setLoading(true)
      videoRef?.current.play();
        }
     

        else {

      audioRef.current.play();
      setIsPlaying(!isPlaying);
  
  
videoRef?.current.play();
  }
        
    }
    
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '45px', flexDirection: 'column' }}>
   {!isPlaying && <div style={{display:'flex', flexDirection: 'column', rowGap: '15px'}} onClick={handlePlayPause} className='home-img'>
        <img className="ply" src ="https://res.cloudinary.com/dojwag3u1/image/upload/v1717738010/channels4_profile_2_1_cqxhvs.png"/> 
  <button   className='play-demo'>{loading ? "Loading ..." : "Play Sample"}</button>
        </div>}
      <video onClick={handlePlayPause} style={{display: !isPlaying && 'none'}} className="home-vid"ref={videoRef} muted src="https://res.cloudinary.com/dojwag3u1/video/upload/v1717739960/Screen_recording_2024-06-07_12.55.05_AM_o8f55z.webm" />
    
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default SoundVisualizer;