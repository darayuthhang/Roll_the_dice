import react from 'react';
import './style.css';

const PauseButton = (props) => {
    return(
        <button className="btn" onClick={props.pauseButton}>Pause</button>
    )
}

export default PauseButton;
