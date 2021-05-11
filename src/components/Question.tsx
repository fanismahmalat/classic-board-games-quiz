import React from "react";

// Components
import BooleanPossibleAnswers from "./BooleanPossibleAnswers";
import SingleMultiplePossibleAnswers from "./SingleMultiplePossibleAnswers";

// Context
import { QuestionTypes, ActionTypes } from "../context/enums";
import { AppContext } from "../context/AppContext";

const Question: React.FC = () => {
  const {
    state: { questions, activeQuestion },
    dispatch,
  } = React.useContext(AppContext);
  const currentQuestion = questions[activeQuestion];

  const renderPossibleAnswers = () => {
    //  Render possible answers for true/false questions
    if (
      currentQuestion.question_type === QuestionTypes.Boolean ||
      !currentQuestion.possible_answers
    ) {
      return <BooleanPossibleAnswers questionID={currentQuestion.q_id} />;
    }

    // Render answers for single/multiple choice questions
    return (
      <SingleMultiplePossibleAnswers
        possibleAnswers={currentQuestion.possible_answers}
        questionID={currentQuestion.q_id}
        questionType={currentQuestion.question_type}
      />
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected: number[] | number | boolean;
    const currentQuestion = questions[activeQuestion];
    const answer = e.target.getAttribute("data-answerid")!;

    switch (currentQuestion.question_type) {
      case QuestionTypes.Single:
        selected = +answer;
        break;
      case QuestionTypes.Multiple:
        const multipleChoiceInputs = e.target.parentElement!.parentElement!.getElementsByTagName(
          "input"
        );

        selected = [];

        for (let i = 0; i < multipleChoiceInputs.length; i++) {
          const input = multipleChoiceInputs[i];
          if (input.checked) {
            selected.push(+input.getAttribute("data-answerid")!);
          }
        }
        break;
      case QuestionTypes.Boolean:
        selected = answer === "true" ? true : false;
        break;
    }

    dispatch({
      type: ActionTypes.SelectedAnswers,
      payload: selected,
    });
  };

  return (
    <div
      key={currentQuestion.q_id}
      id={`q-${currentQuestion.q_id}`}
      className={`question active`}
    >
      <img className="q-image" alt="Question" src={currentQuestion.img} />
      <div className="right-col">
        <p className="q-title">{currentQuestion.title}</p>
        <div className="q-answers" onChange={handleChange}>
          {renderPossibleAnswers()}
        </div>
      </div>
    </div>
  );
};

export default Question;
