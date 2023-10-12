import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

const store = (set) => ({
  tasks: [{ title: 'Test Task', status: 'DONE', id: '1' }],
  draggedTaskId: null,
  addTask: (title, status) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          title,
          status,
          id: (Math.floor(Math.random() * (1000000 - 1 + 1)) + 1).toString(),
        },
      ],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  setDraggedTaskIdId: (id) => {
    set((state) => ({ draggedTaskId: id }));
  },
  moveTask: (id, status) => {
    return set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { id, title: task.title, status } : task
      ),
    }));
  },
});

// const log = (config) => (set, get, api) =>
//   config(
//     (...args) => {
//       console.log(args);
//       set(...args);
//     },
//     get,
//     api
//   );
// export const useStore = createWithEqualityFn(log(store, shallow));
export const useStore = createWithEqualityFn(store, shallow);
