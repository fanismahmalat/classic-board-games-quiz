import { QuestionTypes, ActionTypes } from "./enums";

export interface PossibleAnswer {
  a_id: number;
  caption: string;
}

export interface Question {
  q_id: number;
  title: string;
  img: string;
  question_type: QuestionTypes;
  possible_answers?: PossibleAnswer[];
  correct_answer: number[] | number | boolean;
  points: number;
}

interface Result {
  r_id: number;
  minpoints: number;
  maxpoints: number;
  title: string;
  message: string;
  img: string;
}

export interface State {
  showFinalResults: boolean;
  activeQuestion: number;
  selectedAnswers: number[] | number | boolean | null;
  loading: boolean;
  questions: Question[];
  results: Result[];
  pageTitle: string;
  pageDescription: string;
  message: string;
  score: number;
}

export interface SetShowFinalResults {
  type: ActionTypes.ShowFinalResults;
  payload: boolean;
}

export interface SetActiveQuestion {
  type: ActionTypes.ActiveQuestion;
  payload: number;
}

export interface SetSelectedAnswers {
  type: ActionTypes.SelectedAnswers;
  payload: number[] | number | boolean | null;
}

export interface SetMeta {
  type: ActionTypes.Meta;
  pageTitle: string;
  pageDescription: string;
}

export interface SetLoading {
  type: ActionTypes.Loading;
  payload: boolean;
}

export interface SetQuestions {
  type: ActionTypes.Questions;
  payload: Question[];
}

export interface SetResults {
  type: ActionTypes.Results;
  payload: Result[];
}

export interface SetMessage {
  type: ActionTypes.Message;
  payload: string;
}

export interface SetScore {
  type: ActionTypes.Score;
  payload: number;
}
