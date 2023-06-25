import React, { useState, useEffect } from "react";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ObjectiveQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { section } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const url = "http://localhost:3000/Openai/objective/" + `${section}`;
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(url,{
      headers: { 'Content-Type': 'application/json', Authorization:`Bearer ${token}`}
    });
    const rawData = await response.json();

    let tempQuestions = [];
    let tempOptions = [];
    let tempAnswers = [];
    let currentOptions = [];
    let currentQuestion = "";

    rawData.forEach((item, index) => {
      if (item.startsWith("Correct option")) {
        tempAnswers.push(item.replace("Correct option: ", "").trim());
        tempOptions.push(currentOptions);
        tempQuestions.push(currentQuestion.trim());
        currentOptions = [];
        currentQuestion = "";
      } else if (item.trim() !== "") {
        if (
          item.startsWith("A)") ||
          item.startsWith("B)") ||
          item.startsWith("C)") ||
          item.startsWith("D)")
        ) {
          currentOptions.push(item.trim());
        } else {
          currentQuestion += " " + item.trim();
        }
      }
    });

    setQuestions(tempQuestions);
    setOptions(tempOptions);
    setCorrectAnswers(tempAnswers);
    setSelectedAnswers(Array(tempQuestions.length).fill(null));

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = options[questionIndex][optionIndex];
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    selectedAnswers.forEach((selectedAnswer, index) => {
      if (selectedAnswer === correctAnswers[index]) {
        score++;
      }
    });

    alert(`Your score is: ${score} out of ${questions.length}`);
    navigate(`/interview/${section}`, { replace: true });
  };

  return (
    <div className="p-4 md:p-10  flex items-center justify-center">
      <div className="max-w-2xl w-full  rounded-lg p-6">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-gray-700 mr-4">Loading Questions...</p>
            <Rings
              height={80}
              width={80}
              color="#4fa94d"
              radius={6}
              visible={true}
              ariaLabel="rings-loading"
            />
          </div>
        ) : (
          <>
            <div>
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-4">
                  <h2 className="text-lg mb-2 font-medium text-blue-700">
                    {question}
                  </h2>
                  {options[questionIndex]?.map((option, optionIndex) => (
                    <div key={optionIndex} className="mb-2">
                      <label
                        htmlFor={`question-${questionIndex}-option-${optionIndex}`}
                        className="inline-flex items-center cursor-pointer text-sm text-gray-700"
                      >
                        <input
                          id={`question-${questionIndex}-option-${optionIndex}`}
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={option}
                          className="form-radio mr-2 text-blue-500"
                          onChange={() =>
                            handleAnswerChange(questionIndex, optionIndex)
                          }
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <button
                onClick={handleSubmit}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ObjectiveQuestions;
