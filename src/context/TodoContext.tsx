import { createContext, useContext } from 'react';
import type { Todo, TodoStats, FilterType, Priority, Category } from '../types/todo';

export interface TodoContextValue {
  todos: Todo[];
  filteredTodos: Todo[];
  stats: TodoStats;
  filter: FilterType;
  searchQuery: string;
  editingId: string | null;
  addTodo: (title: string, priority: Priority, category: Category, dueDate: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  clearCompleted: () => void;
  reorderTodos: (fromId: string, toId: string) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  setEditingId: (id: string | null) => void;
}

export const TodoContext = createContext<TodoContextValue | null>(null);

export function useTodoContext(): TodoContextValue {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error('useTodoContext 必须在 TodoProvider 内部使用');
  }
  return ctx;
}
