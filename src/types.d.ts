export type Category = 'overheard' | 'seen' | 'default';

interface BaseWord {
  id: number;
  text?: string;
  category: Category;
  clicked?: boolean;
  extra?: boolean;
}

export interface RawWord extends BaseWord {
  num?: number;
}

export interface Task {
  numTotal: number;
  numComplete: number;
  isComplete?: boolean;
}

export interface Word extends BaseWord {
  tasks?: Task;
}

export type BoardState = Word[];
