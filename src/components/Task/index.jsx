import { useStore } from '../../store';

import trash from '../../assets/trash-2.svg';

import styles from './index.module.css';

const Task = ({ id }) => {
  const { tasks, deleteTask, setDraggedTaskIdId } = useStore((store) => store);
  const specificTask = tasks.find((task) => task.id === id);

  return (
    <div
      className={styles.task}
      draggable
      onDragStart={() => setDraggedTaskIdId(id)}
    >
      <div>{specificTask.title}</div>
      <div className={styles.bottom_wrapper}>
        <div>
          <img src={trash} alt="" onClick={() => deleteTask(id)} />
        </div>
        <div
          className={`${styles.status} ${
            styles[specificTask.status.toLowerCase()]
          }`}
        >
          {specificTask.status}
        </div>
      </div>
    </div>
  );
};

export default Task;
