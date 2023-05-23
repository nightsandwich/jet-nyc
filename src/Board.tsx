import React from 'react';
import styled from 'styled-components';

import { Square } from './Square';
import { BoardState } from './types';
import { breakpointNumbers, breakpoints, devices } from './constants';

const BoardContainer = styled.div`
  margin: 1rem;
  padding: 0;
  z-index: 6;
`;
const Row = styled.div`
  /* height: 100px; */
  height: ${breakpointNumbers.md / 3}px;
  width: ${breakpoints.md};
  align-self: center;
  display: flex;
  justify-content: space-evenly;
  border-radius: 8px;

  /* @media only screen and ${devices.xxs} {
    height: ${breakpointNumbers.xs / 3}px;
    width: ${breakpoints.xs};
  } */
  
  @media only screen and ${devices.xxs} {
    height: ${breakpointNumbers.xxs / 3}px;
    width: ${breakpoints.xxs};
  }

  @media only screen and ${devices.sm} {
    height: ${breakpointNumbers.sm / 3}px;
    width: ${breakpoints.sm};
  }

  @media only screen and ${devices.md} {
    height: ${breakpointNumbers.md / 3}px;
    width: ${breakpoints.md};
  }
`;

export const Board: React.FC<{
  board: BoardState;
  onClick: (i: number) => void;
  isDisabled: boolean;
}> = ({ board, onClick, isDisabled }) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        isDisabled={isDisabled || !!board[i].clicked}
        word={board[i]}
        onClick={() => onClick(i)}
      />
    );
  };

  return (
    <BoardContainer>
      <Row className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Row>
      <Row className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Row>
      <Row className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Row>
    </BoardContainer>
  );
};
