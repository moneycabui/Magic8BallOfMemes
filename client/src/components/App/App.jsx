import React from 'react';
import axios from 'axios';
import styles from './App.css';
import EightBall from '../EightBall';
import Modal from '../Modal';
import { FaSearch } from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      trendingModal: false,
      searchModal: false,
      currentMeme: '',
      currentMemeDescription: '',
      trendingMemes: [],
      currentIndex: -1,
      searchedMemes: [],
      searchedText: '',
    }
    this.getMeme = this.getMeme.bind(this);
    this.getTrendingMemes = this.getTrendingMemes.bind(this);
    this.handleTrendingClick = this.handleTrendingClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.previousMeme = this.previousMeme.bind(this);
    this.nextMeme = this.nextMeme.bind(this);
  }

  componentDidMount() {
    this.getMeme();
    this.getTrendingMemes();
  }

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
    axios.get('/searched', {
      params: {
        keyword: searchedKeyword,
      }
    })
      .then((response) => {
        const searched = response.data.data;
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
      searchModal: false,
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

  handleTrendingClick(event) {
    event.preventDefault();
    this.setState({
      trendingModal: true,
      currentIndex: 0,
    });
    document.getElementById("background").style.filter = "blur(8px)";
    document.getElementById("contents").style.filter = "blur(8px)";
    document.getElementById('background').onclick = this.closeModal;
    document.getElementById('contents').onclick = this.closeModal;
  }

  handleSearch(event) {
    event.preventDefault();
    this.getSearchedMemes(this.state.searchedText);
    this.setState({
      searchModal: true,
      currentIndex: 0,
    });
    document.getElementById("background").style.filter = "blur(8px)";
    document.getElementById("contents").style.filter = "blur(8px)";
    document.getElementById('background').onclick = this.closeModal;
    document.getElementById('contents').onclick = this.closeModal;
  }

  handleSearchChange(event) {
    this.setState({ searchedText: event.target.value });
  }

  previousMeme() {
    let currentIndex = this.state.currentIndex - 1;
    this.setState({ currentIndex: currentIndex})
  }

  nextMeme() {
    let currentIndex = this.state.currentIndex + 1;
    this.setState({ currentIndex: currentIndex})
  }

  render() {
    const {
      displayModal,
      trendingModal,
      currentMeme,
      currentMemeDescription,
      trendingMemes,
      currentIndex,
      searchedMemes,
      searchModal,
      searchedText,
    } = this.state;

    let modalRender;
    if (displayModal === true) {
      modalRender = (
        <Modal
          closeModal={this.closeModal}
          currentMeme={currentMeme}
          currentMemeDescription={currentMemeDescription}
          displayArrows={false}
        />
      )
    }
    if (trendingModal === true) {
      let meme = trendingMemes[currentIndex].images.original.url;
      if (meme === '') {
        this.setState({ currentIndex: currentIndex + 1 })
        meme = trendingMemes[currentIndex + 1].images.original.url
      }
      modalRender = (
        <Modal
          closeModal={this.closeModal}
          currentMeme={meme}
          currentMemeDescription={currentMemeDescription}
          displayArrows={true}
          currentIndex={currentIndex}
          previousMeme={this.previousMeme}
          nextMeme={this.nextMeme}
        />
      )
    }
    if (searchModal === true && searchedMemes.length > 0 && searchedText !== '') {
      let meme = searchedMemes[currentIndex].images.original.url;
      if (meme === '') {
        this.setState({ currentIndex: currentIndex + 1 })
        meme = trendingMemes[currentIndex + 1].images.original.url
      }
      modalRender = (
        <Modal
          closeModal={this.closeModal}
          currentMeme={meme}
          currentMemeDescription={currentMemeDescription}
          displayArrows={true}
          currentIndex={currentIndex}
          previousMeme={this.previousMeme}
          nextMeme={this.nextMeme}
        />
      )
    }

    return (
      <div className={styles.app}>
        <EightBall openModal={this.openModal} closeModal={this.closeModal}/>
        {modalRender}
        <div className={styles.headersAndButtonsContainer} id="contents">
          <div>
            <h2>Magic 8 Ball</h2>
            <h3>- Ask a yes or no question -</h3>
            <h3>Then click the ball to reveal answer</h3>
          </div>
          <form onSubmit={this.handleSearch} className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} size="15" color="#E8E8E8" onClick={this.handleSearch} />
            <input className={styles.searchBar} type="text" onChange={this.handleSearchChange} value={this.state.searchedText} placeholder="Search a keyword"></input>
          </form>
          <div className={styles.buttonsContainer}>
            <button className={styles.searchButton} onClick={this.handleSearch}>Search Memes</button>
            <button className={styles.trendingButton} onClick={this.handleTrendingClick}>Trending Memes</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;