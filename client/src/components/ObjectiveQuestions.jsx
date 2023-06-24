// QuizComponent.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchData = async () => {
    const url = "http://localhost:3000/Openai/objective/javascript";
    const response = await fetch(url);
    const rawData = await response.json();
    console.log(rawData);

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

    setLoading(false); // Stop loading after data is fetched
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
  };

  return (
    <div className="p-4 md:p-10 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow rounded p-6">
        {loading ? (
          <p class="capitalize ... flex space-x-4 ...">
           <span>Wait for the Quesitons</span>
            <span>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="fa-spin-reverse"
              />
            </span>
          </p>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
