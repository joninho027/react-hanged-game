import React, { Component } from 'react';
import './App.css';

const fixtures = [
  'Le jeu du pendu',
  'hello world',
  'Ceci est encore un test',
  'On ne met pas en prod le vendredi',
  'react est vraiment genial',
];

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

class App extends Component {
  state = {
    phrase : this.selectPhrase(fixtures),
    usedLetters : [],
    lettersList : this.buildBoradLetters(alphabet),
  }

  buildBoradLetters(letterList) {
    return Array.from(letterList.toUpperCase());
  }

  selectPhrase(fixtures){
    const fixturesSize = fixtures.length;
    const phrase = fixtures[Math.floor(Math.random() * fixturesSize)];
    return phrase.toUpperCase();
  }

  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.includes(letter) ? letter : '_')
    )
  }

  testLetter(letter) {
    let newUsedLettersList = this.state.usedLetters;
    if (!newUsedLettersList.includes(letter))
    {
      newUsedLettersList.push(letter)
    }
    
    this.setState({
      usedLetters : newUsedLettersList
    });
    
  }

  // Arrow fx for binding
  restart = () => {
    this.setState({
      phrase : this.selectPhrase(fixtures),
      usedLetters : [],
      lettersList : this.buildBoradLetters(alphabet),
    });
  }


  render() {
    const { phrase, usedLetters, lettersList } = this.state;
    const won = this.computeDisplay(phrase, usedLetters).indexOf('_') === -1 ? true : false;


    const board = lettersList.map( (letter) => {
      let className = '';
      if ( usedLetters.includes(letter) )
      {
        className = 'used';
      }
      return <div className={`board-letter ${className}`} key={letter} onClick={ () => {this.testLetter(letter)} }>{letter}</div>
    });

    return (
      <div className="App">
        <p className="phrase">{this.computeDisplay(phrase, usedLetters)}</p>
        { !won ? (
          <div className="board">{board}</div>
        ) : (
          <div onClick={this.restart} className="btn">Rejouer</div>
        ) }
        
      </div>
    );
  }
}

export default App;
