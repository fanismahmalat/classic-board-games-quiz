import React from "react";
import { QuestionTypes } from "../context.globals";

// Context
import { AppContext } from "../context/AppContext";

const useValidateAnswer = (): [() => boolean, number, boolean] => {
  const {
    state: { activeQuestion, selectedAnswers, questions },
  } = React.useContext(AppContext);

  const currentQuestion = questions[activeQuestion];
  let selectionError = false;

  if (
    selectedAnswers === null ||
    (Array.isArray(selectedAnswers) && selectedAnswers.length <= 0)
  ) {
    selectionError = true;
  }

  const validateAnswer = (): boolean => {
    let validation = false;

    if (
      currentQuestion.question_type === QuestionTypes.Single ||
      currentQuestion.question_type === QuestionTypes.Boolean
    ) {
      if (currentQuestion.correct_answer === selectedAnswers) {
        validation = true;
      }
    } else if (
      currentQuestion.question_type === QuestionTypes.Multiple &&
      Array.isArray(currentQuestion.correct_answer) &&
      Array.isArray(selectedAnswers)
    ) {
      if (
        currentQuestion.correct_answer.length === selectedAnswers.length &&
        currentQuestion.correct_answer.every((answer) =>
          selectedAnswers.includes(answer)
        )
      ) {
        validation = true;
      }
    }

    return validation;
  };

  return [validateAnswer, currentQuestion.points, selectionError];
};

export default useValidateAnswer;
