import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const EditExpense = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState(null);
  const [loadingExpense, setLoadingExpense] = useState(true);
  const [error, setError] = useState(null);
  
  const { updateExpense } = useExpense();
  const navigate = useNavigate();

  // Load expense data
  useEffect(() => {
    const loadExpense = async () => {
      try {
        setLoadingExpense(true);
        setError(null);
        
        // In a real app, you might want to fetch the expense from the API
        // For now, we'll get it from the expenses list in context
        // This is a simplified approach - in production you'd want a dedicated API call
        
        // Simulate loading the expense
        // In a real implementation, you'd call an API endpoint like:
        // const response = await axios.get(`/api/expenses/${id}`);
        // setExpense(response.data.data.expense);
        
        // For now, we'll show a placeholder
        setExpense({
          _id: id,
          title: 'Loading...',
          amount: 0,
          category: '',
          date: new Date(),
          note: '',
        });
        
      } catch (error) {
        console.error('Error loading expense:', error);
        setError('Failed to load expense');
      } finally {
        setLoadingExpense(false);
      }
    };

    if (id) {
      loadExpense();
    }
  }, [id]);

  const handleSubmit = async (expenseData) => {
    setLoading(true);
    
    try {
      const result = await updateExpense(id, expenseData);
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingExpense) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Expense</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold gradient-text mb-2">Edit Expense</h1>
          <p className="text-lg text-gray-600">Update your expense details with precision</p>
        </div>
      </div>

      {/* Form */}
      <ExpenseForm
        expense={expense}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditExpense;
