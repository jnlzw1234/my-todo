import { useState, useRef, type FormEvent } from 'react';
import { useTodoContext } from '../context/TodoContext';
import type { Priority, Category } from '../types/todo';
import styles from '../styles/AddTodoForm.module.css';

export function AddTodoForm() {
  const { addTodo } = useTodoContext();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('work');
  const [dueDate, setDueDate] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title.trim(), priority, category, dueDate);
    setTitle('');
    setDueDate('');
    inputRef.current?.focus();
  };

  return (
    <form className={styles.addForm} onSubmit={handleSubmit} autoComplete="off">
      <input
        ref={inputRef}
        className={styles.titleInput}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="输入新的待办事项…"
        maxLength={200}
      />
      <div className={styles.row}>
        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          <option value="medium">🟡 中优先级</option>
          <option value="high">🔴 高优先级</option>
          <option value="low">🟢 低优先级</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          <option value="work">💼 工作</option>
          <option value="personal">🏠 个人</option>
          <option value="study">📚 学习</option>
          <option value="other">📌 其他</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button className={styles.submitBtn} type="submit">
        添加待办
      </button>
    </form>
  );
}
