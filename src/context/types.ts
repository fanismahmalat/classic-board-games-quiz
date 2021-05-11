import {
  SetShowFinalResults,
  SetActiveQuestion,
  SetSelectedAnswers,
  SetMeta,
  SetLoading,
  SetQuestions,
  SetResults,
  SetMessage,
  SetScore,
} from "./interfaces";

export type Actions =
  | SetShowFinalResults
  | SetActiveQuestion
  | SetSelectedAnswers
  | SetMeta
  | SetLoading
  | SetQuestions
  | SetResults
  | SetMessage
  | SetScore;
