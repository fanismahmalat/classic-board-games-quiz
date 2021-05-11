export interface PossibleAnswer {
  a_id: number;
  caption: string;
}

export enum QuestionTypes {
  Single = "multiplechoice-single",
  Multiple = "multiplechoice-multiple",
  Boolean = "truefalse",
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
  activeQuestion: number;
  selectedAnswers: number[] | number | boolean | null;
  correctAnswer: number[] | number | boolean | null;
  loading: boolean;
  questions: Question[];
  results: Result[];
  pageTitle: string;
  pageDescription: string;
  message: string;
  score: number;
}

export enum ActionTypes {
  SelectedAnswers,
  CorrectAnswers,
  Meta,
  Loading,
  Questions,
  Results,
  Message,
  Score,
}

export interface SetSelectedAnswers {
  type: ActionTypes.SelectedAnswers;
  payload: number[] | number | boolean;
}

export interface SetCorrectAnswers {
  type: ActionTypes.CorrectAnswers;
  payload: number[] | number | boolean;
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

export type Actions =
  | SetSelectedAnswers
  | SetCorrectAnswers
  | SetMeta
  | SetLoading
  | SetQuestions
  | SetResults
  | SetMessage
  | SetScore;
