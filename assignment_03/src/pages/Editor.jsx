import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import {
  updateDocumentContent,
  updateDocumentTitle,
  saveDocument,
  loadDocument,
  togglePreview,
  loadDocumentsFromStorage,
  setCurrentDocument
} from '../store/editorSlice';

const Editor = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  
  const {
    currentDocument,
    documents = [],
    templates = ['Meeting Notes', 'Project Plan', 'Weekly Report'],
    collaborators = [],
    isPreview = false
  } = useSelector((state) => state.editor) || {};

  useEffect(() => {
    // Initialize current document if not set
    if (!currentDocument || !currentDocument.id) {
      dispatch(setCurrentDocument({
        id: Date.now(),
        title: 'Untitled Document',
        content: '',
        lastEdited: 'Just now'
      }));
    }

    // Load documents from localStorage on component mount
    const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]');
    if (savedDocs.length > 0) {
      dispatch(loadDocumentsFromStorage(savedDocs));
    }
  }, [dispatch, currentDocument]);

  const handleToolbarAction = (action) => {
    const textarea = editorRef.current;
    if (!textarea || !currentDocument) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = currentDocument.content.substring(start, end);
    let newContent = currentDocument.content;

    switch (action) {
      case 'Bold':
        newContent = currentDocument.content.substring(0, start) + `**${selectedText}**` + currentDocument.content.substring(end);
        break;
      case 'Italic':
        newContent = currentDocument.content.substring(0, start) + `*${selectedText}*` + currentDocument.content.substring(end);
        break;
      case 'Underline':
        newContent = currentDocument.content.substring(0, start) + `__${selectedText}__` + currentDocument.content.substring(end);
        break;
      case 'Heading 1':
        newContent = currentDocument.content.substring(0, start) + `# ${selectedText}` + currentDocument.content.substring(end);
        break;
      case 'Heading 2':
        newContent = currentDocument.content.substring(0, start) + `## ${selectedText}` + currentDocument.content.substring(end);
        break;
      case 'Bullet List':
        newContent = currentDocument.content.substring(0, start) + `- ${selectedText}` + currentDocument.content.substring(end);
        break;
      case 'Add Link':
        const url = prompt('Enter URL:');
        if (url) {
          newContent = currentDocument.content.substring(0, start) + `[${selectedText}](${url})` + currentDocument.content.substring(end);
        }
        break;
      case 'Insert Image':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          newContent = currentDocument.content.substring(0, start) + `![${selectedText}](${imageUrl})` + currentDocument.content.substring(end);
        }
        break;
      default:
        return;
    }

    dispatch(updateDocumentContent(newContent));
  };

  const handleSave = () => {
    if (!currentDocument) return;
    
    dispatch(saveDocument(currentDocument));
    
    // Save to localStorage
    const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]');
    localStorage.setItem('documents', JSON.stringify([...savedDocs, currentDocument]));

    alert('Document saved successfully!');
  };

  const handleTemplateSelect = (template) => {
    const templateContent = {
      'Meeting Notes': '# Meeting Notes\n\n## Agenda\n- \n\n## Action Items\n- \n\n## Next Steps\n- ',
      'Project Plan': '# Project Plan\n\n## Overview\n\n## Timeline\n\n## Resources\n\n## Risks\n',
      'Weekly Report': '# Weekly Report\n\n## Accomplishments\n- \n\n## Challenges\n- \n\n## Next Week\n- '
    };

    dispatch(updateDocumentContent(templateContent[template] || ''));
  };

  const handleDocumentSelect = (doc) => {
    dispatch(loadDocument(doc));
  };

  const renderPreview = () => {
    if (!currentDocument) return null;
    
    // Simple markdown preview
    const previewContent = currentDocument.content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/- (.*?)$/gm, '<li>$1</li>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    return (
      <div 
        className="w-full h-[500px] text-gray-800 p-4 overflow-auto"
        dangerouslySetInnerHTML={{ __html: previewContent }}
      />
    );
  };

  const toolbarItems = [
    { icon: 'B', label: 'Bold' },
    { icon: 'I', label: 'Italic' },
    { icon: 'U', label: 'Underline' },
    { icon: 'H1', label: 'Heading 1' },
    { icon: 'H2', label: 'Heading 2' },
    { icon: 'List', label: 'Bullet List' },
    { icon: 'Link', label: 'Add Link' },
    { icon: 'Image', label: 'Insert Image' }
  ];

  if (!currentDocument) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center text-gray-500">Loading editor...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editor</h1>
        <div className="space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg ${isPreview ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => dispatch(togglePreview())}
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Title Input */}
        <div className="p-4 border-b">
          <input
            type="text"
            value={currentDocument.title || ''}
            onChange={(e) => dispatch(updateDocumentTitle(e.target.value))}
            placeholder="Enter title..."
            className="w-full text-2xl font-bold text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Toolbar */}
        <div className="border-b p-2 flex items-center space-x-2 overflow-x-auto">
          {toolbarItems.map((item, index) => (
            <button
              key={index}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800"
              title={item.label}
              onClick={() => handleToolbarAction(item.label)}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* Editor/Preview */}
        <div className="p-4">
          {isPreview ? (
            renderPreview()
          ) : (
            <textarea
              ref={editorRef}
              value={currentDocument.content || ''}
              onChange={(e) => dispatch(updateDocumentContent(e.target.value))}
              placeholder="Start writing..."
              className="w-full h-[500px] text-gray-800 placeholder-gray-400 focus:outline-none resize-none"
            />
          )}
        </div>

        {/* Status Bar */}
        <div className="border-t p-2 flex justify-between items-center text-sm text-gray-500">
          <div>
            {(currentDocument.content || '').length} characters
          </div>
          <div className="space-x-4">
            <button className="hover:text-gray-700">Auto-save</button>
            <button className="hover:text-gray-700">Help</button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Recent Documents</h3>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => handleDocumentSelect(doc)}
              >
                <div className="font-medium">{doc.title}</div>
                <div className="text-sm text-gray-500">Last edited {doc.lastEdited}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Templates</h3>
          <div className="space-y-2">
            {templates.map((template, index) => (
              <button 
                key={index}
                className="w-full p-2 text-left hover:bg-gray-50 rounded"
                onClick={() => handleTemplateSelect(template)}
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Collaborators</h3>
          <div className="space-y-2">
            {collaborators.map((collaborator, index) => (
              <div key={index} className="flex items-center space-x-2">
                <img
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium">{collaborator.name}</div>
                  <div className="text-sm text-gray-500">{collaborator.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Editor; 