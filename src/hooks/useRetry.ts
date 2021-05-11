import React from "react";

// Context
import { AppContext } from "../context/AppContext";
import { ActionTypes } from "../context/enums";

const useRetry = (): (() => void) => {
  const { dispatch } = React.useContext(AppContext);

  const handleRetry = () => {
    dispatch({
      type: ActionTypes.Score,
      payload: 0,
    });
    dispatch({
      type: ActionTypes.ActiveQuestion,
      payload: 0,
    });
    dispatch({
      type: ActionTypes.SelectedAnswers,
      payload: null,
    });
    dispatch({
      type: ActionTypes.ShowFinalResults,
      payload: false,
    });
  };

  return handleRetry;
};

export default useRetry;
