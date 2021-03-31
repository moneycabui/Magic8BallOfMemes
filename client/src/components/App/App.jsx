import React from 'react';
import axios from 'axios';
import styles from './App.css';
import EightBall from '../EightBall';
import Modal from '../Modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      currentMeme: '',
      currentMemeDescription: '',
      trendingMemes: [],
    }
    this.getMeme = this.getMeme.bind(this);
    // this.getTrendingMemes = this.getTrendingMemes.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getMeme();
    // this.getTrendingMemes()
  }

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

  toggleModal() {
    this.setState({ displayModal: !this.state.displayModal });
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
        <div></div>
        <br/>
        <br/>
        <h1>Magic 8 Ball</h1>
        <h3></h3>
      </div>
    )
  }
}

export default App;