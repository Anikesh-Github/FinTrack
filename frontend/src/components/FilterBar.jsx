import { useState, useEffect } from 'react';
import { Filter, Calendar, Tag, Search } from 'lucide-react';

const FilterBar = ({ onFilterChange, filters }) => {
  const [localFilters, setLocalFilters] = useState({
    category: 'all',
    startDate: '',
    endDate: '',
  });

  const categories = [
    'all',
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
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (name, value) => {
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: 'all',
      startDate: '',
      endDate: '',
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = localFilters.category !== 'all' || 
                          localFilters.startDate || 
                          localFilters.endDate;

  return (
    <div className="card mb-6 pt-4">
      <div className="card-content">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <select
              id="category-filter"
              value={localFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date Filter */}
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              value={localFilters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="input"
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              value={localFilters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="input"
            />
          </div>
        </div>

        {/* Quick Date Filters */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Filters</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                handleFilterChange('startDate', today);
                handleFilterChange('endDate', today);
              }}
              className="btn btn-secondary btn-sm"
            >
              Today
            </button>
            
            <button
              onClick={() => {
                const today = new Date();
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                handleFilterChange('startDate', weekAgo.toISOString().split('T')[0]);
                handleFilterChange('endDate', today.toISOString().split('T')[0]);
              }}
              className="btn btn-secondary btn-sm"
            >
              Last 7 Days
            </button>
            
            <button
              onClick={() => {
                const today = new Date();
                const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                handleFilterChange('startDate', monthAgo.toISOString().split('T')[0]);
                handleFilterChange('endDate', today.toISOString().split('T')[0]);
              }}
              className="btn btn-secondary btn-sm"
            >
              Last 30 Days
            </button>
            
            <button
              onClick={() => {
                const today = new Date();
                const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
                handleFilterChange('startDate', yearAgo.toISOString().split('T')[0]);
                handleFilterChange('endDate', today.toISOString().split('T')[0]);
              }}
              className="btn btn-secondary btn-sm"
            >
              Last Year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
