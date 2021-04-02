import React from 'react';
import styles from './Memes.css';


const Memes = ({ currentMeme, currentMemeDescription, currentMemeType }) => {

  return (
    <div>
      <div className={styles.memeContainer}>
        <img className={styles.currentMeme} src={currentMeme} alt={currentMemeDescription} width='100' height='100'></img>
      </div>
    </div>
  );
};

export default Memes;