export type Progress = {
  finishPage: number;
  finishReading: string;
  speed: number;
  startPage: number;
  startReading: string;
  status: string;
  _id: string;
};

export type TimeLeftToRead = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type SortedBy = 'unread' | 'in progress' | 'done' | 'all';

export type Book = {
  author: string;
  imageUrl: string;
  title: string;
  totalPages: number;
  recommend?: boolean;
  status?: SortedBy;
  owner?: string;
  progress: Progress[];
  timeLeftToRead?: TimeLeftToRead;
  _id: string;
};

export type StoreState = AuthState & BookState;

export type User = {
  _id?: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  refreshToken: string | null;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signUp: ({ name, email, password }: { name: string; email: string; password: string }) => Promise<void>;
  signIn: ({ email, password }: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: (user: User | null) => Promise<void>;
};

export type BookState = {
  title: string;
  author: string;
  page: number;
  limit: number;
  sortedBy: SortedBy;
  setParams: (params: Partial<BookState>) => void;
  reset: () => void;
};

export type GroupedProgress = Record<
  string,
  {
    pages: number;
    list: Progress[];
  }
>;