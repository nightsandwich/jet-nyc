import styled from 'styled-components';
import { breakpointNumbers, devices, IMG_URL } from './constants';
import { Word } from './types';
import { Counts } from './Counts';
import './styles.css';

const FlexContainer = styled.div<{ isExtra?: boolean }>(
  ({ isExtra }) => `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  
  border-radius: 8px;

  @media only screen and ${devices.xxs} { 
    border: ${isExtra ? '8px dotted #ff0093' : 'none'};
    
  }

  @media only screen and ${devices.sm} {

    border: ${isExtra ? '10px dotted #ff0093' : '3px solid black'};
  
  }

  @media only screen and ${devices.md} {
    
    border: ${isExtra ? '15px dotted #ff0093' : '6px solid black'};
  }
`
);

const Button = styled.button<{ isClicked?: boolean; isSeen: boolean }>(
  ({ isClicked = false, isSeen }) => `
  height: 100%;
  width: ${breakpointNumbers.md / 3}px;
  margin: 0;
  border-radius: 8px;
  background-color: ${isClicked ? '#0fff00' : isSeen ? '#00a6ff' : '#00dff1'};
  padding: 9px;
  border: 6px solid black;
  

  @media only screen and ${devices.xxs} {
    
    border: 1px solid black;
    width: ${breakpointNumbers.xxs / 3}px;
  }

  @media only screen and ${devices.sm} {
    padding: 6px;
    border: 3px solid black;
    width: ${breakpointNumbers.sm / 3}px;
  }

  @media only screen and ${devices.md} {
    padding: 9px;
    border: 6px solid black;
    width: ${breakpointNumbers.md / 3}px;
  }
`
);

const Image = styled.div<{ imgUrl: string }>(
  ({ imgUrl }) => `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 0;
  background: url(${imgUrl});
  background-size: cover;
`
);

const Text = styled.div`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 600;
  border-radius: 8px;
  order: -1;
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;

  opacity: 0.7;

  @media (hover: hover) and (pointer: fine) {
    nav &:hover {
      opacity: 0.85;
      color: white;
      background-color: black;
    }
  }
  &:hover {
    background-color: black;
    color: white;
    opacity: 0.85;
  }

  @media only screen and ${devices.xxs} {
    font-size: 0.7rem;
    padding: 1px;

    opacity: 0.85;
    color: black;
    border-radius: 0;
    background-color: white;
  }

  @media only screen and ${devices.sm} {
    font-size: 1rem;
    padding-bottom: 0.35rem;
    padding-top: 0.35rem;
  }

  @media only screen and ${devices.md} {
    font-size: 1.25rem;
    padding-bottom: 0.45rem;
    padding-top: 0.45rem;
  }
`;

export const Square: React.FC<{
  word: Word;
  onClick: () => void;
  isDisabled: boolean;
}> = ({ word, onClick, isDisabled }) => {
  return (
    <Button
      isSeen={word.category === 'seen'}
      disabled={isDisabled}
      onClick={onClick}
      isClicked={word.clicked}
    >
      <Image imgUrl={IMG_URL[word.category]}>
        {/* <Image imgUrl={IMG_URL.default}> */}
        <FlexContainer isExtra={word.extra}>
          {word.text && (
            <Text>{`${word.tasks?.numTotal ?? ''} ${word.text}`}</Text>
          )}
          {word.tasks && <Counts word={word} />}
        </FlexContainer>
        {/* </Image> */}
      </Image>
    </Button>
  );
};
