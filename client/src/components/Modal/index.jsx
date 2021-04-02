import React from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from './Modal.css';
import Memes from '../Memes';

const Modal = (props) => {
  const {
    closeModal,
    currentMeme,
    currentMemeDescription,
    displayArrows,
    currentIndex,
    previousMeme,
    nextMeme,
  } = props;

  let leftArrow;
  let rightArrow;
  if (currentIndex > 0 && displayArrows === true) {
    leftArrow = <IoIosArrowBack className={styles.leftButton} size="40" color="#66FCF1" onClick={previousMeme} />;
  }
  if (displayArrows === true) {
    rightArrow = <IoIosArrowForward className={styles.rightButton} size="40" color="#66FCF1" onClick={nextMeme} />;
  }

  return (
    <div className={styles.modal}>
      <VscChromeClose className={styles.closeIcon} onClick={closeModal} size="30" color="#66FCF1" />
      <div className={styles.modalContents}>
        {leftArrow}
        <Memes
          currentMeme={currentMeme}
          currentMemeDescription={currentMemeDescription}
        />
        {rightArrow}
      </div>
    </div>
  );
};

export default Modal;
