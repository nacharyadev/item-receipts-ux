import React from 'react';
import { QualityInspection } from '@/types/quality-inspection';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface QualityInspectionListProps {
  inspections: QualityInspection[];
  searchQuery: string;
  statusFilter: 'all' | 'pending-inspection' | 'inspection-in-progress' | 'accepted' | 'partially-accepted' | 'rejected';
}

export default function QualityInspectionList({ 
  inspections, 
  searchQuery,
  statusFilter 
}: QualityInspectionListProps) {
  // Filter inspections based on search query and status
  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = searchQuery === '' || 
      inspection.receipt?.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inspection.receipt?.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inspection.inspectorName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'partially-accepted':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'inspection-in-progress':
        return <ClockIcon className="h-5 w-5 text-indigo-500" />;
      case 'pending-inspection':
        return <ArrowPathIcon className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'partially-accepted':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'inspection-in-progress':
        return 'bg-indigo-100 text-indigo-800';
      case 'pending-inspection':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {filteredInspections.map((inspection) => (
          <li key={inspection.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    {getStatusIcon(inspection.status)}
                    <span className={`ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(inspection.status)}`}>
                      {formatStatus(inspection.status)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {inspection.receipt?.receiptNumber}
                    </p>
                    <p className="ml-2 text-sm text-gray-500">
                      {inspection.receipt?.vendorName}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <p>Inspector: {inspection.inspectorName}</p>
                    <p className="ml-4">
                      Date: {inspection.inspectionDate?.toLocaleDateString()}
                    </p>
                  </div>
                  {inspection.notes && (
                    <p className="mt-1 text-sm text-gray-500">
                      Notes: {inspection.notes}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0 flex items-center">
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-900">
                      ${inspection.receipt?.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {inspection.receipt?.totalItems} items
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 