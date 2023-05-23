import styled from 'styled-components';
import { breakpointNumbers, devices } from './constants';
import { Count } from './Count';
import './styles.css';
import { Word } from './types';

const Container = styled.div`
  justify-content: center;
  display: flex;
  margin-top: auto;

  width: ${breakpointNumbers.md - 40}px;
  opacity: 0.6;

  @media (hover: hover) and (pointer: fine) {
    nav &:hover {
      opacity: 1;
    }
  }
  &:hover {
    opacity: 1;
  }

  @media only screen and ${devices.xxs} {
    width: ${breakpointNumbers.xxs / 3 - 20}px;
    height: 0.5rem;
    border: 2px solid black;
    border-radius: 8px;
    justify-content: center;
    align-self: center;
  }

  @media only screen and ${devices.sm} {
    width: ${breakpointNumbers.sm / 3 - 30}px;
    height: 3rem;
  }

  @media only screen and ${devices.md} {
    width: ${breakpointNumbers.md / 3 - 40}px;
    height: 3.5rem;
  }
`;

export const Counts: React.FC<{
  word: Word;
}> = ({ word }) => {
  const tasks = word.tasks;

  return (
    <Container>
      {Array(tasks?.numTotal)
        .fill(null)
        .map((_, idx) => {
          const numComplete = tasks?.numComplete;
          const isBoxFilled =
            numComplete !== undefined && numComplete >= idx + 1 ? true : false;
          return (
            <Count key={idx} isFilled={isBoxFilled} num={tasks?.numTotal} />
          );
        })}
    </Container>
  );
};
