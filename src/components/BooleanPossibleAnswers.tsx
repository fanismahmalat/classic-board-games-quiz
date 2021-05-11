import React from "react";

interface BooleanPossibleAnswersProps {
  questionID: number;
}

const BooleanPossibleAnswers: React.FC<BooleanPossibleAnswersProps> = ({
  questionID,
}) => {
  return (
    <>
      <div className="answer">
        <input
          type="radio"
          name={`q-${questionID}`}
          id={`q-${questionID}-true`}
          data-answerid={true}
        />
        <label htmlFor={`q-${questionID}-true`}>True</label>
      </div>
      <div className="answer">
        <input
          type="radio"
          name={`q-${questionID}`}
          id={`q-${questionID}-false`}
          data-answerid={false}
        />
        <label htmlFor={`q-${questionID}-false`}>False</label>
      </div>
    </>
  );
};

export default BooleanPossibleAnswers;
