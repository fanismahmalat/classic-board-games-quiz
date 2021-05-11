import React from "react";

// Context
import { AppContext } from "../context/AppContext";
import useRetry from "../hooks/useRetry";

interface IState {
  scorePercentage: number;
  title: string;
  message: string;
  img: string;
}

export const Results: React.FC = () => {
  const {
    state: { score, questions, results },
  } = React.useContext(AppContext);

  const handleRetry = useRetry();

  const [state, setState] = React.useState<IState>({
    scorePercentage: 0,
    title: "",
    message: "",
    img: "",
  });

  const calculateQuestionsTotalScore = React.useCallback(() => {
    let total = 0;

    questions.forEach((question) => {
      total += question.points;
    });

    return total;
  }, [questions]);

  React.useEffect(() => {
    const scorePercentage = (score * 100) / calculateQuestionsTotalScore();

    const result = results.find(
      (result) =>
        scorePercentage >= result.minpoints &&
        scorePercentage <= result.maxpoints
    );

    if (result) {
      setState({
        scorePercentage,
        title: result.title,
        message: result.message,
        img: result.img,
      });
    } else {
      throw new Error("Result not found. Try again later.");
    }
  }, [calculateQuestionsTotalScore, results, score]);

  return (
    <div id="final-result">
      <img alt="Result" className="r-image" src={state.img} />

      <div className="right-col">
        <h2 className="r-title">{state.title}</h2>
        <p className="r-message">{state.message}</p>
        <span className="r-score">{state.scorePercentage}%</span>
        <button id="reset" className="btn" onClick={handleRetry}>
          Retry the quiz!
        </button>
      </div>
    </div>
  );
};

export default Results;
