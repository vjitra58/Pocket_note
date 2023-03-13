import React, {useEffect, useContext, useRef} from 'react'
import { StateContext } from '../../App'
import styles from "./styles.module.css";

const SingleNote = () => {
  const stateContext = useContext(StateContext);
  const {state, dispatch} = stateContext;
  const { currentNoteBook, currMessages } = state;
  const lastMessageRef = useRef(null);

  useEffect(() => {
    console.log("focussing ");
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currMessages])


  return (
    <div className={styles.container}>
      {currMessages?.map((message, ind) => {
        return (
          <div key={ind} className={styles.note}>
            <div className={styles.left}>
              <p>{message.time}</p>
              <p>{message.date}</p>
            </div>
            <p>{message.text}</p>
          </div>
        );
      })}
      <div ref={lastMessageRef} />
    </div>
  );
}

export default SingleNote