import { Word } from './types';

export const NUM_WORDS = 9;

const OVERHEARD_URL =
  'https://cdn-icons-png.flaticon.com/512/59/59572.png?w=740&t=st=1684735678~exp=1684736278~hmac=6d8a06077e6fae2585c2fae5e9c9962b25f3ec6f1074e761fc8f337f39b043ab';
const SEEN_URL =
  'https://cdn-icons-png.flaticon.com/512/39/39235.png?w=740&t=st=1684735886~exp=1684736486~hmac=75d0f70282c6336dedc47ab15f02ecc92de085d3778baf8128c224811b193837';

const NYC_URL =
  'https://cdn-icons-png.flaticon.com/512/88/88327.png?w=740&t=st=1684756276~exp=1684756876~hmac=19e463cd81ec5d825c49d7ddd73779c85ba1e3e3f8eecead0657038bf57e7ac9';

export const IMG_URL = {
  overheard: OVERHEARD_URL,
  seen: SEEN_URL,
  default: NYC_URL
};

const InitialWordState: Word = {
  id: 0,
  category: 'default'
};

export const InitialBoardState = Array(NUM_WORDS).fill(InitialWordState);

export const breakpointNumbers = {
  xxs: 340,
  xs: 400,
  sm: 640,
  md: 740
};

export const breakpoints = {
  xxs: `${breakpointNumbers.xxs}px`,
  xs: `${breakpointNumbers.xs}px`,
  sm: `${breakpointNumbers.sm}px`,
  md: `${breakpointNumbers.md}px`
};

export const devices = {
  xxs: `(min-width: ${breakpoints.xxs})`,
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`
};

export const ratios = {
  iphone: `(min-device-pixel-ratio: 2),`
};

export const DELAY = 120;
