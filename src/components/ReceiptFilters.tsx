import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ReceiptFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: 'all' | 'expected' | 'receiving-in-progress' | 'completed';
  onFilterChange: (filter: 'all' | 'expected' | 'receiving-in-progress' | 'completed') => void;
}

export default function ReceiptFilters({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
}: ReceiptFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search by receipt number or vendor..."
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md ${
            filter === 'all'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('expected')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md ${
            filter === 'expected'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Expected
        </button>
        <button
          onClick={() => onFilterChange('receiving-in-progress')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md ${
            filter === 'receiving-in-progress'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md ${
            filter === 'completed'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
} 