import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';
import { ArrowLeft } from 'lucide-react';

const AddExpense = () => {
  const [loading, setLoading] = useState(false);
  const { createExpense } = useExpense();
  const navigate = useNavigate();

  const handleSubmit = async (expenseData) => {
    setLoading(true);
    
    try {
      const result = await createExpense(expenseData);
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating expense:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-6 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-lg flex items-center space-x-3 btn-shimmer btn-magnetic group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </button>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold gradient-text mb-2">Add New Expense</h1>
          <p className="text-lg text-gray-600">Record a new expense to track your spending with style</p>
        </div>
      </div>

      {/* Form */}
      <ExpenseForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default AddExpense;
