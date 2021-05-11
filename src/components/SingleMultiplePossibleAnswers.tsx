import React from "react";

import { PossibleAnswer, QuestionTypes } from "../context.globals";

interface IProps {
  possibleAnswers: PossibleAnswer[];
  questionID: number;
  questionType: QuestionTypes;
}

const SingleMultiplePossibleAnswers: React.FC<IProps> = ({
  possibleAnswers,
  questionID,
  questionType,
}) => {
  return (
    <>
      {possibleAnswers.map((answer) => (
        <div key={answer.a_id} className="answer">
          <input
            type={
              questionType === QuestionTypes.Single ||
              questionType === QuestionTypes.Boolean
                ? "radio"
                : "checkbox"
            }
            name={`q-${questionID}`}
            data-answerid={answer.a_id}
            id={`a-${answer.a_id}`}
          />
          <label htmlFor={`a-${answer.a_id}`}>{answer.caption}</label>
        </div>
      ))}
    </>
  );
};

export default SingleMultiplePossibleAnswers;
