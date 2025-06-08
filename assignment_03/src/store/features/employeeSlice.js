import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Senior Developer',
      department: 'Engineering',
      email: 'sarah.j@example.com',
      phone: '+1 234-567-8901',
      image: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager',
      department: 'Product',
      email: 'michael.c@example.com',
      phone: '+1 234-567-8902',
      image: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'UX Designer',
      department: 'Design',
      email: 'emily.r@example.com',
      phone: '+1 234-567-8903',
      image: 'https://i.pravatar.cc/150?img=9'
    },
    {
      id: 4,
      name: 'David Kim',
      position: 'Marketing Specialist',
      department: 'Marketing',
      email: 'david.k@example.com',
      phone: '+1 234-567-8904',
      image: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 5,
      name: 'Lisa Patel',
      position: 'HR Manager',
      department: 'Human Resources',
      email: 'lisa.p@example.com',
      phone: '+1 234-567-8905',
      image: 'https://i.pravatar.cc/150?img=15'
    }
  ]
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = {
        id: Date.now(),
        ...action.payload
      };
      state.employees.push(newEmployee);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
    updateEmployee: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.employees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...updates };
      }
    }
  }
});

export const { addEmployee, deleteEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer; 