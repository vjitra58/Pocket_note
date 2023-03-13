import React, {useState, useRef, useEffect, useContext} from 'react'
import styles from "./Sidebar.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddIcon from "@mui/icons-material/Add";
import RModel from '../modal/RModel';
import { StateContext } from '../../App';
import CloseIcon from "@mui/icons-material/Close";


const Sidebar = ({open, setOpen}) => {
  const stateContext = useContext(StateContext);
  const {state, dispatch} = stateContext;
  const {currentNoteBook} = state;
  const [isopen, setIsOpen] = useState(false);
  const { noteBooks} = state;

  const noteBookRef = useRef(null);

  useEffect(()=>{
    async function setValue(){
      if (noteBooks.length === 0) return;
      if (noteBookRef.current) {
        noteBookRef.current.classList.remove(styles.active);
        const _id = noteBooks[noteBooks.length - 1].id;
        noteBookRef.current = document.querySelector(
          `[id="${_id}"]`
        );
        noteBookRef.current.classList.add(styles.active);
        dispatch({
          type: "SET_CURRENT_NOTEBOOK",
          payload: noteBooks[noteBooks.length - 1],
        });
        const messages = JSON.parse(localStorage.getItem(_id));
        dispatch({
          type: "CURR_MESSAGES",
          patload: messages,
        });
      } else {
        const _id = noteBooks[0].id;
        noteBookRef.current = document.querySelector(
          `[id="${_id}"]`
        );
        noteBookRef.current.classList.add(styles.active);
        dispatch({
          type: "SET_CURRENT_NOTEBOOK",
          payload: noteBooks[0],
        });
        const messages = JSON.parse(localStorage.getItem(_id));
        dispatch({
          type: "CURR_MESSAGES",
          payload: messages,
        });
      }
    }
    setValue();
  }, [noteBooks]);

  const handleClick = async(e) =>{
    const id = e.target.getAttribute("id");
    const ele = document.querySelector(`.note[id="${id}"]`);

    const notebook = noteBooks.filter((note) => note.id == id);
    dispatch({
      type: "SET_CURRENT_NOTEBOOK",
      payload: notebook[0]
    })
    //setting currmessages
    const messages = await JSON.parse(localStorage.getItem(id));
    dispatch({
      type: "CURR_MESSAGES",
      payload: messages,
    });
    console.log(notebook);
    if(noteBookRef.current){
      noteBookRef.current.classList.remove(styles.active);
    }
    noteBookRef.current = e.target;
    noteBookRef.current.classList.add(styles.active);
  }

  const createNotePage = ()=>{
    setIsOpen(true);
    return;
  }

  if(open){
    return (
      <div className={styles.container}>
        <RModel isopen={isopen} setIsOpen={setIsOpen} />
        <div className={styles.heading}>
          <h3>Pocket Notes</h3>
          <div onClick={() => setOpen(false)}>
            <CloseIcon />
          </div>
        </div>
        <button onClick={createNotePage} id={styles.create}>
          <AddIcon />
          Create Notes
        </button>

        <div className={styles.noteContainer}>
          {noteBooks.map((notebook, ind) => {
            return (
              <div
                key={notebook.id}
                id={notebook.id}
                className={styles.note}
                onClick={handleClick}
              >
                <h1 style={{ "--bc": notebook.color }}>
                  {notebook.name.substring(0, 2).toUpperCase()}
                </h1>
                <p>{notebook.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }else{
    return <></>
  }
}

export default Sidebar