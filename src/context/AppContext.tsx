import React from "react";

import { ActionTypes } from "./enums";
import { State } from "./interfaces";
import { Actions } from "./types";

export const initialState: State = {
  showFinalResults: false,
  activeQuestion: 0,
  selectedAnswers: null,
  loading: true,
  questions: [],
  results: [],
  pageTitle: "",
  pageDescription: "",
  message: "",
  score: 0,
};

export const AppContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const AppReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ShowFinalResults:
      return {
        ...state,
        showFinalResults: action.payload,
      };
    case ActionTypes.ActiveQuestion:
      return {
        ...state,
        activeQuestion: action.payload,
      };
    case ActionTypes.SelectedAnswers:
      return {
        ...state,
        selectedAnswers: action.payload,
      };
    case ActionTypes.Meta:
      return {
        ...state,
        pageTitle: action.pageTitle,
        pageDescription: action.pageDescription,
      };
    case ActionTypes.Loading:
      return {
        ...state,
        loading: action.payload,
      };
    case ActionTypes.Questions:
      return {
        ...state,
        questions: action.payload,
      };
    case ActionTypes.Results:
      return {
        ...state,
        results: action.payload,
      };
    case ActionTypes.Message:
      return {
        ...state,
        message: action.payload,
      };
    case ActionTypes.Score:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};
