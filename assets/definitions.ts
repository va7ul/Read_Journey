export type User = {
  name: string | null;
  email: string | null;
  token: string | null;
  refreshToken: string | null;
};

export type Book = {
  author: string;
  imageUrl: string;
  recommend: boolean;
  title: string;
  totalPages: number;
  _id: string;
};

export type StoreState = AuthState & BookState;

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: (user: User | null) => Promise<void>;
};

export type BookState = {
  title: string;
  author: string;
  page: number;
  limit: number;
  setParams: (params: Partial<BookState>) => void;
};
