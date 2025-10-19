import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import { Plus, RefreshCw, AlertCircle } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import FilterBar from '../components/FilterBar';
import ExpenseCard from '../components/ExpenseCard';

const Dashboard = () => {
  const {
    expenses,
    summary,
    loading,
    filters,
    pagination,
    getExpenses,
    getExpenseSummary,
    setFilters,
  } = useExpense();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data when filters change
  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        getExpenses(),
        getExpenseSummary(),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    loadData();
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
          <p className="text-lg text-gray-600">Track and manage your daily expenses with style</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn btn-secondary btn-md flex items-center space-x-2 btn-shimmer btn-magnetic group"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <Link
            to="/add-expense"
            className="btn btn-primary btn-lg flex items-center space-x-2 btn-shimmer btn-magnetic btn-glow group"
          >
            <Plus className="w-6 h-6" />
            <span>Add Expense</span>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCard summary={summary} />

      {/* Filters */}
      <FilterBar onFilterChange={handleFilterChange} filters={filters} />

      {/* Expenses List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Expenses
            {pagination.totalExpenses > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({pagination.totalExpenses} total)
              </span>
            )}
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && expenses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
            <p className="text-gray-500 mb-6">
              {Object.values(filters).some(filter => filter && filter !== 'all')
                ? 'Try adjusting your filters to see more results.'
                : 'Get started by adding your first expense.'}
            </p>
            <Link
              to="/add-expense"
              className="btn btn-primary flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Expense</span>
            </Link>
          </div>
        )}

        {/* Expenses Grid */}
        {!loading && expenses.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {expenses.map((expense) => (
                <ExpenseCard key={expense._id} expense={expense} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="btn btn-secondary btn-sm"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`btn btn-sm ${
                        page === pagination.currentPage
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="btn btn-secondary btn-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
