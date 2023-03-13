/* eslint-disable */
import React, { useState, useEffect, useReducer } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import InputText from "./components/inputText/InputText";
import { Routes, Route } from "react-router-dom";
import Onboard from "./pages/onboard/Onboard";
import SingleNote from "./pages/singleNote/SingleNote";
import { useNavigate } from "react-router-dom";
export const StateContext = React.createContext();

const initialState = {
  currMessages: [], //object of arrays
  noteBooks: [],
  currentNoteBook: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTEBOOK":
      const newState = {
        ...state,
        noteBooks: [...state.noteBooks, action.payload],
      };
      pushData(newState);
      return newState;
    case "SET_CURRENT_NOTEBOOK":
      const newState2 = {
        ...state,
        currentNoteBook: action.payload,
      };
      pushData(newState2);
      return newState2;
    case "CURR_MESSAGES":
      const newState3 = {
        ...state,
        currMessages: action.payload,
      };
      pushData(newState3);
      return newState3;
    case "SET_GLOBAL_STATE":
      return action.payload;
    default:
      return state;
  }
};

function pushData(state) {
  localStorage.setItem("globalState", JSON.stringify(state));
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const data = localStorage.getItem("globalState");
    if (data) {
      dispatch({ type: "SET_GLOBAL_STATE", payload: JSON.parse(data) });
    }
    if(localStorage.getItem("globalState") == undefined) {
      navigate("/");
    }else{
      navigate("/note");
    }

  }, []);


  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <Sidebar open={open} setOpen={setOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="chat_panel">
                <Topbar open={open} setOpen={setOpen} />
                <Onboard />
              </div>
            }
          ></Route>
          <Route
            path="/note"
            element={
              <div className="chat_panel">
                <Topbar open={open} setOpen={setOpen} />
                <SingleNote />
                <InputText />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </StateContext.Provider>
  );
}

export default App;
