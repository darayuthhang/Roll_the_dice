import React , {Component} from 'react';
import './App.css';
import Dices from './components/dices';
import diceArr from './data/Appdata.js';
import diceeLogo from './assets/logo/vegaslogo.png';

import blackpink from './audio/blackpink.mp3';
import PlayButton from './components/Play';
import PauseButton from './components/Pause';



const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
const url = "https://www.khjournals.com/dice/roll/"

const config =  {
    method: "GET",
    headers: {
      "Content-type": "application/json",

    },
  };


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = { 
      dices: diceArr,               // diceArr 
      roll: "",                     // use to accept value from Api
      toggle: true,                 // to handle pause, and play music
      randomDice: diceArr[getRandomInt(6)] //to generate random number from 1 to 6
      
     }
     this.audio = new Audio(blackpink);
  }


  /***
   * @description send get request to https://www.khjournals.com/dice/roll/ get value "roll"
   * 
   * 
   */
  fetch = () => {
          fetch(url, config)
          .then(response => response.json())
          .then(data => {
            if(data.length === 0){
              console.log("loading");
            }else{
               //access the end of data length
              this.setState({roll: data[data.length-1].roll});
            }
           
          })
          .catch(error => {
            console.error('Error:', error);
          });
  }
  
  /***
   * @description onMounting allow the fetch function to send 
   *              get request for every three second.
   */
  componentDidMount(){
    this.interval =  setInterval(this.fetch, 3000);
  }

  /***
   * @description after user hit play music, it will update the state
   *              toggle to false. This allow the user to pause music after play
   * 
   * 
   */
  handlePlay = () => {
    if(this.state.toggle === true){
       this.audio.play();
       //after play wait for user to pause
       this.setState({toggle: false, roll: ""});
    }
  }
    /***
   * @description after user hit pause music, it will update the state
   *              toggle to true. This allow the user to play music after pause.
   * 
   * 
   */

  handlePause = () => {
    if(this.state.toggle === false){
       this.audio.pause();
      //after pause, waiting for user to play
        this.setState({toggle: true})
    }
  }
  
  render() {
    const {dices, roll, toggle, randomDice} = this.state;

    //if roll === exist, change the dice
    const listofDice = () => {
      if (roll === 'roll'){
          return (
          <div className="dices">
              <Dices  image={randomDice}/>
              <Dices  image={randomDice}/>
          </div>  
        )
      }else{
        return (
        <div className="dices">
              <Dices  image={dices[0]}/>
              <Dices  image={dices[0]}/>
        </div>  
        )
       
      }
      
    }
 
    
   // RETURN Our App
    return ( 
      <div className="wrapper">  
      
        <div className="header">
        
          <div className="welcome-to-vegas">
            <img src= {diceeLogo} alt="vegas" />
          </div>

          {listofDice()}

          <div className="main">
            {roll === "roll"
             ? <button className="btn" onClick={this.handleClick}>Roll</button>
             : <button className="btn">Roll</button>
            }
          </div>

          {toggle === true 
          ?<PlayButton playButton ={this.handlePlay}/>
          :<PauseButton pauseButton = {this.handlePause} />
          }
        </div>
   
      
        
        
      </div>
     );
  }
}

export default App;
