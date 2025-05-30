import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, toggleTodo } from '../store/TodoSLice'

const TodoItems = () => {
    const todos =  useSelector((state)=>state.todo.todos)
    const dispatch = useDispatch()
  return (
    <div className="max-w-2xl mx-auto p-4">
      <ul className="space-y-3">
        {todos.map((todo)=>(
        <li key={todo.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <span className={`text-gray-800 ${todo.isChecked ? 'line-through text-gray-400' : ''}`}>{todo.text}</span>
          <div className="flex gap-2">
            <button 
              className={`p-1 ${todo.isChecked ? 'text-green-600' : 'text-gray-400'} hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200`}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.isChecked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
            <button 
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
            onClick={()=>dispatch(deleteTodo(todo.id))}
            >
              Delete
            </button>
          </div>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoItems
