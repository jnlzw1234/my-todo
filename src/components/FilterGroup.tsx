import { useTodoContext } from '../context/TodoContext';
import type { FilterType } from '../types/todo';
import styles from '../styles/Toolbar.module.css';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '待完成' },
  { key: 'completed', label: '已完成' },
];

export function FilterGroup() {
  const { filter, setFilter } = useTodoContext();

  return (
    <div className={styles.filterGroup}>
      {FILTERS.map((f) => (
        <button
          key={f.key}
          className={`${styles.filterBtn} ${filter === f.key ? styles.active : ''}`}
          onClick={() => setFilter(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
