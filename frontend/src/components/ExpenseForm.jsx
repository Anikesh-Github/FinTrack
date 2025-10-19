import { useState, useEffect } from 'react';
import { Calendar, Tag, DollarSign, FileText, ArrowLeft, Plus } from 'lucide-react';

const ExpenseForm = ({ expense, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    note: '',
  });

  const categories = [
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills',
    'Healthcare',
    'Education',
    'Travel',
    'Other',
  ];

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title || '',
        amount: expense.amount || '',
        category: expense.category || '',
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
        note: expense.note || '',
      });
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!formData.amount || formData.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (!formData.category) {
      alert('Please select a category');
      return;
    }
    
    if (!formData.date) {
      alert('Please select a date');
      return;
    }

    // Convert amount to number
    const submitData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">
            {expense ? 'Edit Expense' : 'Add New Expense'}
          </h2>
        </div>
        <div className="card-content space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter expense title"
              className="input"
              required
            />
          </div>

          {/* Amount and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Amount *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Note (Optional)
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add a note about this expense"
              rows={3}
              className="input resize-none"
            />
          </div>
        </div>
        <div className="card-footer  -mx-6 -mb-6 rounded-b-2xl">
          <div className="flex items-center justify-between p-6 gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn btn-ghost btn-lg flex items-center space-x-2 btn-shimmer btn-magnetic group"
              disabled={loading}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            
            <button
              type="submit"
              className="btn btn-hero btn-xl flex items-center space-x-3 btn-shimmer btn-magnetic group"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span className="font-bold">{expense ? 'Updating...' : 'Adding...'}</span>
                </div>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  <span className="font-bold">{expense ? 'Update Expense' : 'Add Expense'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
