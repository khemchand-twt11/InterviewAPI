import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../App.css";
import Countdown from "./Countdown";
const url = "http//localhost:3000/Openai/";
export default function InterviewComponent() {
  const { section } = useParams();
  useEffect(() => {
    fetch(`url${section}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h1>interview Dashboard</h1>
        <div>
          <Countdown />
        </div>

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={startListening} className="btn">
            Start Listening
          </button>
          <button onClick={SpeechRecognition.stopListening} className="btn">
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
}
