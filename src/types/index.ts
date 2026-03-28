export type TaskStatus = 'In Progress' | 'Pending' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: TaskStatus;
  createdAt: number;
}

export type View = 'list' | 'add' | 'edit';

export type FilterStatus = 'All' | TaskStatus;
