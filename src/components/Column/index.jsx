// import { useMemo } from 'react';
import { shallow } from 'zustand/shallow';

import { useStore } from '../../store';

import Task from '../Task';

import styles from './index.module.css';

const Column = ({ state }) => {
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
    // following code is the same as using shallow
    // (prev, next) => {
    //   const longest = prev.length > next.length ? prev.length : next.length;

    //   for (let i = i; i < longest; i++) {
    //     if (!prev[i] || !next[i]) return false;
    //     if (prev[i] !== next[i]) return false;
    //   }
    //   return true;
    // }
  );

  // same as using shallow
  // const filtered = useMemo(
  //   () => tasks.filter((task) => task.state === state),
  //   [tasks, state]
  // );

  return (
    <div className={styles.column}>
      <div className={styles.title_wrapper}>
        <p>{state}</p>
        <button>Add</button>
      </div>

      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
    </div>
  );
};

export default Column;
