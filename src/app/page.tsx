'use client';

import React from 'react';
import { ItemReceipt } from '@/types/item-receipt';
import StatsOverview from '@/components/StatsOverview';
import ReceiptList from '@/components/ReceiptList';
import ReceiptFilters from '@/components/ReceiptFilters';

export default function Home() {
  const mockStats = {
    expectedToday: 3,
    inProgress: 2,
    completedToday: 1,
    totalValue: 15500.75,
    highPriorityCount: 3,
    urgentCount: 2
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | 'expected' | 'receiving-in-progress' | 'completed'>('all');

  const mockReceipts: ItemReceipt[] = [
    {
      id: '1',
      receiptNumber: 'REC-001',
      vendorName: 'Acme Supplies',
      status: 'expected',
      expectedDate: new Date('2024-03-20'),
      totalItems: 5,
      totalAmount: 1250.75,
      priority: 'normal',
      items: [
        {
          id: '1-1',
          name: 'Office Chair',
          quantity: 2,
          unitPrice: 250.00,
          totalPrice: 500.00,
          sku: 'CHR-001',
          category: 'Furniture',
          priority: 'normal'
        },
        {
          id: '1-2',
          name: 'Desk Lamp',
          quantity: 3,
          unitPrice: 250.25,
          totalPrice: 750.75,
          sku: 'LMP-001',
          category: 'Lighting',
          priority: 'normal'
        }
      ],
      poNumbers: ['PO-2024-001']
    },
    {
      id: '2',
      receiptNumber: 'REC-002',
      vendorName: 'Global Electronics',
      status: 'receiving-in-progress',
      expectedDate: new Date('2024-03-19'),
      totalItems: 10,
      totalAmount: 3500.00,
      priority: 'high',
      items: [
        {
          id: '2-1',
          name: 'Wireless Mouse',
          quantity: 5,
          unitPrice: 250.00,
          totalPrice: 1250.00,
          sku: 'MSE-001',
          category: 'Electronics',
          priority: 'high'
        },
        {
          id: '2-2',
          name: 'Keyboard',
          quantity: 5,
          unitPrice: 450.00,
          totalPrice: 2250.00,
          sku: 'KBD-001',
          category: 'Electronics',
          priority: 'high'
        }
      ],
      poNumbers: ['PO-2024-002'],
      thumbnailUrl: '/shipment1.jpeg'
    },
    {
      id: '3',
      receiptNumber: 'REC-003',
      vendorName: 'Tech Solutions Inc',
      status: 'receiving-in-progress',
      inspectionStatus: 'pending-inspection',
      expectedDate: new Date('2024-03-18'),
      totalItems: 3,
      totalAmount: 750.00,
      priority: 'urgent',
      items: [
        {
          id: '3-1',
          name: 'USB-C Hub',
          quantity: 3,
          unitPrice: 250.00,
          totalPrice: 750.00,
          sku: 'HUB-001',
          category: 'Electronics',
          priority: 'urgent'
        }
      ],
      poNumbers: ['PO-2024-003']
    },
    {
      id: '4',
      receiptNumber: 'REC-004',
      vendorName: 'Office Depot',
      status: 'receiving-in-progress',
      inspectionStatus: 'accepted',
      expectedDate: new Date('2024-03-17'),
      totalItems: 15,
      totalAmount: 4500.00,
      priority: 'high',
      items: [
        {
          id: '4-1',
          name: 'Printer Paper',
          quantity: 10,
          unitPrice: 300.00,
          totalPrice: 3000.00,
          sku: 'PAP-001',
          category: 'Office Supplies',
          priority: 'high'
        },
        {
          id: '4-2',
          name: 'Ink Cartridges',
          quantity: 5,
          unitPrice: 300.00,
          totalPrice: 1500.00,
          sku: 'INK-001',
          category: 'Office Supplies',
          priority: 'high'
        }
      ],
      poNumbers: ['PO-2024-004'],
      thumbnailUrl: '/shipment1.jpeg'
    },
    {
      id: '5',
      receiptNumber: 'REC-005',
      vendorName: 'Furniture World',
      status: 'completed',
      expectedDate: new Date('2024-03-16'),
      totalItems: 2,
      totalAmount: 1200.00,
      priority: 'normal',
      items: [
        {
          id: '5-1',
          name: 'Conference Table',
          quantity: 1,
          unitPrice: 800.00,
          totalPrice: 800.00,
          sku: 'TBL-001',
          category: 'Furniture',
          priority: 'normal'
        },
        {
          id: '5-2',
          name: 'Office Chair',
          quantity: 1,
          unitPrice: 400.00,
          totalPrice: 400.00,
          sku: 'CHR-002',
          category: 'Furniture',
          priority: 'normal'
        }
      ],
      poNumbers: ['PO-2024-005'],
      thumbnailUrl: '/shipment2.jpeg'
    },
    {
      id: '6',
      receiptNumber: 'REC-006',
      vendorName: 'Digital Solutions',
      status: 'receiving-in-progress',
      inspectionStatus: 'partially-accepted',
      expectedDate: new Date('2024-03-15'),
      totalItems: 8,
      totalAmount: 2400.00,
      priority: 'high',
      items: [
        {
          id: '6-1',
          name: 'Monitor',
          quantity: 4,
          unitPrice: 300.00,
          totalPrice: 1200.00,
          sku: 'MON-001',
          category: 'Electronics',
          priority: 'high'
        },
        {
          id: '6-2',
          name: 'Webcam',
          quantity: 4,
          unitPrice: 300.00,
          totalPrice: 1200.00,
          sku: 'CAM-001',
          category: 'Electronics',
          priority: 'high'
        }
      ],
      poNumbers: ['PO-2024-006'],
      thumbnailUrl: '/shipment1.jpeg'
    },
    {
      id: '7',
      receiptNumber: 'REC-007',
      vendorName: 'Quality Supplies',
      status: 'receiving-in-progress',
      inspectionStatus: 'rejected',
      expectedDate: new Date('2024-03-14'),
      totalItems: 6,
      totalAmount: 1800.00,
      priority: 'urgent',
      items: [
        {
          id: '7-1',
          name: 'Desk Chair',
          quantity: 3,
          unitPrice: 300.00,
          totalPrice: 900.00,
          sku: 'CHR-003',
          category: 'Furniture',
          priority: 'urgent'
        },
        {
          id: '7-2',
          name: 'Filing Cabinet',
          quantity: 3,
          unitPrice: 300.00,
          totalPrice: 900.00,
          sku: 'CAB-001',
          category: 'Furniture',
          priority: 'urgent'
        }
      ],
      poNumbers: ['PO-2024-007']
    },
    {
      id: '8',
      receiptNumber: 'REC-008',
      vendorName: 'Tech Gadgets',
      status: 'receiving-in-progress',
      inspectionStatus: 'partially-accepted',
      expectedDate: new Date('2024-03-16'),
      totalItems: 8,
      totalAmount: 2400.00,
      priority: 'high',
      items: [
        {
          id: '8-1',
          name: 'Wireless Headphones',
          quantity: 4,
          unitPrice: 300.00,
          totalPrice: 1200.00,
          sku: 'HP-001',
          category: 'Electronics',
          priority: 'high'
        },
        {
          id: '8-2',
          name: 'Bluetooth Speaker',
          quantity: 4,
          unitPrice: 300.00,
          totalPrice: 1200.00,
          sku: 'SPK-001',
          category: 'Electronics',
          priority: 'high'
        }
      ],
      poNumbers: ['PO-2024-008'],
      thumbnailUrl: '/shipment1.jpeg'
    },
    {
      id: '9',
      receiptNumber: 'REC-009',
      vendorName: 'Quality Electronics',
      status: 'receiving-in-progress',
      inspectionStatus: 'rejected',
      expectedDate: new Date('2024-03-15'),
      totalItems: 6,
      totalAmount: 1800.00,
      priority: 'urgent',
      items: [
        {
          id: '9-1',
          name: 'USB-C Cable',
          quantity: 3,
          unitPrice: 300.00,
          totalPrice: 900.00,
          sku: 'CBL-001',
          category: 'Electronics',
          priority: 'urgent'
        },
        {
          id: '9-2',
          name: 'Power Adapter',
          quantity: 3,
          unitPrice: 300.00,
          totalPrice: 900.00,
          sku: 'PWR-001',
          category: 'Electronics',
          priority: 'urgent'
        }
      ],
      poNumbers: ['PO-2024-009']
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StatsOverview stats={mockStats} />
        <div className="mt-8">
          <ReceiptFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filter={filter}
            onFilterChange={setFilter}
          />
          <div className="mt-4">
            <ReceiptList
              receipts={mockReceipts}
              filter={filter}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
