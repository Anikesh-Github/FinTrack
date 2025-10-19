import { Link } from 'react-router-dom';
import { Calendar, Tag, DollarSign, Edit, Trash2 } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

const ExpenseCard = ({ expense }) => {
  const { deleteExpense } = useExpense();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(expense._id);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-100 text-orange-800',
      Transportation: 'bg-blue-100 text-blue-800',
      Entertainment: 'bg-purple-100 text-purple-800',
      Shopping: 'bg-pink-100 text-pink-800',
      Bills: 'bg-red-100 text-red-800',
      Healthcare: 'bg-green-100 text-green-800',
      Education: 'bg-indigo-100 text-indigo-800',
      Travel: 'bg-yellow-100 text-yellow-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.Other;
  };

  return (
    <div className="card pt-4 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="card-content">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {expense.title}
              </h3>
              <span className="text-2xl font-bold gradient-text">
                {formatAmount(expense.amount)}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{formatDate(expense.date)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className={`badge ${getCategoryColor(expense.category)}`}>
                  {expense.category}
                </span>
              </div>
            </div>
            
            {expense.note && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700 line-clamp-2">
                  {expense.note}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gradient-to-r from-gray-100 to-gray-200">
          <Link
            to={`/edit-expense/${expense._id}`}
            className="btn btn-secondary btn-sm flex items-center space-x-2 btn-shimmer btn-magnetic group"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
          
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm flex items-center space-x-2 btn-shimmer btn-magnetic btn-ripple group"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
