import { SearchInput } from './SearchInput';
import { FilterGroup } from './FilterGroup';
import styles from '../styles/Toolbar.module.css';

export function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <SearchInput />
      <FilterGroup />
    </div>
  );
}
