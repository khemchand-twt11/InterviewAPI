import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { BsFillPauseCircleFill, BsFillSendCheckFill } from "react-icons/bs";
import { VscDebugContinue } from "react-icons/vsc";
import { VscDebugStart } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../App.css";
import Countdown from "./Countdown";
import Camerafeed from "./Camerafeed";
// const url = "https://excited-nightshirt-hen.cyclic.app/Openai/";
const url = "https://worried-boa-capris.cyclic.app/Openai/";
import ScreenShare from "./ScreenShare";
const fetchData = async (url, param) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await fetch(`${url}${param}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
  const navigate = useNavigate();
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
      if (data) {
        setQuestions(data);
        setSolutions(new Array(data.length).fill(false));
        setHasSubmitted(new Array(data.length).fill(false));
        setLoading(false);
      }
    }
    result();
  }, []);

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
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
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
  };
  const handleToastClose = () => {
    navigate("/dashboard");
  };
  const handleContinue = () => {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
      setFeedback("");
      resetTranscript();
      setLocalTranscript("");
    } else {
      toast.info("Thank You", {
        position: toast.POSITION.TOP_CENTER,
        onClose: handleToastClose,
      });
    }
  };

  const handleLocalTranscript = (e) => {
    setLocalTranscript(e.target.value);
  };

  return (
    <>
      {/* <ScreenShare /> */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
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
        <div className="w-[98%] h-screen mx-auto">
          <h1 className="text-center text-2xl">interview Dashboard</h1>

          <div>
            <div className="flex justify-end">
              <Countdown key={questionNumber} handleSubmit={handleSubmit} />
            </div>

            <div className="flex">
              <div className="grow rounded h-[70vh]">
                <Camerafeed />

                <div className="btn-style flex items-center">
                  {startOrPause ? (
                    <button
                      onClick={startListening}
                      className="btn flex items-center gap-2"
                    >
                      <span>
                        <VscDebugStart size={20} color="white" />
                      </span>
                      Start
                    </button>
                  ) : (
                    <button
                      onClick={handleStop}
                      className="btn flex items-center gap-2"
                    >
                      <span>
                        <BsFillPauseCircleFill size={20} color="white" />
                      </span>
                      Pause
                    </button>
                  )}

                  {!hasSubmitted[questionNumber] ? (
                    <button
                      className="btn flex items-center gap-2"
                      onClick={handleSubmit}
                    >
                      <span>
                        <BsFillSendCheckFill size={18} color="white" />
                      </span>
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={handleContinue}
                      className="btn flex items-center gap-2"
                    >
                      <span>
                        <VscDebugContinue size={20} color="white" />
                      </span>
                      Continue
                    </button>
                  )}
                </div>
              </div>
              <div className="w-2/5  shadow-xl">
                <div>
                  <h1 className="text-2xl font-bold p-4">
                    {questions[questionNumber]}
                  </h1>
                </div>
                <div
                  ref={divRef}
                  className="h-[50vh] border-blue-500 overflow-y-auto"
                >
                  <textarea
                    cols="30"
                    rows="5"
                    className="w-[100%] h-[100%] outline-none p-4 text-lg"
                    value={transcript}
                    onChange={(e) => handleLocalTranscript(e)}
                  >
                    {transcript}
                  </textarea>
                </div>
                <div
                  className="h-[25vh] border-rose-500 bg-slate-300"
                  style={{ paddingLeft: "40px" }}
                >
                  feedback :
                  <div
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {feedback}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
