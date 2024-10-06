import React from 'react';
import './SokobanBoard.css';  // ייבוא קובץ העיצוב
import box from '../image/box.jpg'
import player from '../image/player.jpg';
import floor from '../image/floor.jpg';
import goal from '../image/goal.jpg';
import wall from '../image/wall.jpg';

function SokobanBoard({ level,onMove }) {
    console.log("so");
    return (
        <div className="board">
            {level.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className="cell">
                            {cell === 1 && <img src={player}alt="player" />}
                            {cell === 2 && <img src={box} alt="box" />}
                            {cell === 3 && <img src={goal} alt="goal" />}
                            {cell === 4 && <img src={wall} alt="wall" />}
                            {cell === 0 && <img src={floor} alt="floor" />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default SokobanBoard;
