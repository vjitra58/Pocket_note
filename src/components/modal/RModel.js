import React, { useState, useRef, useContext} from 'react'
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.css";
import { StateContext } from "../../App.js";
import { useNavigate } from 'react-router-dom';

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    border: "1px solid #ccc",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const RModel = ({isopen, setIsOpen}) => {
  const navigate = useNavigate();
  const stateContext = useContext(StateContext);
  const {state, dispatch} = stateContext;
  const {currentNoteBook} = state;
  const [name, setName] = useState("");
  const [color, setColor] = useState("#B38BFA");

  const colorRef = useRef(null);

  const handleColor = (e) => {
    const c = e.target.getAttribute("value");
    setColor(c);
    if(colorRef.current){
      colorRef.current.style.border = "none";
    }
    colorRef.current = e.target;
    colorRef.current.style.border = "2px solid #000";
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(name.length < 2){
      alert("Group name should be greater than 2");
      return;
    }
    const _id = Date.now();
    const data = {
      id:_id,
      name,
      color
    }
    //create the notebook using the data in the local storage;
    localStorage.setItem(_id, JSON.stringify([]));
    await dispatch({
      type: "ADD_NOTEBOOK",
      payload: data,
      id : _id
    })
    await dispatch({
      type: "SET_CURRENT_NOTEBOOK",
      payload: data,
    });
    await dispatch({
      type: "CURR_MESSAGES",
      payload: [],
    });
    setIsOpen(false);
    navigate("/note");
  }

  return (
    <Modal
      isOpen={isopen}
      contentLabel="Example Modal"
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className={styles.modal}>
        <div className={styles.heading}>
          <span>Create New Notes</span>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className={styles.element}>
          <span>Group Name</span>
          <input
            placeholder="Enter your group name...."
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles.element}>
          <span>Choose Color</span>
          <span className={styles.colors}>
            <div
              key={1}
              onClick={handleColor}
              style={{ "--c": "#B38BFA" }}
              value="#B38BFA"
            ></div>
            <div
              key={2}
              onClick={handleColor}
              style={{ "--c": "#FF79F2" }}
              value="#FF79F2"
            ></div>
            <div
              key={3}
              onClick={handleColor}
              style={{ "--c": "#43E6FC" }}
              value="#43E6FC"
            ></div>
            <div
              key={4}
              onClick={handleColor}
              style={{ "--c": "#F19576" }}
              value="#F19576"
            ></div>
            <div
              key={5}
              onClick={handleColor}
              style={{ "--c": "#0047FF" }}
              value="#0047FF"
            ></div>
            <div
              key={6}
              onClick={handleColor}
              style={{ "--c": "#6691FF" }}
              value="#6691FF"
            ></div>
          </span>
        </div>
        <div className={styles.create}>
          <button onClick={handleSubmit}>create</button>
        </div>
      </div>
    </Modal>
  );
}

export default RModel