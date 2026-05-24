export type Priority = 'high' | 'medium' | 'low';
export type Category = 'work' | 'personal' | 'study' | 'other';
export type FilterType = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string;    // YYYY-MM-DD，可为空
  createdAt: string;  // ISO 日期字符串
}

export interface TodoStats {
  total: number;
  active: number;
  done: number;
  overdue: number;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: { title: string; priority: Priority; category: Category; dueDate: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; title: string } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'REORDER_TODOS'; payload: { fromId: string; toId: string } }
  | { type: 'SET_FILTER'; payload: { filter: FilterType } }
  | { type: 'SET_SEARCH'; payload: { query: string } }
  | { type: 'SET_EDITING'; payload: { id: string | null } };

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
  searchQuery: string;
  editingId: string | null;
}
