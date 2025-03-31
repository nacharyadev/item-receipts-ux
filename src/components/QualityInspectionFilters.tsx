import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface QualityInspectionFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'pending-inspection' | 'inspection-in-progress' | 'accepted' | 'partially-accepted' | 'rejected';
  onStatusFilterChange: (filter: 'all' | 'pending-inspection' | 'inspection-in-progress' | 'accepted' | 'partially-accepted' | 'rejected') => void;
}

export default function QualityInspectionFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: QualityInspectionFiltersProps) {
  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const statusOptions = [
    'all',
    'pending-inspection',
    'inspection-in-progress',
    'accepted',
    'partially-accepted',
    'rejected'
  ] as const;

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
          placeholder="Search by receipt number, vendor, or inspector..."
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => onStatusFilterChange(status)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              statusFilter === status
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {formatStatus(status)}
          </button>
        ))}
      </div>
    </div>
  );
} 