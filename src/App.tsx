import React from "react";
import "./App.css";

// Context
import { AppContext, initialState, AppReducer } from "./context/AppContext";

// Components
import Results from "./components/Results";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Content from "./components/Content";

import { ActionTypes } from "./context/enums";

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  React.useEffect(() => {
    const getQuestions = fetch(
      "https://proto.io/en/jobs/candidate-exercise/quiz.json"
    );
    const getResults = fetch(
      "https://proto.io/en/jobs/candidate-exercise/result.json"
    );

    Promise.all([getQuestions, getResults])
      .then((res) => {
        res.forEach((r) => {
          if (r.status !== 200) {
            throw new Error("Error loading questions.");
          }
        });

        // Get JSON from responses
        return Promise.all(res.map((res) => res.json()));
      })
      .then((data) => {
        // Set state
        dispatch({
          type: ActionTypes.Meta,
          pageTitle: data[0].title,
          pageDescription: data[0].description,
        });

        dispatch({
          type: ActionTypes.Questions,
          payload: data[0].questions,
        });

        dispatch({
          type: ActionTypes.Results,
          payload: data[1].results,
        });

        // // Add submit button listener
        // setView();
        // submitListener();
      })
      .then(() => {
        dispatch({
          type: ActionTypes.Loading,
          payload: false,
        });
      })
      .catch((error) => {
        throw new Error(`Error loading data. Try again later. ${error}`);
      });
  }, []);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="content">
        <Header />
        {state.showFinalResults ? <Results /> : <Content />}
      </div>
    </AppContext.Provider>
  );
};

export default App;
