import { useTodoContext } from '../context/TodoContext';
import styles from '../styles/TodoList.module.css';

export function EmptyState() {
  const { todos } = useTodoContext();
  const hasAnyTodos = todos.length > 0;

  return (
    <div className={styles.emptyState ?? ''} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-secondary)' }}>
      <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}>
        {hasAnyTodos ? '🔍' : '📝'}
      </div>
      <div>
        {hasAnyTodos ? '没有匹配的待办事项 🔍' : '还没有待办事项，添加一个吧 ✨'}
      </div>
    </div>
  );
}
