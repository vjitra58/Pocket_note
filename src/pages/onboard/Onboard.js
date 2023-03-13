import React from 'react'
import styles from "./styles.module.css";


const Onboard = () => {
  return (
    <div className={styles.container}>
      <div>
        <p id="create">Create.</p>
        <p id="organize">Organize.</p>
        <p id="extra">Your Notes.</p>
      </div>
      <p>
        Get Started By clicking on the <span>create Note</span> button
      </p>
    </div>
  );
}

export default Onboard