import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Phone from "./assets/phone.png"
import axios from 'axios'

const App = ({ settings }) => {
  const user = useSelector((state) => state.user);
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const isWebSocketOpen = useRef(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioString, setAudioString] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const startWebSocket = async () => {
    const res = await axios.post('https://seedleycallservice.onrender.com/api/incoming/websocket', { userId: user?._id, aiid: settings._id, phone: 'web', callId: 'web' , lang: settings.language});
    let socketurl = "";
    socketurl = res.data.url;
    try {
      const constraints = {
        audio: {
          echoCancellation: true,
          autoGainControl: false,
          noiseSuppression: true,
          sampleRate: 48000,
          channelCount: 2,
        }
      };
  
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const audioTrack = stream.getAudioTracks()[0];
      const ws = new WebSocket(socketurl);
      wsRef.current = ws;
      setIsRecording(true);
      setLoading(true);
  
      ws.onopen = () => {
        isWebSocketOpen.current = true;
        ws.send(JSON.stringify({ event: "start", start: { streamSid: '5555' } }));
      };
  
      let audioQueue = [];
  
      ws.onmessage = (message) => {
        setLoading(false);
        const data = JSON.parse(message.data);
        if (data.event === "media" && data.media && data.media.payload) {
          console.log("new media");
          const base64Payload = data.media.payload;
          audioQueue.push(base64Payload);
          if (audioQueue.length === 1) {
            playNextAudio();
            // Mute the audio track when media starts playing
            audioTrack.enabled = false;
          }
        } else if (data.event === "clear") {
          console.log("Clear called");
        
        }
      };
  
      const pauseAudio = () => {
        const audioElement = document.getElementById(`audioElement`);
        if (audioElement) {
          console.log("pause called");
          audioElement.pause();
          audioQueue.shift();
        }
      };
  
      const playNextAudio = () => {
        if (audioQueue.length === 0) {
          audioTrack.enabled = true;
          return;
        }
        const base64Payload = audioQueue[0];
        try {
          const binaryData = atob(base64Payload);
          const arrayBuffer = new ArrayBuffer(binaryData.length);
          const view = new Uint8Array(arrayBuffer);
          for (let i = 0; i < binaryData.length; i++) {
            view[i] = binaryData.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          const audioElement = document.getElementById(`audioElement`);
  
          audioElement.src = audioUrl;
  
          // Set the volume to 50% (0.5)
          audioElement.volume = 0.50;
  
          audioElement.play();
  
          audioElement.onended = () => {
            audioQueue.shift();
            playNextAudio();
            // Unmute the audio track when media playback ends
          
          };
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      };
  
      setTimeout(() => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0) {
            const reader = new FileReader();
            reader.onload = () => {
              const bufferArray = reader.result;
  
              if (bufferArray) {
                const base64String = arrayBufferToBase64(bufferArray);
                ws.send(JSON.stringify({ event: "media", media: { payload: base64String } }));
              }
            };
            reader.readAsArrayBuffer(event.data);
          }
        });
  
        mediaRecorder.start(1000);
        console.log('Listening for audio data...');
      }, 3000);
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  };
  
  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer);
    const base64String = btoa(String.fromCharCode.apply(null, binary));
    return base64String;
  };

  const stopWebSocket = () => {
    if (isWebSocketOpen?.current) {
      mediaRecorderRef?.current?.stop();
      wsRef?.current?.close();
     
      setIsRecording(false);


      const audioElement = document.getElementById(`audioElement`);
             
 
      if (audioElement) {
        console.log("pause called")
        audioElement.pause();
         }
      console.log('Recording stopped and WebSocket closed.');
    }
  };


  return (
    <div>
      <div>
      <audio id={`audioElement`} />
        {isRecording ? (
          <button
            className="submit-b2"
            style={{
              backgroundColor: 'red',
              opacity: loading ? '.5' : '1',
              padding: '10px',
              height: '32px',
              fontSize: '18px'
            }}
            onClick={() => stopWebSocket()}
          >
            {loading ? <> Loading ...</> : <>■ End Call</>}
          </button>
        ) : (
          <button

            className="submit-b2"
            style={{
             boxShadow: '0 0 1px 1px orange',
              opacity: user?.credits < 50 ? '.5' : '1',
              padding: '10px',
              background: '#34a853',
              height: '32px',
              cursor: user?.credits < 50 ? 'none' : 'pointer',
              display: 'flex',
              columnGap: '8px',
              fontSize: '18px'
            }}
            onClick={ () =>  user?.credits < 50  ? setIsPlaying(false) : startWebSocket()}
          >
            <img style={{ width: '18px' }} src={Phone} /> Speak with assistant
          </button>

          
        )}  {isRecording && <>
   <div style={{position :'absolute', marginLeft: '-270px', marginTop: '13px', fontSize:'12px', color: 'gray'}}> <br/><i>Interruptions are supported on phone calls but not web test calls for now*</i> </div> </>}
        {user?.credits < 50 && <div style={{position :'absolute', marginLeft: '-35px'}}> <br/>Not enough credits.    Add more in billing </div>}
      </div>
    </div>
  );
};

export default App;