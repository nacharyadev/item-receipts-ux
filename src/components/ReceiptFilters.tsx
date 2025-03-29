import React from 'react';

interface ReceiptFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: 'all' | 'expected' | 'in-progress' | 'completed';
  onFilterChange: (filter: 'all' | 'expected' | 'in-progress' | 'completed') => void;
}

export default function ReceiptFilters({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange
}: ReceiptFiltersProps) {
  return (
    <div className="bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search receipts
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Search by receipt number or vendor..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange('expected')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                filter === 'expected'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Expected
            </button>
            <button
              onClick={() => onFilterChange('in-progress')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                filter === 'in-progress'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => onFilterChange('completed')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                filter === 'completed'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 