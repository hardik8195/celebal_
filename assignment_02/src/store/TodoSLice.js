import { createSlice, nanoid } from "@reduxjs/toolkit"

// Load initial state from localStorage or use default
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            return {
                todos: [{
                    id: 1,
                    text: "Hello World",
                    isChecked: true
                }]
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            todos: [{
                id: 1,
                text: "Hello World",
                isChecked: true
            }]
        };
    }
};

const initialState = loadState();

const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                isChecked: false
            }
            state.todos.push(todo)
            // Save to localStorage
            localStorage.setItem('todos', JSON.stringify(state));
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            // Save to localStorage
            localStorage.setItem('todos', JSON.stringify(state));
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.isChecked = !todo.isChecked;
                // Save to localStorage
                localStorage.setItem('todos', JSON.stringify(state));
            }
        }
    }
})

export const { addTodo, deleteTodo, toggleTodo } = TodoSlice.actions
export default TodoSlice.reducer