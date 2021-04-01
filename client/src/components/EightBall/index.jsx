import React from 'react';
import styles from './EightBall.css';

class EightBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.openModal();
  }

  render() {
    return (
      <div className={styles.gifContainer}>
        <img className={styles.eightBall} id="background" src="/gif/Magic8BallGIF.gif"/>
        <div onClick={this.handleClick} className={styles.transparentEightBall}></div>
      </div>
    )
  }
}


export default EightBall;
