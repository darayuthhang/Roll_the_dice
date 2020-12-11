import React , {Component} from 'react';
import './App.css';
import Dices from './components/dices';
import diceArr from './Appdata.js';
import diceeLogo from './assets/logo/vegaslogo.png';

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      count: 0,
      dices: diceArr // array
     }
  }

  handleClick = (e) => {
    this.setState({count: this.state.count + 1})
  }

  render() {
    const {dices} = this.state;

    return ( 
      <div className="wrapper">
        <div className="header">

          <div className="welcome-to-vegas">
            <img src= {diceeLogo} alt="vegas" />
          </div>

          <div className="dices">
            <Dices  image={dices[getRandomInt(6)]}/>
            <Dices  image={dices[getRandomInt(6)]}/>
          </div>  

          <div className="main">
            <button className="btn" onClick={this.handleClick}>Roll</button>
          </div>
        </div>
   
      
        
        
      </div>
     );
  }
}

export default App;
