import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Layout from '../components/Layout';
import { addTask, removeTask, updateTask, moveTask, reorderTasks } from '../store/features/kanbanSlice';

const defaultColumns = {
  todo: { id: 'todo', title: 'To Do', items: [] },
  inProgress: { id: 'inProgress', title: 'In Progress', items: [] },
  review: { id: 'review', title: 'Review', items: [] },
  done: { id: 'done', title: 'Done', items: [] }
};

const Kanban = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state?.kanban?.columns ?? defaultColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    column: 'todo'
  });

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      dispatch(addTask({ columnId: newTask.column, task: newTask }));
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        column: 'todo'
      });
      setIsModalOpen(false);
    }
  };

  const handleRemoveTask = (columnId, taskId) => {
    dispatch(removeTask({ columnId, taskId }));
  };

  const handleUpdateTask = (columnId, taskId, updates) => {
    dispatch(updateTask({ columnId, taskId, updates }));
    setEditingTask(null);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      dispatch(reorderTasks({
        columnId: source.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }));
    } else {
      dispatch(moveTask({
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        taskId: parseInt(result.draggableId)
      }));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {column.items.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-lg shadow"
                          >
                            {editingTask?.id === task.id ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={editingTask.title}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    title: e.target.value
                                  })}
                                  className="w-full p-2 border rounded"
                                />
                                <select
                                  value={editingTask.priority}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    priority: e.target.value
                                  })}
                                  className="w-full p-2 border rounded"
                                >
                                  <option value="low">Low</option>
                                  <option value="medium">Medium</option>
                                  <option value="high">High</option>
                                </select>
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => setEditingTask(null)}
                                    className="px-3 py-1 text-gray-600 hover:text-gray-800"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleUpdateTask(columnId, task.id, {
                                      title: editingTask.title,
                                      priority: editingTask.priority
                                    })}
                                    className="px-3 py-1 text-blue-600 hover:text-blue-800"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium">{task.title}</h3>
                                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                </div>
                                <div className="flex justify-end mt-2 space-x-2">
                                  <button
                                    onClick={() => setEditingTask(task)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleRemoveTask(columnId, task.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Column</label>
                <select
                  value={newTask.column}
                  onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Kanban; 