import React, {useContext, useEffect, useRef} from 'react'
import styles from "./Topbar.module.css";
import { StateContext } from "../../App.js";
import MenuIcon from "@mui/icons-material/Menu";

const Topbar = ({ open, setOpen }) => {
  const stateContext = useContext(StateContext);
  const { state, dispatch } = stateContext;
  const { currentNoteBook } = state;
 
  return (
    <div className={styles.container}>
      {!open ? (
        <div style={{ margin: "0px 10px" }} onClick={() => setOpen(true)}>
          <MenuIcon  />
        </div>
      ) : (
        <></>
      )}

      <h2 style={{ "--bc": currentNoteBook?.color }}>
        {currentNoteBook?.name?.substring(0, 2).toUpperCase()}
      </h2>
      <p>{currentNoteBook?.name}</p>
    </div>
  );
};

export default Topbar