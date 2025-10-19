import { DollarSign, TrendingUp, Calendar, Tag } from 'lucide-react';

const SummaryCard = ({ summary }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-500',
      Transportation: 'bg-blue-500',
      Entertainment: 'bg-purple-500',
      Shopping: 'bg-pink-500',
      Bills: 'bg-red-500',
      Healthcare: 'bg-green-500',
      Education: 'bg-indigo-500',
      Travel: 'bg-yellow-500',
      Other: 'bg-gray-500',
    };
    return colors[category] || colors.Other;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Expenses */}
      <div className="card group pt-4">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 m-1">Total Expenses</p>
              <p className="text-3xl font-bold gradient-text">
                {formatAmount(summary.total)}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Total Count */}
      <div className="card group pt-4">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Count</p>
              <p className="text-3xl font-bold text-gray-900">
                {summary.totalExpenses}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="card group pt-4">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Categories</p>
              <p className="text-3xl font-bold text-gray-900">
                {summary.categorySummary.length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <Tag className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card group pt-4">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Recent</p>
              <p className="text-3xl font-bold text-gray-900">
                {summary.recentExpenses.length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <Calendar className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {summary.categorySummary.length > 0 && (
        <div className="md:col-span-2 lg:col-span-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <span>Category Breakdown</span>
              </h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {summary.categorySummary.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${getCategoryColor(category._id)} shadow-sm`}></div>
                      <div>
                        <span className="text-sm font-semibold text-gray-900">
                          {category._id}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({category.count} expenses)
                        </span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {formatAmount(category.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Expenses */}
      {summary.recentExpenses.length > 0 && (
        <div className="md:col-span-2 lg:col-span-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                <span>Recent Expenses</span>
              </h3>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                {summary.recentExpenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 group border border-gray-100 hover:border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(expense.category)} shadow-sm`}></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{expense.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(expense.date).toLocaleDateString()} • {expense.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {formatAmount(expense.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
