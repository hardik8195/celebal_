import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [
    {
      id: 1,
      name: 'Alex Thompson',
      company: 'Tech Solutions Inc.',
      email: 'alex.t@techsolutions.com',
      phone: '+1 234-567-8901',
      status: 'Active',
      image: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      company: 'Global Innovations',
      email: 'maria.g@globalinnovations.com',
      phone: '+1 234-567-8902',
      status: 'Active',
      image: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 3,
      name: 'James Wilson',
      company: 'Digital Dynamics',
      email: 'james.w@digitaldynamics.com',
      phone: '+1 234-567-8903',
      status: 'Inactive',
      image: 'https://i.pravatar.cc/150?img=6'
    },
    {
      id: 4,
      name: 'Sophie Anderson',
      company: 'Creative Solutions',
      email: 'sophie.a@creativesolutions.com',
      phone: '+1 234-567-8904',
      status: 'Active',
      image: 'https://i.pravatar.cc/150?img=7'
    },
    {
      id: 5,
      name: 'Robert Zhang',
      company: 'Future Tech',
      email: 'robert.z@futuretech.com',
      phone: '+1 234-567-8905',
      status: 'Active',
      image: 'https://i.pravatar.cc/150?img=10'
    }
  ]
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      const newCustomer = {
        id: Date.now(),
        ...action.payload
      };
      state.customers.push(newCustomer);
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(cust => cust.id !== action.payload);
    },
    updateCustomer: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.customers.findIndex(cust => cust.id === id);
      if (index !== -1) {
        state.customers[index] = { ...state.customers[index], ...updates };
      }
    }
  }
});

export const { addCustomer, deleteCustomer, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer; 