import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./App.css"
function App() {
  const {
    transcript,
    interimTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition({ continuous: true, interimResults: true });

  useEffect(() => {
    if (browserSupportsSpeechRecognition && !listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [browserSupportsSpeechRecognition, listening]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser doesn&apos;t support speech recognition.</div>;
  }
  if (!isMicrophoneAvailable) {
    return <div>Please allow microphone access to use speech recognition.</div>;
  }

  return (

    <div className='ctr'>
      <div>


    <div style={styles.container}>
      <h1>Speech to Text</h1>
      <p>Status: {listening ? '🔴 Listening…' : '⚪️ Paused'}</p>
      <div style={styles.buttons}>
        <button onClick={() => SpeechRecognition.startListening({ continuous: true })} disabled={listening}>
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening} disabled={!listening}>
          Stop
        </button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <div style={styles.transcriptBox}>
        <p style={{ color: '#888' }}>{interimTranscript}</p>
        <p>{transcript || <em>Speak something…</em>}</p>
      </div>
    </div>
      </div>
    </div>

  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: 600,
    margin: '30px auto',
    padding: 20,
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: 8
  },
  buttons: {
    margin: '15px 0',
    display: 'flex',
    gap: '1em',
    justifyContent: 'center'
  },
  transcriptBox: {
    minHeight: '120px',
    padding: 10,
    border: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    textAlign: 'left'
  }
};

export default App;
