import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  expenses: [],
  summary: {
    total: 0,
    categorySummary: [],
    recentExpenses: [],
    totalExpenses: 0,
  },
  loading: false,
  filters: {
    category: 'all',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalExpenses: 0,
    hasNext: false,
    hasPrev: false,
  },
};

// Action types
const EXPENSE_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_EXPENSES: 'SET_EXPENSES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  UPDATE_EXPENSE: 'UPDATE_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  SET_SUMMARY: 'SET_SUMMARY',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  CLEAR_EXPENSES: 'CLEAR_EXPENSES',
};

// Reducer
const expenseReducer = (state, action) => {
  switch (action.type) {
    case EXPENSE_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case EXPENSE_ACTIONS.SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload.expenses,
        pagination: action.payload.pagination,
        loading: false,
      };
    case EXPENSE_ACTIONS.ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        summary: {
          ...state.summary,
          totalExpenses: state.summary.totalExpenses + 1,
        },
      };
    case EXPENSE_ACTIONS.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense._id === action.payload._id ? action.payload : expense
        ),
      };
    case EXPENSE_ACTIONS.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.payload),
        summary: {
          ...state.summary,
          totalExpenses: state.summary.totalExpenses - 1,
        },
      };
    case EXPENSE_ACTIONS.SET_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case EXPENSE_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case EXPENSE_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case EXPENSE_ACTIONS.CLEAR_EXPENSES:
      return {
        ...state,
        expenses: [],
        summary: initialState.summary,
      };
    default:
      return state;
  }
};

// Create context
const ExpenseContext = createContext();

// Expense provider component
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Get expenses
  const getExpenses = async (customFilters = {}) => {
    try {
      dispatch({ type: EXPENSE_ACTIONS.SET_LOADING, payload: true });
      
      const filters = { ...state.filters, ...customFilters };
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          queryParams.append(key, value);
        }
      });
      
      const response = await axios.get(`/api/expenses?${queryParams}`);
      
      dispatch({
        type: EXPENSE_ACTIONS.SET_EXPENSES,
        payload: {
          expenses: response.data.data.expenses,
          pagination: response.data.data.pagination,
        },
      });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: EXPENSE_ACTIONS.SET_LOADING, payload: false });
      
      const message = error.response?.data?.message || 'Failed to fetch expenses';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Get expense summary
  const getExpenseSummary = async (customFilters = {}) => {
    try {
      const filters = { ...state.filters, ...customFilters };
      const queryParams = new URLSearchParams();
      
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      
      const response = await axios.get(`/api/expenses/summary?${queryParams}`);
      
      dispatch({
        type: EXPENSE_ACTIONS.SET_SUMMARY,
        payload: response.data.data,
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch summary';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Create expense
  const createExpense = async (expenseData) => {
    try {
      const response = await axios.post('/api/expenses', expenseData);
      
      dispatch({
        type: EXPENSE_ACTIONS.ADD_EXPENSE,
        payload: response.data.data.expense,
      });
      
      toast.success('Expense added successfully!');
      return { success: true, expense: response.data.data.expense };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create expense';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update expense
  const updateExpense = async (id, expenseData) => {
    try {
      const response = await axios.put(`/api/expenses/${id}`, expenseData);
      
      dispatch({
        type: EXPENSE_ACTIONS.UPDATE_EXPENSE,
        payload: response.data.data.expense,
      });
      
      toast.success('Expense updated successfully!');
      return { success: true, expense: response.data.data.expense };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update expense';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      
      dispatch({
        type: EXPENSE_ACTIONS.DELETE_EXPENSE,
        payload: id,
      });
      
      toast.success('Expense deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete expense';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({
      type: EXPENSE_ACTIONS.SET_FILTERS,
      payload: filters,
    });
  };

  // Clear expenses
  const clearExpenses = () => {
    dispatch({ type: EXPENSE_ACTIONS.CLEAR_EXPENSES });
  };

  const value = {
    ...state,
    getExpenses,
    getExpenseSummary,
    createExpense,
    updateExpense,
    deleteExpense,
    setFilters,
    clearExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use expense context
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export default ExpenseContext;
