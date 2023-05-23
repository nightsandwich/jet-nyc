import styled from 'styled-components';
import { breakpointNumbers, devices } from './constants';
import './styles.css';

const CountBox = styled.div<{ isFilled: boolean; num?: number }>(
  ({ isFilled, num }) => `
  background-color: ${isFilled ? '#b6ff00' : 'whitesmoke'};
  border: 1px solid black;
  margin: 0 .5rem 0 0;

  @media only screen and ${devices.xxs} {
    width: ${num ? `${(breakpointNumbers.xxs / 3) * num}px` : '.5rem'}; 
    margin: 0;
    border: none;  
    border-right: 1px solid grey;
  }

  @media only screen and ${devices.sm} {
    width: .65rem;
    
    
  }

  @media only screen and ${devices.md} {
    width: .75rem;
    
  }
`
);

export const Count: React.FC<{
  isFilled: boolean;
  num?: number;
}> = ({ isFilled, num }) => {
  return <CountBox isFilled={isFilled} num={num} />;
};
