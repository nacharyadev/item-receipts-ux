import React from 'react';
import { format } from 'date-fns';
import { ItemReceipt } from '@/types/item-receipt';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  TruckIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  DocumentIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  CheckBadgeIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ReceiptListProps {
  receipts: ItemReceipt[];
  filter: 'all' | 'expected' | 'receiving-in-progress' | 'completed';
  searchQuery: string;
}

export default function ReceiptList({ 
  receipts, 
  filter, 
  searchQuery
}: ReceiptListProps) {
  const filteredReceipts = receipts.filter(receipt => {
    const matchesStatusFilter = filter === 'all' || receipt.status === filter;
    const matchesSearch = searchQuery === '' || 
      receipt.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.poNumbers.some(po => po.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatusFilter && matchesSearch;
  });

  const getStatusIcon = (status: ItemReceipt['status'], inspectionStatus?: ItemReceipt['inspectionStatus']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'receiving-in-progress':
        switch (inspectionStatus) {
          case 'pending-inspection':
            return <ArrowPathIcon className="h-5 w-5 text-purple-500" />;
          case 'inspection-in-progress':
            return <ClockIcon className="h-5 w-5 text-indigo-500" />;
          case 'accepted':
            return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
          case 'partially-accepted':
            return <CheckBadgeIcon className="h-5 w-5 text-yellow-500" />;
          case 'rejected':
            return <XCircleIcon className="h-5 w-5 text-red-500" />;
          default:
            return <ClockIcon className="h-5 w-5 text-blue-500" />;
        }
      case 'expected':
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ItemReceipt['status'], inspectionStatus?: ItemReceipt['inspectionStatus']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'receiving-in-progress':
        switch (inspectionStatus) {
          case 'pending-inspection':
            return 'bg-purple-100 text-purple-800';
          case 'inspection-in-progress':
            return 'bg-indigo-100 text-indigo-800';
          case 'accepted':
            return 'bg-green-100 text-green-800';
          case 'partially-accepted':
            return 'bg-yellow-100 text-yellow-800';
          case 'rejected':
            return 'bg-red-100 text-red-800';
          default:
            return 'bg-blue-100 text-blue-800';
        }
      case 'expected':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: ItemReceipt['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-rose-100 text-rose-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: ItemReceipt['status'], inspectionStatus?: ItemReceipt['inspectionStatus']) => {
    if (status === 'receiving-in-progress' && inspectionStatus) {
      return inspectionStatus.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {filteredReceipts.map((receipt) => (
          <li key={receipt.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(receipt.status, receipt.inspectionStatus)}
                    <span className={`ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(receipt.status, receipt.inspectionStatus)}`}>
                      {formatStatus(receipt.status, receipt.inspectionStatus)}
                    </span>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(receipt.priority)}`}>
                      {receipt.priority === 'urgent' && <ExclamationTriangleIcon className="h-3 w-3 mr-1" />}
                      {receipt.priority.charAt(0).toUpperCase() + receipt.priority.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex items-center">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-500">
                        {receipt.vendorName}
                      </p>
                      <div className="ml-3 flex items-center text-xs text-gray-500">
                        <ClipboardDocumentListIcon className="h-3 w-3 mr-1" />
                        <span className="font-medium mr-1">PO:</span>
                        <span className="text-gray-600">
                          {receipt.poNumbers.join(', ')}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {receipt.totalItems} items
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Expected: {format(receipt.expectedDate, 'MMM d, yyyy')}
                    </p>
                    <p className="ml-4">
                      ${receipt.totalAmount.toLocaleString()}
                    </p>
                    <ChevronRightIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
                {(receipt.status === 'receiving-in-progress' || receipt.status === 'completed') && receipt.thumbnailUrl && (
                  <div className="mt-4 flex items-center">
                    <div className="relative h-24 w-32 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                      <Image
                        src={receipt.thumbnailUrl}
                        alt={`${receipt.status === 'receiving-in-progress' ? 'Packing Slip' : 'Proof of Receipt'} for ${receipt.receiptNumber}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="ml-3 flex items-center text-sm text-gray-500">
                      <DocumentIcon className="h-4 w-4 mr-1" />
                      <span>{receipt.status === 'receiving-in-progress' ? 'Packing Slip' : 'Proof of Receipt'}</span>
                    </div>
                  </div>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 