export interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    id: number | null;
    username: string;
  } | null;
}
