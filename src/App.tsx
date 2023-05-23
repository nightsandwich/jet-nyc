import { useEffect, useState } from 'react';
import styled from 'styled-components';

import './styles.css';
import { Board } from './Board';
import { BoardState } from './types';
import { FlexColumn } from './styledComponents';
import {
  getDelay,
  getIsWinner,
  getNewWordWithTasks,
  getScrambledBoard,
  markRandomAdjacentTileAsTrue
} from './utils';
import { devices, InitialBoardState } from './constants';

const AppContainer = styled(FlexColumn)<{ isWinner: boolean }>(
  ({ isWinner }) => `
  display: flex;
  flex-direction: column;
  background-color: ${isWinner ? 'lightgreen' : 'none'};
`
);

const HappyBirthday = styled.div`
  position: absolute;
  z-index: 100;
  font-family: 'Bangers', cursive;
  text-shadow: 8px 8px 4px rgba(67, 238, 0, 0.9);
  background-color: orangered;
  border-radius: 8px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(45deg);
  top: 40px;
  left: -42px;

  @media only screen and ${devices.xxs} {
    font-size: 4rem;
    margin: 40% 20%;
  }

  @media only screen and ${devices.sm} {
    font-size: 5rem;
    margin: 50% 20%;
  }

  @media only screen and ${devices.md} {
    font-size: 7rem;
    margin: 40% 20%;
  }
`;

const Play = styled.button<{ isDisabled: boolean }>(
  ({ isDisabled }) => `
  font-size: 4.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: ${isDisabled ? 'slategrey' : 'black'};
  text-shadow: ${
    isDisabled
      ? '8px 8px 4px rgba(67, 238, 0, 0.8)'
      : '8px 8px 4px rgba(67, 238, 0, 0.9)'
  };
  background-color: ${isDisabled ? 'yellow' : 'orangered'};
  

  @media only screen and ${devices.xxs} {
    font-size: 2.5rem;
  }

  @media only screen and ${devices.sm} {
    font-size: 3.5rem;
  }

  @media only screen and ${devices.md} {
    font-size: 4.5rem;
  }
`
);

const Text = styled.div`
  font-size: 3.5rem;
  /* margin: 0.5rem 0 4rem; */
  text-shadow: 8px 8px 4px rgba(67, 238, 0, 0.9);
  background-color: orangered;

  @media only screen and ${devices.xxs} {
    font-size: 1.5rem;
  }

  @media only screen and ${devices.sm} {
    font-size: 2.5rem;
  }

  @media only screen and ${devices.md} {
    font-size: 3.5rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 3.5rem;
  text-shadow: 8px 8px 4px rgba(67, 238, 0, 0.9);
  @media only screen and ${devices.xxs} {
    height: 1.5rem;
  }

  @media only screen and ${devices.sm} {
    height: 2.5rem;
  }

  @media only screen and ${devices.md} {
    height: 3.5rem;
  }
`;

export default function App() {
  const [board, setBoard] = useState<BoardState>(InitialBoardState);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [isInPlay, setIsInPlay] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isWinner) {
      setIsInPlay(() => false);
      // setTimeout(() => {
      //   setBoard(() => InitialBoardState);
      //   setIsWinner(() => false);
      // }, 5000);
    }
  }, [isWinner]);

  useEffect(() => {
    const num = Math.floor(Math.random() * 2);

    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    if (!num) {
      const delay = getDelay();
      timeout1 = setTimeout(() => setIsVisible(() => true), delay * 1000);
      timeout2 = setTimeout(() => setIsVisible(false), (delay + 1) * 1000);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [board]);

  useEffect(() => {
    if (getIsWinner(board)) {
      setIsWinner(() => true);
    }
  }, [board]);

  const handleClick = (i: number) => {
    const squares = [...board];
    const square = board[i];
    let newWord;
    if (square.tasks) {
      newWord = getNewWordWithTasks(square);
    } else {
      newWord = { ...square, clicked: true };
    }
    if (newWord.extra && newWord.clicked) {
      const extraWordIdx = markRandomAdjacentTileAsTrue(i, squares);
      if (extraWordIdx !== undefined) {
        const sq = squares[extraWordIdx];
        const task = sq.tasks && {
          ...sq.tasks,
          isComplete: true,
          numComplete: sq.tasks.numTotal
        };
        squares[extraWordIdx] = {
          ...sq,
          clicked: true,
          tasks: task
        };
      }
    }
    squares[i] = newWord;

    setBoard(squares);
  };

  const handleClickPlay = () => {
    if (isInPlay || isWinner) {
      setBoard(InitialBoardState);
      setIsWinner(() => false);
      setIsInPlay(() => false);
    } else {
      setBoard(() => getScrambledBoard());
      setIsInPlay(() => true);
    }
  };

  return (
    <AppContainer className="App" isWinner={isWinner}>
      {isVisible && <HappyBirthday>HAPPY BIRTHDAY</HappyBirthday>}
      <FlexContainer>
        {!isWinner && <Text className="text">ASLDKFJLKDALKFJ!!!!</Text>}
        {isWinner ? (
          <FlexContainer>
            <Text className="text">YOU'VE WON!</Text>
          </FlexContainer>
        ) : (
          <FlexContainer> </FlexContainer>
        )}
      </FlexContainer>
      <Play
        className="text"
        // disabled={!isWinner && isInPlay}
        onClick={handleClickPlay}
        isDisabled={!isWinner && isInPlay}
      >
        {isWinner || isInPlay ? 'Reset' : 'Start Game'}
      </Play>
      <Board
        board={board}
        onClick={handleClick}
        isDisabled={isWinner || !isInPlay}
      />
      {/* {isWinner && <Text className="text">YOU'VE WON!</Text>} */}
    </AppContainer>
  );
}
