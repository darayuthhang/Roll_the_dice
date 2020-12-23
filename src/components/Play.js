import react from 'react';
import './style.css';

const PlayButton = (props) => {
    return(
        <button className = "btn" onClick={props.playButton}>Play</button>
    )
}

export default PlayButton;
