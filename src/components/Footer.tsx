import { useTodoContext } from '../context/TodoContext';
import styles from '../styles/Footer.module.css';

export function Footer() {
  const { stats, clearCompleted } = useTodoContext();

  if (stats.total === 0) return null;

  const handleClear = () => {
    if (stats.done === 0) return;
    if (window.confirm(`确定要清除 ${stats.done} 项已完成的待办吗？`)) {
      clearCompleted();
    }
  };

  return (
    <div className={styles.footer}>
      <button className={styles.clearBtn} onClick={handleClear}>
        清除已完成
      </button>
      <span className={styles.info}>
        共 {stats.total} 项，{stats.done} 项已完成
      </span>
    </div>
  );
}
