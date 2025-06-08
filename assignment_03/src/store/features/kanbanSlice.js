import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      items: [
        { id: 1, title: 'Design new dashboard', priority: 'high' },
        { id: 2, title: 'Update documentation', priority: 'medium' },
        { id: 3, title: 'Fix navigation bug', priority: 'low' }
      ]
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      items: [
        { id: 4, title: 'Implement authentication', priority: 'high' },
        { id: 5, title: 'Create API endpoints', priority: 'medium' }
      ]
    },
    review: {
      id: 'review',
      title: 'Review',
      items: [
        { id: 6, title: 'Code review for PR #123', priority: 'high' },
        { id: 7, title: 'Test new features', priority: 'medium' }
      ]
    },
    done: {
      id: 'done',
      title: 'Done',
      items: [
        { id: 8, title: 'Setup CI/CD pipeline', priority: 'high' },
        { id: 9, title: 'Deploy to production', priority: 'high' }
      ]
    }
  }
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      const newTask = {
        id: Date.now(),
        ...task
      };
      state.columns[columnId].items.push(newTask);
    },
    removeTask: (state, action) => {
      const { columnId, taskId } = action.payload;
      state.columns[columnId].items = state.columns[columnId].items.filter(
        task => task.id !== taskId
      );
    },
    updateTask: (state, action) => {
      const { columnId, taskId, updates } = action.payload;
      const taskIndex = state.columns[columnId].items.findIndex(
        task => task.id === taskId
      );
      if (taskIndex !== -1) {
        state.columns[columnId].items[taskIndex] = {
          ...state.columns[columnId].items[taskIndex],
          ...updates
        };
      }
    },
    moveTask: (state, action) => {
      const { sourceColumnId, destinationColumnId, taskId } = action.payload;
      const task = state.columns[sourceColumnId].items.find(
        task => task.id === taskId
      );
      if (task) {
        state.columns[sourceColumnId].items = state.columns[sourceColumnId].items.filter(
          task => task.id !== taskId
        );
        state.columns[destinationColumnId].items.push(task);
      }
    },
    reorderTasks: (state, action) => {
      const { columnId, sourceIndex, destinationIndex } = action.payload;
      const column = state.columns[columnId];
      const [removed] = column.items.splice(sourceIndex, 1);
      column.items.splice(destinationIndex, 0, removed);
    }
  }
});

export const {
  addTask,
  removeTask,
  updateTask,
  moveTask,
  reorderTasks
} = kanbanSlice.actions;

export default kanbanSlice.reducer; 