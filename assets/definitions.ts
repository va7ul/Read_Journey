export type Book = {
  author: string;
  imageUrl: string;
  recommend?: boolean;
  status?: SortedBy;
  title: string;
  totalPages: number;
  _id: string;
};

export type StoreState = AuthState & BookState;

export type User = {
  name: string | null;
  email: string | null;
  token: string | null;
  refreshToken: string | null;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: (user: User | null) => Promise<void>;
};

export type SortedBy = 'unread' | 'in progress' | 'done' | 'all';

export type BookState = {
  title: string;
  author: string;
  page: number;
  limit: number;
  sortedBy: SortedBy;
  isReading: boolean;
  setParams: (params: Partial<BookState>) => void;
  reset: () => void;
};
