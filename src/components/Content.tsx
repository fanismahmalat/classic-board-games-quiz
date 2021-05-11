import React from "react";

// Components
import Nav from "./Nav";
import Question from "./Question";

const QuestionWrapper: React.FC = () => {
  return (
    <form id="form">
      <Question />
      <Nav />
    </form>
  );
};

export default QuestionWrapper;
