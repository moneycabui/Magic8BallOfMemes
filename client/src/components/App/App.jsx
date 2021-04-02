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
      trendingModal: false,
      currentMeme: '',
      currentMemeDescription: '',
      trendingMemes: [],
      currentTrendingIndex: -1,
      searchedMemes: [],
    }
    this.getMeme = this.getMeme.bind(this);
    // this.getTrendingMemes = this.getTrendingMemes.bind(this);
    this.handleTrendingClick = this.handleTrendingClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.previousMeme = this.previousMeme.bind(this);
    this.nextMeme = this.nextMeme.bind(this);
  }

  componentDidMount() {
    this.getMeme();
    this.getTrendingMemes();
  }

  // componentDidUpdate(prev) {
  //   const { openCloseCount } = this.state;
  //   const { openCloseCount: previousCount } = prev;
  //   if (openCloseCount !== previousCount && openCloseCount !== 0) {
  //     this.getMeme();
  //   }
  // }

  // Get request to retrieve 8 ball answer(s)
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

  // Get request to retrieve searched gif(s)/meme(s)
  getSearchedMemes(searchedKeyword) {
    let keyword = { keyword: searchedKeyword };
    axios.get('/searched', keyword)
      .then((response) => {
        const searched = response.data;
        this.setState({ searchedMemes: searched });
      })
      .catch((error) => {
        console.log('Error fetching searched memes: ', error);
      })
  }

  // Get requet to retrieve trending gif(s)/meme(s)
  getTrendingMemes() {
    axios.get('/trending')
      .then((response) => {
        const memes = response.data.data;
        console.log('Trending memes data: ', memes);
        this.setState({
          trendingMemes: memes,
        });
      })
      .catch((error) => {
        console.log('Error fetching trending memes: ', error);
      })
  }

  closeModal() {
    this.getMeme();
    this.setState({
      displayModal: false,
      trendingModal: false,
    });
    document.getElementById("background").style.filter = "none";
    document.getElementById("contents").style.filter = "none";
  }

  openModal() {
    this.setState({ displayModal: true });
    document.getElementById("background").style.filter = "blur(8px)";
    document.getElementById("contents").style.filter = "blur(8px)";
    document.getElementById('background').onclick = this.closeModal;
    document.getElementById('contents').onclick = this.closeModal;
  }

  handleTrendingClick() {
    let trendingIndex = this.state.currentTrendingIndex + 1;
    this.setState({
      trendingModal: true,
      currentTrendingIndex: trendingIndex,
    });
    document.getElementById("background").style.filter = "blur(8px)";
    document.getElementById("contents").style.filter = "blur(8px)";
    document.getElementById('background').onclick = this.closeModal;
    document.getElementById('contents').onclick = this.closeModal;
  }

  handleSearchClick() {
    console.log('Search Click')
  }

  previousMeme() {
    console.log('Previous meme');
    let currentIndex = this.state.currentTrendingIndex - 1;
    this.setState({ currentTrendingIndex: currentIndex})
  }

  nextMeme() {
    console.log('Next meme');
    let currentIndex = this.state.currentTrendingIndex + 1;
    this.setState({ currentTrendingIndex: currentIndex})
  }

  render() {
    const {
      displayModal,
      trendingModal,
      currentMeme,
      currentMemeDescription,
      trendingMemes,
      currentTrendingIndex,
    } = this.state;

    let memesRender;
    if (displayModal === true) {
      memesRender = (
        <Modal
          closeModal={this.closeModal}
          currentMeme={currentMeme}
          currentMemeDescription={currentMemeDescription}
          displayArrows={false}
        />
      )
    }
    if (trendingModal === true) {
      memesRender = (
        <Modal
          closeModal={this.closeModal}
          currentMeme={trendingMemes[currentTrendingIndex].images.original.url || currentMeme}
          currentMemeDescription={currentMemeDescription}
          displayArrows={true}
          currentTrendingIndex={currentTrendingIndex}
          previousMeme={this.previousMeme}
          nextMeme={this.nextMeme}
        />
      )
    }

    // const memeURL = response.data.data[randomIndex].images.original.url;

    return (
      <div className={styles.app}>
        <EightBall openModal={this.openModal} closeModal={this.closeModal}/>
        {memesRender}
        <br/>
        <div className={styles.headersAndButtonsContainer} id="contents">
          <div>
            <h2>Magic 8 Ball</h2>
            <h3>- Ask a yes or no question - then click the ball to reveal answer -</h3>
            <br/>
          </div>
          <div className={styles.buttonsContainer}>
            {/* <button className={styles.heartButton} > */}
              {/* <IoHeart /> */}
            {/* </button> */}
            {/* <button className={styles.favoritedButton}>Favorited Memes</button> */}
            <button className={styles.trendingButton} onClick={this.handleTrendingClick}>Trending Memes</button>
            <button className={styles.searchButton} onClick={this.handleSearchClick}>Search Memes</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;