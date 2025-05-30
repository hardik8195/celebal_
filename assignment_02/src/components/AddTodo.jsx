import React, { useState } from 'react'
import { addTodo } from '../store/TodoSLice';
import { useDispatch } from 'react-redux';

const AddTodo = () => {
    const [todo,setTodo] = useState("");
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo(todo));
        setTodo("");
    }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={todo}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e)=>setTodo(e.target.value)}
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo
