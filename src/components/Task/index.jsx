import { useStore } from '../../store';

import styles from './index.module.css';

const Task = ({ title }) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  return (
    <div className={styles.task}>
      <div>{task.title}</div>
      <div className={styles.bottom_wrapper}>
        <div></div>
        <div
          className={`${styles.status} ${styles[task.status.toLowerCase()]}`}
        >
          {task.status}
        </div>
      </div>
    </div>
  );
};

export default Task;
