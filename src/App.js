import React, { useState, useEffect } from 'react';
import './App.css';
import SokobanBoard from './Components/SokobanBoard';

const levels = [
  [
    [0, 0, 4, 4, 4, 4, 4, 4, 0],
    [4, 4, 4, 0, 0, 0, 0, 4, 0],
    [4, 3, 1, 2, 0, 0, 0, 4, 0],
    [4, 4, 4, 0, 2, 0, 3, 4, 0],
    [4, 3, 4, 4, 2, 0, 0, 4, 0],
    [4, 0, 4, 0, 3, 0, 0, 4, 4],
    [4, 2, 0, 0, 2, 2, 0, 3, 4],
    [4, 0, 0, 0, 3, 0, 0, 0, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4],
  ],
  // רמה 1
  [
    [4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 2, 3, 0, 4],
    [4, 0, 4, 0, 0, 4, 0, 4],
    [4, 0, 4, 1, 0, 0, 0, 4],
    [4, 0, 4, 0, 0, 0, 0, 4],
    [4, 0, 0, 0, 2, 3, 0, 4],
    [4, 4, 4, 4, 4, 4, 4, 4],
  ],
  // רמה 2
  [
    [4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 2, 0, 0, 0, 4],
    [4, 2, 4, 4, 2, 4, 4, 0, 4],
    [4, 2, 4, 1, 0, 0, 3, 0, 4],
    [4, 2, 4, 0, 4, 4, 0, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4],

  ],
  // רמה 3
  [
    [4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 2, 0, 0, 4],
    [4, 2, 4, 3, 0, 0, 0, 4],
    [4, 0, 4, 0, 1, 2, 0, 4],
    [4, 0, 4, 2, 3, 0, 0, 4],
    [4, 0, 0, 0, 0, 0, 3, 4],
    [4, 4, 4, 4, 4, 4, 4, 4],
  ],
  // רמה 4 - לוח עם עיצוב גמיש יותר
  [
    [4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 4, 2, 0, 4, 0, 4],
    [4, 2, 4, 0, 1, 0, 0, 4],
    [4, 2, 4, 0, 0, 0, 2, 4],
    [4, 0, 0, 0, 3, 0, 0, 4],
    [4, 4, 4, 4, 4, 4, 4, 4],
  ],
  [
    [4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 0, 0, 0, 4],
    [4, 2, 4, 2, 4, 2, 0, 4],
    [4, 0, 4, 0, 1, 0, 0, 4],
    [4, 2, 4, 2, 0, 0, 0, 4],
    [4, 0, 4, 0, 3, 0, 2, 4],
    [4, 4, 4, 4, 4, 4, 4, 4],
  ],
];


const findPlayer = (level) => {
  for (let row = 0; row < level.length; row++) {
    for (let col = 0; col < level[row].length; col++) {
      if (level[row][col] === 1) {
        return [row, col];
      }
    }
  }
  return null;
};


const canMoveTo = (level, row, col) => {
  if (row < 0 || row >= level.length || col < 0 || col >= level[0].length) {
    return false;
  }
  return level[row][col] !== 4;
};

const canMoveBoxTo = (level, row, col) => {
  if (row < 0 || row >= level.length || col < 0 || col >= level[0].length) {
    console.log(level);
    return false;
  }
  return level[row][col] === 0 || level[row][col] === 3;
};
const getNewPosition = (row, col, direction) => {
  switch (direction) {
    case 'UP':
      return [row - 1, col];
    case 'DOWN':
      return [row + 1, col];
    case 'LEFT':
      return [row, col - 1];
    case 'RIGHT':
      return [row, col + 1];
    default:
      return [row, col];
  }
};
const isBox = (level, row, col) => {
  return level[row] && level[row][col] === 2;
  // למה צריך את זה?
}
const isGoal = (level, row, col) => {
  return level[row] && level[row][col] === 3;
}
const moveBox = (level, fromRow, fromCol, toRow, toCol) => {
  const newLevel = level.map(row => row.slice());
  newLevel[fromRow][fromCol] = 0;
  newLevel[toRow][toCol] = 2;
  return newLevel;
}


const deepCopyLevel = (level) => {
  return level.map(row => [...row]);
};


const findGoalCount = (level) => {
  let num = 0;
  for (let row = 0; row < level.length; row++) {
    for (let col = 0; col < level[row].length; col++) {
      if (level[row][col] === 3) {
        num++;
      }
    }
  }
  console.log("num", num);
  return num;
}
const findGoal = (level) => {
  const goals = [];
  for (let row = 0; row < level.length; row++) {
    for (let col = 0; col < level[row].length; col++) {
      if (level[row][col] === 3)
        goals.push([row, col]);
    }
  }
  return goals;
};


const isWinn = (level, goals) => {
  for (let [goalRow, goalCol] of goals) {
    if (level[goalRow][goalCol] !== 2) {
      return false; // יש מטרה שלא כוסתה על ידי ארגז
    }
  }
  return true;
}

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0); // רמת המשחק הנוכחית
  const [level, setLevel] = useState(levels[0]);
  const [playerPosition, setPlayerPosition] = useState(findPlayer(levels[0]));
  // const [goalCount, setGoalCount] = useState(findGoalCount(initialLevel));
  const [gameWon, setGameWon] = useState(false);
  const [goals, setGoals] = useState(findGoal(levels[0]));

  const movePlayer = (direction) => {
    if (!playerPosition) return;
    const [row, col] = playerPosition;
    const [newRow, newCol] = getNewPosition(row, col, direction);

    if (canMoveTo(level, newRow, newCol)) {
      let newLevel = deepCopyLevel(level);

      if (isBox(level, newRow, newCol)) {
        const [boxRow, boxCol] = getNewPosition(newRow, newCol, direction);

        if (canMoveBoxTo(level, boxRow, boxCol)) {
          newLevel = moveBox(level, newRow, newCol, boxRow, boxCol);

          // if (isGoal(level, boxRow, boxCol)) {
          //   console.log(goalCount);
          //   setGoalCount(goalCount - 1);
          //   console.log(goalCount);

          // }
          if (goals.some(([gRow, gCol]) => gRow === newRow && gCol === newCol)) {
            newLevel[newRow][newCol] = 3;
            // setGoalCount(goalCount+1);
          }
        }
        else {
          return;
        }
      }

      if (goals.some(([gRow, gCol]) => gRow === row && gCol === col)) {
        newLevel[row][col] = 3;
        // setGoalCount(goalCount+1);
      } else {
        newLevel[row][col] = 0;
      }
      newLevel[newRow][newCol] = 1;
      setLevel(newLevel);
      setPlayerPosition([newRow, newCol]);
      if (isWinn(newLevel, goals)) {
        setTimeout(() => {
          if (currentLevelIndex < level.length - 1) {
            setCurrentLevelIndex(currentLevelIndex + 1);
            const nextLevel = levels[currentLevelIndex + 1];
            setLevel(nextLevel);
            setPlayerPosition(findPlayer(nextLevel));
            setGoals(findGoal(nextLevel));
          } else {
            setGameWon(true);
            alert("ניצחת!");
          }

        }, 300);

      }
    }
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        movePlayer('UP');
        break;
      case 'ArrowDown':
        movePlayer('DOWN');
        break;
      case 'ArrowLeft':
        movePlayer('LEFT');
        break;
      case 'ArrowRight':
        movePlayer('RIGHT');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition, level]);

  return (
    <div className="app">
      <h1>סוקובן</h1>
      <SokobanBoard level={level} />
    </div>
  );
}

export default App;
