import React from "react";

import useValidateAnswer from "./useValidateAnswer";

// Context
import { AppContext } from "../context/AppContext";
import { ActionTypes } from "../context/enums";

const useButtonClick = (
  messageRef: React.RefObject<HTMLSpanElement>
): ((e: React.MouseEvent<HTMLButtonElement>) => void) => {
  const {
    state: { score, activeQuestion, questions, showFinalResults },
    dispatch,
  } = React.useContext(AppContext);

  const [validateAnswer, points, selectionError] = useValidateAnswer();

  const setMessage = (text: string) => {
    dispatch({
      type: ActionTypes.Message,
      payload: text,
    });
  };

  const incrementScore = (points: number) => {
    dispatch({
      type: ActionTypes.Score,
      payload: score + points,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectionError) {
      messageRef.current!.style.color = "inherit";
      return setMessage("Please select an answer!");
    }

    const button = e.currentTarget;
    button.disabled = true;

    const isCorrect = validateAnswer();

    incrementScore(isCorrect ? points : 0);

    messageRef.current!.style.color = isCorrect ? "green" : "red";

    setMessage(isCorrect ? "Correct!" : "Wrong!");

    setTimeout(() => {
      messageRef.current!.style.color = "inherit";
      setMessage("");
      button.disabled = false;

      dispatch({
        type: ActionTypes.SelectedAnswers,
        payload: null,
      });

      if (activeQuestion !== questions.length - 1) {
        dispatch({
          type: ActionTypes.ActiveQuestion,
          payload: activeQuestion + 1,
        });
      } else {
        dispatch({
          type: ActionTypes.ShowFinalResults,
          payload: !showFinalResults,
        });
      }
    }, 3000);
  };

  return handleClick;
};

export default useButtonClick;
