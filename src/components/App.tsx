import { useTodos } from '../hooks/useTodos';
import { TodoContext } from '../context/TodoContext';
import { Header } from './Header';
import { StatsBar } from './StatsBar';
import { AddTodoForm } from './AddTodoForm';
import { Toolbar } from './Toolbar';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import styles from '../styles/App.module.css';

export default function App() {
  const todoData = useTodos();

  return (
    <TodoContext.Provider value={todoData}>
      <div className={styles.app}>
        <Header />
        <StatsBar />
        <AddTodoForm />
        <Toolbar />
        <TodoList />
        <Footer />
      </div>
    </TodoContext.Provider>
  );
}
