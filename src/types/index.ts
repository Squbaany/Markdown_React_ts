export type INewUser = {
  name: string;
  email: string;
  password: string;
};

export type ISaveUserToDb = {
  accountId: string;
  name: string;
  email: string;
  imgUrl: URL;
  tags: string[];
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  imgUrl: string;
  tags: string[];
};

export type INewNote = {
  userId: string;
  title: string;
  markdown: string;
  tags: string[];
};

export type IUpdateNote = {
  noteId: string;
  title: string;
  markdown: string;
  tags: string[];
};

export type ITag = {
  label: string;
};

export type FormTag = {
  value: string;
  label: string;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};
