// import { useMemo } from 'react';
// import { shallow } from 'zustand/shallow';

import { useState } from 'react';

import { useStore } from '../../store';

import Task from '../Task';

import styles from './index.module.css';

const Column = ({ status }) => {
  const { tasks, addTask, setDraggedTaskIdId, draggedTaskId, moveTask } =
    useStore((store) => store);
  const filteredTasks = tasks.filter((task) => task.status === status);

  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  // const tasks = useStore(
  //   (store) => store.tasks.filter((task) => task.status === status)
  // towards v5 "shallow" is used at creation. check store.js file
  // , shallow

  // following code is the same as using shallow
  // (prev, next) => {
  //   const longest = prev.length > next.length ? prev.length : next.length;

  //   for (let i = i; i < longest; i++) {
  //     if (!prev[i] || !next[i]) return false;
  //     if (prev[i] !== next[i]) return false;
  //   }
  //   return true;
  // }
  // );
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrop(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrop(false);
  };

  const handleDrop = () => {
    setDrop(false);
    moveTask(draggedTaskId, status);
    setDraggedTaskIdId(null);
  };

  return (
    <div
      className={`${styles.column} ${drop && styles.drop}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.title_wrapper}>
        <p>{status}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>

      {filteredTasks.map((task) => (
        <Task key={task.id} id={task.id} />
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
