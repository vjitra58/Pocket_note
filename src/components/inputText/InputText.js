import React, {useState, useContext} from 'react'
import styles from "./InputText.module.css";
import SendIcon from "@mui/icons-material/Send";
import { StateContext } from "../../App.js";

const monthMap = new Map([
  [0, "Jan"],
  [1, "Feb"],
  [2, "Mar"],
  [3, "Apr"],
  [4, "May"],
  [5, "Jun"],
  [6, "Jul"],
  [7, "Aug"],
  [8, "Sep"],
  [9, "Oct"],
  [10, "Nov"],
  [11, "Dec"],
])



const InputText = () => {
  const stateContext = useContext(StateContext);
  const {state, dispatch} = stateContext;
  const {currentNoteBook} = state;

  const [text, setText] = useState("");
  

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("submitting the text");
    const date = new Date();
    const d = `${date.getDate()} ${monthMap.get(
      date.getMonth()
    )} ${date.getFullYear()}`;
    const t = `${date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}`;
    const data = {
      text: text,
      date: d,
      time: t,
    }
    //storing the message in corrosponding notebook
    const messages = await JSON.parse(localStorage.getItem(currentNoteBook.id));
    localStorage.setItem(
      currentNoteBook.id,
      JSON.stringify([...messages, data])
    );
    await dispatch({
      type: "CURR_MESSAGES",
      payload: [...messages, data]
    });
    console.log(data , "added");
    setText("");
  }

  return (
    <div className={styles.container}>
      <textarea
        className={styles.text}
        type="text"
        placeholder="Enter your text here..........."
        value={text}
        onChange={handleChange}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
      ></textarea>

      <div onClick={handleSubmit} className={styles.send}>
        {" "}
        <SendIcon />
      </div>
    </div>
  );
}

export default InputText