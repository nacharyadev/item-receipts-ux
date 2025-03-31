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
  XCircleIcon,
  ClipboardIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ReceiptListProps {
  receipts: ItemReceipt[];
  filter: 'all' | 'expected' | 'receiving-in-progress' | 'sent-for-inspection' | 'completed';
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
      case 'sent-for-inspection':
        return <ArrowPathIcon className="h-5 w-5 text-orange-500" />;
      case 'expected':
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ItemReceipt['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'receiving-in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'sent-for-inspection':
        return 'bg-orange-100 text-orange-800';
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

  const getDeliveryStatus = (receipt: ItemReceipt) => {
    if (receipt.status === 'completed') {
      const expectedDate = new Date(receipt.expectedDate);
      const receivedDate = new Date(receipt.receivedDate);
      const diffDays = Math.floor((receivedDate.getTime() - expectedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        return {
          text: `Delayed by ${diffDays} day${diffDays > 1 ? 's' : ''}`,
          color: 'text-red-600',
          icon: <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
        };
      } else if (diffDays < 0) {
        return {
          text: `Received ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} early`,
          color: 'text-green-600',
          icon: <CheckCircleIcon className="h-4 w-4 text-green-500" />
        };
      }
    }
    return null;
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {filteredReceipts.map((receipt) => (
          <li key={receipt.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    {getStatusIcon(receipt.status, receipt.inspectionStatus)}
                    <span className={`ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(receipt.status)}`}>
                      {formatStatus(receipt.status, receipt.inspectionStatus)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {receipt.receiptNumber}
                    </p>
                    <div className="ml-2 flex items-center text-xs text-gray-500">
                      <ClipboardIcon className="h-3 w-3 mr-1" />
                      <span className="font-medium mr-1">PO:</span>
                      <span className="text-gray-600">
                        {receipt.poNumbers.join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center">
                    <p className="text-sm text-gray-900">{receipt.vendorName}</p>
                    <p className="ml-2 text-sm text-gray-500">
                      Expected: {receipt.expectedDate.toLocaleDateString()}
                    </p>
                    {receipt.status === 'completed' && (
                      <>
                        <p className="ml-2 text-sm text-gray-500">
                          Received: {receipt.receivedDate.toLocaleDateString()}
                        </p>
                        <p className="ml-2 text-sm text-gray-500">
                          By: {receipt.receivedBy}
                        </p>
                      </>
                    )}
                  </div>
                  {receipt.status === 'completed' && (
                    <div className="mt-1 flex items-center">
                      {(() => {
                        const deliveryStatus = getDeliveryStatus(receipt);
                        if (deliveryStatus) {
                          return (
                            <div className={`flex items-center text-xs ${deliveryStatus.color}`}>
                              {deliveryStatus.icon}
                              <span className="ml-1">{deliveryStatus.text}</span>
                            </div>
                          );
                        }
                        return (
                          <div className="flex items-center text-xs text-green-600">
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                            <span className="ml-1">Received on time</span>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0 flex items-center">
                  {receipt.thumbnailUrl && (
                    <div className="relative h-16 w-16 mr-4">
                      <Image
                        src={receipt.thumbnailUrl}
                        alt="Packing Slip"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-900">
                      ${receipt.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {receipt.totalItems} items
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