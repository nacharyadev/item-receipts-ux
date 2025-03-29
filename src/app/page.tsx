'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ItemReceipt, ReceiptStats } from '@/types/item-receipt';
import StatsOverview from '@/components/StatsOverview';
import ReceiptList from '@/components/ReceiptList';
import ReceiptFilters from '@/components/ReceiptFilters';

// Mock data - replace with actual API calls
const mockStats: ReceiptStats = {
  expectedToday: 8,
  inProgress: 12,
  completedToday: 4,
  totalValue: 156789.45,
  highPriorityCount: 5,
  urgentCount: 2
};

const mockReceipts: ItemReceipt[] = [
  {
    id: '1',
    receiptNumber: 'RCP-001',
    vendorName: 'Acme Supplies',
    status: 'expected',
    expectedDate: new Date('2024-03-20'),
    totalItems: 45,
    totalAmount: 1234.56,
    priority: 'urgent',
    items: [
      {
        id: '1-1',
        name: 'Widget A',
        quantity: 20,
        unitPrice: 15.99,
        totalPrice: 319.80,
        sku: 'WID-A-001',
        category: 'Electronics',
        priority: 'urgent'
      },
      {
        id: '1-2',
        name: 'Widget B',
        quantity: 25,
        unitPrice: 36.59,
        totalPrice: 914.75,
        sku: 'WID-B-001',
        category: 'Electronics',
        priority: 'high'
      }
    ]
  },
  {
    id: '2',
    receiptNumber: 'RCP-002',
    vendorName: 'Global Electronics',
    status: 'in-progress',
    expectedDate: new Date('2024-03-20'),
    totalItems: 30,
    totalAmount: 5678.90,
    priority: 'high',
    thumbnailUrl: '/shipment1.jpeg',
    items: [
      {
        id: '2-1',
        name: 'Component X',
        quantity: 15,
        unitPrice: 89.99,
        totalPrice: 1349.85,
        sku: 'COMP-X-001',
        category: 'Components',
        priority: 'high'
      },
      {
        id: '2-2',
        name: 'Component Y',
        quantity: 15,
        unitPrice: 288.67,
        totalPrice: 4330.05,
        sku: 'COMP-Y-001',
        category: 'Components',
        priority: 'normal'
      }
    ]
  },
  {
    id: '3',
    receiptNumber: 'RCP-003',
    vendorName: 'Tech Solutions',
    status: 'completed',
    expectedDate: new Date('2024-03-19'),
    totalItems: 20,
    totalAmount: 3456.78,
    priority: 'normal',
    thumbnailUrl: '/shipment2.jpeg',
    items: [
      {
        id: '3-1',
        name: 'Device A',
        quantity: 10,
        unitPrice: 172.84,
        totalPrice: 1728.40,
        sku: 'DEV-A-001',
        category: 'Devices',
        priority: 'normal'
      },
      {
        id: '3-2',
        name: 'Device B',
        quantity: 10,
        unitPrice: 172.84,
        totalPrice: 1728.40,
        sku: 'DEV-B-001',
        category: 'Devices',
        priority: 'normal'
      }
    ]
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'expected' | 'in-progress' | 'completed'>('all');

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Item Receipts</h1>
        
        <div className="space-y-6">
          <StatsOverview stats={mockStats} />
          
          <ReceiptFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filter={filter}
            onFilterChange={setFilter}
          />
          
          <ReceiptList
            receipts={mockReceipts}
            filter={filter}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </main>
  );
}
