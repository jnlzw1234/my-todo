import { useState, useCallback } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import styles from '../styles/TodoList.module.css';

export function TodoList() {
  const { filteredTodos, reorderTodos, editingId } = useTodoContext();
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id !== dragId) {
      setDragOverId(id);
    }
  }, [dragId]);

  const handleDrop = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (dragId && id !== dragId) {
      reorderTodos(dragId, id);
    }
    setDragId(null);
    setDragOverId(null);
  }, [dragId, reorderTodos]);

  const handleDragEnd = useCallback(() => {
    setDragId(null);
    setDragOverId(null);
  }, []);

  if (filteredTodos.length === 0) {
    return (
      <div className={styles.todoList}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          isDragging={dragId === todo.id}
          isDragOver={dragOverId === todo.id}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}
