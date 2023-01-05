export enum TodoState {
  DELETED = 'Deleted',
  DONE = 'Done',
  NORMAL = 'Normal',
}

export type Todo = {
  id: number;
  content: string;
  state: string;
};
