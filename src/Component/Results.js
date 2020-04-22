import React from 'react';

const Results = ({score, playagain}) => {
    return(
        <div classsName='score-board '>
            <div className='score'>
                You scored {score} / 5 correct answers!
            </div>
            <button className='playBtn' onClick={playagain}>Play Again</button>
        </div>
    );
}

export default Results;