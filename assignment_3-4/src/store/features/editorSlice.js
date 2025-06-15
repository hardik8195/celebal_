import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDocument: null,
  documents: [],
  isPreview: false
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
    addDocument: (state, action) => {
      state.documents.push(action.payload);
    },
    updateDocument: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.documents.findIndex(doc => doc.id === id);
      if (index !== -1) {
        state.documents[index] = { ...state.documents[index], ...updates };
      }
    },
    deleteDocument: (state, action) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
    },
    togglePreview: (state) => {
      state.isPreview = !state.isPreview;
    }
  }
});

export const {
  setCurrentDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  togglePreview
} = editorSlice.actions;

export default editorSlice.reducer; 