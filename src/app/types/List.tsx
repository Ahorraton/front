export interface List {
  id: number;
  user_id: number;
  name: string;
}

export interface MultipleListsState {
  lists: List[];
  selectedListId: number | null;
}
