import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../App.css";
import Countdown from "./Countdown";
import Camerafeed from "./Camerafeed";
const url = "https://excited-nightshirt-hen.cyclic.app/Openai/";

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
  const [loading, setLoading] = useState(true);
  const [solutions, setSolutions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [startOrPause, setstartOrPause] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState([]);
  const divRef = useRef(null);
  const [feedback, setFeedback] = useState("");
  const [localTranscript, setLocalTranscript] = useState("");
  const [lastTranscript, setLastTranscript] = useState("");

  const { section } = useParams();
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    async function result() {
      const data = await fetchData(url, section);
      console.log(data);
      setQuestions(data);
      setSolutions(new Array(data.length).fill(false));
      setHasSubmitted(new Array(data.length).fill(false));
      setLoading(false);
    }
    result();
  }, []);

  useEffect(() => {
    if (transcript !== lastTranscript) {
      setLocalTranscript(
        (prevTranscript) =>
          prevTranscript + " " + transcript.slice(lastTranscript.length).trim()
      );
      setLastTranscript(transcript);
    }
  }, [transcript]);

  const handleSubmit = () => {
    if (hasSubmitted[questionNumber]) return;

    const obj = {
      Question: questions[questionNumber],
      Answer: localTranscript,
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
        setFeedback(data.content);

        const newHasSubmitted = [...hasSubmitted];
        newHasSubmitted[questionNumber] = true;
        setHasSubmitted(newHasSubmitted);
      })
      .finally(() => {
        if (!listening) {
          resetTranscript();
          setLocalTranscript("");
          setLastTranscript("");
        }
      });
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  useEffect(() => {
    if (divRef.current) divRef.current.scrollTop = divRef.current?.scrollHeight;
    console.log("localTranscript", localTranscript);
  }, [localTranscript]);

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
    setLastTranscript("");
  };

  const handleContinue = () => {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
      setFeedback("");
      resetTranscript();
      setLocalTranscript("");
      setLastTranscript("");
    }
  };

  const handleLocalTranscript = (e) => {
    setLocalTranscript(e.target.value);
    setLastTranscript("");
  };

  return (
    <>
      {loading ? (
        <div>
          <Rings
            height="80"
            width="80"
            color="#4fa94d"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <div className="w-95" style={{ width: "98%", marginInline: "auto" }}>
          <h1>interview Dashboard</h1>
          <div className="flex justify-end">
            <Countdown key={questionNumber} handleSubmit={handleSubmit} />
          </div>
          <h1>{questions[questionNumber]}</h1>

          <div className="flex gap-8">
            <div className="grow border-2 border-sky-500 h-[70vh]">
              <Camerafeed />
            </div>
            <div className="w-2/5 border-2 border-indigo-500">
              <div
                ref={divRef}
                className="h-[45vh] border-blue-500 overflow-y-auto"
              >
                <textarea
                  cols="30"
                  rows="5"
                  className="w-[100%] h-[100%] outline-none p-4"
                  value={localTranscript}
                  onChange={(e) => handleLocalTranscript(e)}
                >
                  {localTranscript}
                </textarea>
              </div>
              <div
                className="h-[25vh] border-rose-500 bg-slate-300"
                style={{ paddingLeft: "40px" }}
              >
                feedback
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {feedback}
                </h1>
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

            {!hasSubmitted[questionNumber] ? (
              <button className="btn" onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button onClick={handleContinue} className="btn">
                Continue
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
