import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/sidebarSlice';
import kanbanReducer from './features/kanbanSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    kanban: kanbanReducer,
  },
}); 