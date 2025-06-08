import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './features/editorSlice';
import sidebarReducer from './features/sidebarSlice';
import kanbanReducer from './features/kanbanSlice';
import employeeReducer from './features/employeeSlice';
import customerReducer from './features/customerSlice';

const store = configureStore({
  reducer: {
    editor: editorReducer,
    sidebar: sidebarReducer,
    kanban: kanbanReducer,
    employees: employeeReducer,
    customers: customerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store; 