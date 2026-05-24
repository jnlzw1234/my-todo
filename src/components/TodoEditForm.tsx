import { useState, useRef, useEffect } from 'react';
import { useTodoContext } from '../context/TodoContext';
import type { Todo } from '../types/todo';
import styles from '../styles/TodoItem.module.css';

interface TodoEditFormProps {
  todo: Todo;
}

export function TodoEditForm({ todo }: TodoEditFormProps) {
  const { updateTodo, setEditingId } = useTodoContext();
  const [value, setValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSave = () => {
    if (value.trim()) {
      updateTodo(todo.id, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.editBtnPrimary} type="button" onClick={handleSave}>
        保存
      </button>
      <button
        className={styles.editBtnGhost}
        type="button"
        onClick={() => setEditingId(null)}
      >
        取消
      </button>
    </>
  );
}
