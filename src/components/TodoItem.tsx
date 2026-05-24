import { useTodoContext } from '../context/TodoContext';
import { TodoEditForm } from './TodoEditForm';
import { TodoMeta } from './TodoMeta';
import type { Todo } from '../types/todo';
import styles from '../styles/TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDrop: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
}

export function TodoItem({
  todo,
  isEditing,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TodoItemProps) {
  const { toggleTodo, deleteTodo, setEditingId } = useTodoContext();

  let className = `${styles.todoItem} todo-priority-${todo.priority}`;
  if (todo.completed) className += ` ${styles.completed}`;
  if (isDragging) className += ` ${styles.dragging}`;
  if (isDragOver) className += ` ${styles.dragOver}`;
  if (isEditing) className += ` ${styles.editing}`;

  return (
    <div
      className={className}
      draggable={!isEditing}
      onDragStart={(e) => onDragStart(e, todo.id)}
      onDragOver={(e) => onDragOver(e, todo.id)}
      onDrop={(e) => onDrop(e, todo.id)}
      onDragEnd={onDragEnd}
    >
      {/* 复选框 */}
      <div
        className={`${styles.checkbox} ${todo.completed ? styles.checked : ''}`}
        onClick={() => toggleTodo(todo.id)}
      />

      {/* 展示模式 */}
      <div className={styles.todoContent}>
        <div className={styles.todoTitle}>{todo.title}</div>
        <TodoMeta todo={todo} />
      </div>

      {/* 编辑模式 */}
      {isEditing && (
        <div className={styles.editForm}>
          <TodoEditForm todo={todo} />
        </div>
      )}

      {/* 操作按钮 */}
      {!isEditing && (
        <div className={styles.todoActions}>
          <button
            className={styles.btnEdit}
            title="编辑"
            onClick={() => setEditingId(todo.id)}
          >
            ✏️
          </button>
          <button
            className={styles.btnDelete}
            title="删除"
            onClick={() => deleteTodo(todo.id)}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
