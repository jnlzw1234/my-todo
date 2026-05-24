import { useReducer, useMemo, useCallback, useEffect } from 'react';
import type { Todo, TodoState, TodoAction, TodoStats, FilterType, Priority, Category } from '../types/todo';
import { useLocalStorage } from './useLocalStorage';
import { isOverdue } from '../utils/date';
import { genId } from '../utils/id';

const STORAGE_KEY = 'my_todo_app_data';

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO': {
      const todo: Todo = {
        id: genId(),
        title: action.payload.title,
        completed: false,
        priority: action.payload.priority,
        category: action.payload.category,
        dueDate: action.payload.dueDate,
        createdAt: new Date().toISOString(),
      };
      return { ...state, todos: [todo, ...state.todos] };
    }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload.id),
        editingId: state.editingId === action.payload.id ? null : state.editingId,
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id && action.payload.title.trim()
            ? { ...t, title: action.payload.title.trim() }
            : t
        ),
        editingId: null,
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed),
      };
    case 'REORDER_TODOS': {
      const { fromId, toId } = action.payload;
      const fromIdx = state.todos.findIndex((t) => t.id === fromId);
      const toIdx = state.todos.findIndex((t) => t.id === toId);
      if (fromIdx === -1 || toIdx === -1) return state;
      const newTodos = [...state.todos];
      [newTodos[fromIdx], newTodos[toIdx]] = [newTodos[toIdx], newTodos[fromIdx]];
      return { ...state, todos: newTodos };
    }
    case 'SET_FILTER':
      return { ...state, filter: action.payload.filter };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload.query };
    case 'SET_EDITING':
      return { ...state, editingId: action.payload.id };
    default:
      return state;
  }
}

export function useTodos() {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);

  const [state, dispatch] = useReducer(todoReducer, {
    todos: storedTodos,
    filter: 'all',
    searchQuery: '',
    editingId: null,
  });

  // 同步 todos 到 localStorage
  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  // 筛选 + 搜索
  const filteredTodos = useMemo(() => {
    let result = state.todos;
    if (state.filter === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (state.filter === 'completed') {
      result = result.filter((t) => t.completed);
    }
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.trim().toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || t.category.includes(q)
      );
    }
    return result;
  }, [state.todos, state.filter, state.searchQuery]);

  // 统计
  const stats = useMemo<TodoStats>(() => {
    const total = state.todos.length;
    const active = state.todos.filter((t) => !t.completed).length;
    const done = total - active;
    const overdue = state.todos.filter((t) => isOverdue(t.dueDate, t.completed)).length;
    return { total, active, done, overdue };
  }, [state.todos]);

  const addTodo = useCallback(
    (title: string, priority: Priority, category: Category, dueDate: string) => {
      if (!title.trim()) return;
      dispatch({ type: 'ADD_TODO', payload: { title: title.trim(), priority, category, dueDate } });
    },
    []
  );

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  }, []);

  const updateTodo = useCallback((id: string, title: string) => {
    if (!title.trim()) return;
    dispatch({ type: 'UPDATE_TODO', payload: { id, title } });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  const reorderTodos = useCallback((fromId: string, toId: string) => {
    dispatch({ type: 'REORDER_TODOS', payload: { fromId, toId } });
  }, []);

  const setFilter = useCallback((filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: { filter } });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: { query } });
  }, []);

  const setEditingId = useCallback((id: string | null) => {
    dispatch({ type: 'SET_EDITING', payload: { id } });
  }, []);

  return {
    todos: state.todos,
    filteredTodos,
    stats,
    filter: state.filter,
    searchQuery: state.searchQuery,
    editingId: state.editingId,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    reorderTodos,
    setFilter,
    setSearchQuery,
    setEditingId,
  };
}
