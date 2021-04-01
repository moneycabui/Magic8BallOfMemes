import React from 'react';
import axios from 'axios';
import styles from './App.css';
import EightBall from '../EightBall';
import Modal from '../Modal';
import { IoHeart } from "react-icons/io5";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      openCloseCount: 0,
      currentMeme: '',
      currentMemeDescription: '',
      trendingMemes: [],
    }
    this.getMeme = this.getMeme.bind(this);
    // this.getTrendingMemes = this.getTrendingMemes.bind(this);
    this.handleTrendingClick = this.handleTrendingClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getMeme();
    // this.getTrendingMemes()
  }

  // componentDidUpdate() {
  //   const { openCloseCount } = this.state;
  //   if (openCloseCount % 2 === 0 && openCloseCount !==0) {
  //     this.getMeme();
  //   }
  // }

  getMeme() {
    axios.get('/answer')
      .then((response) => {
        let randomIndex = Math.floor(Math.random() * 10);
        const memeURL = response.data.data[randomIndex].images.original.url;
        const memeDescription = response.data.data[randomIndex].title;
        this.setState({
          currentMeme: memeURL,
          currentMemeDescription: memeDescription,
        });
      })
      .catch((error) => {
        console.log('Error fetching memes: ', error);
      })
  }

  // getTrendingMemes() {
  //   axios.get('/trending')
  //     .then((response) => {
  //       const memes = response.data;
  //       this.setState({ trendingMemes: memes })
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching trending memes: ', error);
  //     })
  // }


  handleTrendingClick() {
    console.log('Trending Click');
  }

  handleSearchClick() {
    console.log('Search Click')
  }

  toggleModal() {
    let clickCount = this.state.openCloseCount + 1;
    this.setState({
      displayModal: !this.state.displayModal,
      openCloseCount: clickCount
    });
  }

  render() {
    const {
      displayModal,
      currentMeme,
      currentMemeDescription,
      trendingMemes,
    } = this.state;

    let memesRender;
    if (displayModal === true) {
      memesRender = (
        <Modal
          toggleModal={this.toggleModal}
          currentMeme={currentMeme}
          currentMemeDescription={currentMemeDescription}
          trendingMemes={trendingMemes}
        />
      )
    }

    return (
      <div className={styles.app}>
        <EightBall toggleModal={this.toggleModal} />
        {memesRender}
        <br/>
        <div className={styles.headersAndButtonsContainer}>
          <div>
            <h2>Magic 8 Ball</h2>
            <h3>- Ask a yes or no question - then click the ball to reveal answer -</h3>
            <br/>
          </div>
          <div>
            {/* <button className={styles.heartButton} > */}
              {/* <IoHeart /> */}
            {/* </button> */}
            <button className={styles.trendingButton} onClick={this.handleTrendingClick}>Trending Memes</button>
            <button className={styles.searchButton} onClick={this.handleSearchClick}>Search Memes</button>
            {/* <button className={styles.favoritedButton}>Favorited Memes</button> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App;