import { useTodoContext } from '../context/TodoContext';
import styles from '../styles/StatsBar.module.css';

export function StatsBar() {
  const { stats } = useTodoContext();

  return (
    <div className={styles.stats}>
      <div className={styles.statItem}>
        <div className={styles.num}>{stats.total}</div>
        <div className={styles.label}>全部</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.num}>{stats.active}</div>
        <div className={styles.label}>待完成</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.num}>{stats.done}</div>
        <div className={styles.label}>已完成</div>
      </div>
      <div className={`${styles.statItem} ${styles.overdue}`}>
        <div className={styles.num}>{stats.overdue}</div>
        <div className={styles.label}>已逾期</div>
      </div>
    </div>
  );
}
