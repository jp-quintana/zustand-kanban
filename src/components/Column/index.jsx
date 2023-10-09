// import { useMemo } from 'react';
import { shallow } from 'zustand/shallow';

import { useState } from 'react';

import { useStore } from '../../store';

import Task from '../Task';

import styles from './index.module.css';

const Column = ({ status }) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.status === status),
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
  const addTask = useStore((store) => store.addTask);

  // same as using shallow
  // const filtered = useMemo(
  //   () => tasks.filter((task) => task.status === status),
  //   [tasks, status]
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(text, status);
    setText('');
    setOpen(false);
  };

  return (
    <div className={styles.column}>
      <div className={styles.title_wrapper}>
        <p>{status}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>

      {tasks.map((task) => (
        <Task key={Math.random()} title={task.title} />
      ))}
      {open && (
        <div className={styles.modal}>
          <form className={styles.modal_content} onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Column;
