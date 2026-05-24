import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTodoContext } from '../context/TodoContext';
import styles from '../styles/Toolbar.module.css';

export const SearchInput = forwardRef<HTMLInputElement>(function SearchInput(_props, ref) {
  const { searchQuery, setSearchQuery } = useTodoContext();
  const innerRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => innerRef.current!);

  return (
    <input
      ref={innerRef}
      className={styles.searchInput}
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="🔍 搜索待办…"
    />
  );
});
