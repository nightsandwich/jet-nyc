import { RawWord, Word } from './types';
import { processRawWords } from './utils';

export const words: RawWord[] = [
  {
    id: 1,
    text: "'Literally'",
    category: 'overheard'
  },
  {
    id: 2,
    text: 'A first date',
    category: 'seen'
  },
  {
    id: 3,
    text: "'Penis'",
    category: 'overheard'
  },
  { id: 4, text: 'An animal in a stroller', category: 'seen' },
  { id: 5, num: 2, text: 'people wearing the same outfit', category: 'seen' },
  { id: 6, text: 'A line of more than 15 people', category: 'seen' },
  { id: 7, text: 'A mattress', category: 'seen' },
  { id: 8, text: 'A bag of poop', category: 'seen' },
  { id: 9, num: 5, text: 'kickstands', category: 'seen', extra: true },
  { id: 10, num: 3, text: 'Bird tattoos', category: 'seen', extra: true },
  { id: 11, text: 'Someone taking a selfie', category: 'seen' },
  { id: 12, text: "'Instagram'", category: 'overheard' },
  { id: 13, text: "'YOLO'", category: 'overheard' },
  { id: 14, text: 'Someone crying', category: 'seen' },
  { id: 15, text: 'Whiskey bottle', category: 'seen' },
  { id: 16, text: 'Empty baggie', category: 'seen' },
  { id: 17, text: 'Kids on a leash', category: 'seen' },
  { id: 18, text: 'Someone playing drums', category: 'seen' },
  { id: 19, text: 'Metrocard', category: 'seen' },
  { id: 20, num: 5, text: 'rats', category: 'seen', extra: true },
  { id: 21, text: "'Fuck'", category: 'overheard' },
  { id: 22, num: 5, text: 'Tattoos of faces', category: 'seen', extra: true },
  { id: 23, text: 'German speakers', category: 'overheard' },
  { id: 24, text: 'Dutch speakers', category: 'overheard' },
  { id: 25, text: 'French speakers', category: 'overheard' },
  { id: 26, text: 'A break up', category: 'seen', extra: true },
  { id: 27, text: 'A fight', category: 'seen' },
  {
    id: 28,
    num: 3,
    text: 'people wearing the same outfit',
    category: 'seen',
    extra: true
  },
  { id: 29, text: 'A proposal', category: 'seen', extra: true },
  { id: 30, text: 'A wedding', category: 'seen', extra: true },
  { id: 31, text: 'An arrest', category: 'seen', extra: true },
  { id: 32, text: 'DRUGS', category: 'seen', extra: true },
  { id: 33, text: "It's Showtime", category: 'overheard' },
  { id: 34, text: 'Pizza on the sidewalk', category: 'seen' },
  { id: 35, text: 'Condom wrapper', category: 'seen' },
  { id: 36, text: 'Condom (wihtout wrapper)', category: 'seen' },
  { id: 37, num: 5, text: 'Donuts', category: 'seen' },
  { id: 38, num: 5, text: "Trader Joe's things", category: 'seen' },
  { id: 39, text: 'GENITALS', category: 'seen', extra: true },
  { id: 40, text: 'Lightning Crashes', category: 'overheard', extra: true },
  { id: 41, text: 'Car Techno', category: 'overheard' },
  { id: 42, text: 'Someone waiting for first date', category: 'seen' },
  { id: 43, text: 'Someone pretending to read', category: 'seen' },
  { id: 44, num: 10, text: 'Coins', category: 'seen', extra: true }
];

const processedWords = processRawWords(words);

const seenWordsRaw: RawWord[] = words.filter(
  (word) => word.category === 'seen' && !word.extra
);

const overheardWordsRaw: RawWord[] = words.filter(
  (word) => word.category === 'overheard' && !word.extra
);

const extrasWordsRaw: RawWord[] = words.filter((word) => !!word.extra);

export const overheardWords: Word[] = processRawWords(overheardWordsRaw);

export const extrasWords: Word[] = processRawWords(extrasWordsRaw);
export const seenWords: Word[] = processRawWords(seenWordsRaw);
