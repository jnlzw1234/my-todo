import type { Todo } from '../types/todo';
import { isOverdue, isToday, formatDate } from '../utils/date';
import styles from '../styles/TodoItem.module.css';

const PRIORITY_LABEL: Record<string, string> = { high: '高', medium: '中', low: '低' };
const CATEGORY_LABEL: Record<string, string> = {
  work: '工作',
  personal: '个人',
  study: '学习',
  other: '其他',
};

interface TodoMetaProps {
  todo: Todo;
}

export function TodoMeta({ todo }: TodoMetaProps) {
  const overdue = isOverdue(todo.dueDate, todo.completed);
  const today = isToday(todo.dueDate, todo.completed);

  const dueClass = overdue ? 'due-date-overdue' : today ? 'due-date-today' : '';

  return (
    <div className={styles.todoMeta}>
      <span className={`${styles.tag} tag-priority-${todo.priority}`}>
        {PRIORITY_LABEL[todo.priority]}优先级
      </span>
      <span className={`${styles.tag} tag-${todo.category}`}>
        {CATEGORY_LABEL[todo.category]}
      </span>
      {todo.dueDate && (
        <span className={`${styles.dueDate} ${dueClass}`}>
          {overdue ? '⚠️' : '📅'} {formatDate(todo.dueDate)}
          {overdue ? ' 已逾期' : today ? ' 今天' : ''}
        </span>
      )}
    </div>
  );
}
