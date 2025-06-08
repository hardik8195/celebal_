import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  documents: [],
  currentDocument: {
    id: null,
    title: '',
    content: '',
    lastEdited: ''
  },
  templates: [
    'Meeting Notes',
    'Project Plan',
    'Weekly Report'
  ],
  collaborators: [
    { id: 1, name: 'John Doe', role: 'Owner', initials: 'JD' },
    { id: 2, name: 'Jane Smith', role: 'Editor', initials: 'JS' }
  ],
  isPreview: false
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
    updateDocumentContent: (state, action) => {
      state.currentDocument.content = action.payload;
    },
    updateDocumentTitle: (state, action) => {
      state.currentDocument.title = action.payload;
    },
    saveDocument: (state, action) => {
      const newDoc = {
        ...action.payload,
        id: Date.now(),
        lastEdited: 'Just now'
      };
      state.documents = [newDoc, ...state.documents.slice(0, 4)];
      state.currentDocument = newDoc;
    },
    loadDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
    togglePreview: (state) => {
      state.isPreview = !state.isPreview;
    },
    loadDocumentsFromStorage: (state, action) => {
      state.documents = action.payload;
    }
  }
});

export const {
  setCurrentDocument,
  updateDocumentContent,
  updateDocumentTitle,
  saveDocument,
  loadDocument,
  togglePreview,
  loadDocumentsFromStorage
} = editorSlice.actions;

export default editorSlice.reducer; 