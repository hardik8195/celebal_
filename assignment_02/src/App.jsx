import React from 'react'
import AddTodo from './components/AddTodo.jsx'
import TodoItems from './components/TodoItems.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

const App = () => {
  return (
    <Provider store={store}>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Todo App</h1>
        <AddTodo />
        <TodoItems />
      </div>
    </div>
    </Provider>
  )
}

export default App
