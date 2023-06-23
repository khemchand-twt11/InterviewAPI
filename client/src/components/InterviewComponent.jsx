import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../App.css";
import Countdown from "./Countdown";
const url = "http://localhost:3000/Openai/";

const fetchData = async (url, param) => {
  try {
    const res = await fetch(`${url}${param}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default function InterviewComponent() {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const divRef = useRef(null);
  const [startOrPause, setstartOrPause] = useState(true);
  const [submit, setSubmit] = useState(true);
  const { section } = useParams();
  useEffect(() => {
    async function result() {
      const data = await fetchData(url, section);
      setQuestions(data);
    }
    result();
  }, []);

  const handleSubmit = () => {
    const obj = {
      Question: questions[questionNumber],
      Answer: transcript,
    };
    fetch(`${url}feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSubmit(!submit);
      });
  };

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [transcript]);

  const startListening = () => {
    setstartOrPause(!startOrPause);
    return SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setstartOrPause(!startOrPause);
  };
  return (
    <>
      <div className="w-95" style={{ width: "98%", marginInline: "auto" }}>
        <h1>interview Dashboard</h1>
        <div className="flex justify-end">
          <Countdown handleSubmit={handleSubmit} />
        </div>
        <h1>{questions[0]}</h1>

        <div className="flex gap-8">
          <div className="grow border-2 border-sky-500 h-[70vh]">video div</div>
          <div className="w-2/5 border-2 border-indigo-500">
            <div
              ref={divRef}
              className="h-[45vh] border-blue-500 overflow-y-auto"
            >
              {transcript}
            </div>
            <div className="h-[25vh] border-rose-500 bg-slate-300">
              feedback div
            </div>
          </div>
        </div>

        <div className="btn-style">
          {startOrPause ? (
            <button onClick={startListening} className="btn">
              Start
            </button>
          ) : (
            <button onClick={handleStop} className="btn">
              Pause
            </button>
          )}

          {submit ? (
            <button className="btn" onClick={handleSubmit}>
              submit
            </button>
          ) : (
            <button onClick={() => setSubmit(!submit)}>Continue</button>
          )}
        </div>
      </div>
    </>
  );
}
