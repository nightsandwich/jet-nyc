import { words } from './words';
import { NUM_WORDS } from './constants';
import { Word, BoardState, RawWord } from './types';

export const scrambleWords = (words: Word[]): Word[] => {
  const shuffledWords = [...words]; // Copy the array
  let currentIndex = shuffledWords.length;

  // Shuffle the array using Fisher-Yates algorithm
  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex--;

    [shuffledWords[currentIndex], shuffledWords[randomIndex]] = [
      shuffledWords[randomIndex],
      shuffledWords[currentIndex]
    ];
  }

  // Return the first 8 words
  return shuffledWords.slice(0, NUM_WORDS);
};

export const processRawWords = (words: RawWord[]): Word[] => {
  return words.map<Word>((word) => {
    const newWord = {
      id: word.id,
      text: word.text,
      category: word.category,
      extra: word.extra
    };
    return word.num
      ? { ...newWord, tasks: { numTotal: word.num, numComplete: 0 } }
      : newWord;
  });
};

export const getScrambledBoard = () => {
  const scrambledRawWords = scrambleWords(words);
  const scrambledWords = processRawWords(scrambledRawWords);
  return Array(NUM_WORDS)
    .fill(null)
    .map((_, idx) => scrambledWords[idx]);
};

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export const getIsWinner = (squares: BoardState): boolean => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a].clicked && squares[b].clicked && squares[c].clicked) {
      return true;
    }
  }

  return false;
};

export const markRandomAdjacentTileAsTrue = (
  idx: number,
  squares: BoardState
) => {
  const openSpots = [];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // console.log(idx);
    if ([a, b, c].includes(idx)) {
      // console.log(a, b, c);
      openSpots.push(
        ...[a, b, c].filter((j) => j !== idx && !squares[j].clicked)
      );
    }
  }
  if (openSpots.length === 0) {
    return undefined;
  }

  // console.log(openSpots);
  const randomIdx = Math.floor(Math.random() * openSpots.length);
  // console.log(randomIdx);
  // console.log(squares[openSpots[randomIdx]]);
  return openSpots[randomIdx];
};

export const getNewWordWithTasks = (word: Word): Word => {
  if (!word.tasks) return word; // not going to happen

  const { numTotal, numComplete } = word.tasks;

  if (numTotal - numComplete === 1) {
    return {
      ...word,
      clicked: true,
      tasks: { ...word.tasks, numComplete: numTotal, isComplete: true }
    };
  }
  return { ...word, tasks: { ...word.tasks, numComplete: numComplete + 1 } };
};

export const getDelay = () => {
  const rand = Math.floor(Math.random() * 90 + 30);
  console.log(rand);
  return rand;
};
