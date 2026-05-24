import styles from '../styles/Header.module.css';

export function Header() {
  return (
    <div className={styles.header}>
      <h1>📋 待办事项</h1>
      <p className={styles.subtitle}>拖拽排序 · 本地存储 · 自动保存</p>
    </div>
  );
}
