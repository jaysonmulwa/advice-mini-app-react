import { useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],

  //"loading", "error", "ready", "active", "finished"
  status: "loading",

  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, actions) {
  switch (actions.type) {
    case "dataReceived":
      return { ...state, questions: actions.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: actions.payload,
        points:
          actions.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finsih":
      return {
        ...state,
        status: "finished",
      };

    default:
      throw new Error("UNKOWN_ACTION");
  }
}

function App() {
  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  ); //function and initial state
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={points} totalPoints={totalPoints} />
        )}
      </Main>
    </div>
  );
}

export default App;
