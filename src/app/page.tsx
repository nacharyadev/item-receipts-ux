'use client';

import React, { useState } from 'react';
import { ItemReceipt } from '@/types/item-receipt';
import StatsOverview from '@/components/StatsOverview';
import ReceiptList from '@/components/ReceiptList';
import ReceiptFilters from '@/components/ReceiptFilters';
import QualityInspectionList from '@/components/QualityInspectionList';
import { QualityInspection } from '@/types/quality-inspection';
import QualityInspectionFilters from '@/components/QualityInspectionFilters';

export default function Home() {
  const mockStats = {
    expectedToday: 3,
    expectedValue: 3750.00,
    inProgress: 2,
    inProgressValue: 3500.00,
    sentForInspection: 1,
    sentForInspectionValue: 750.00,
    completedToday: 1,
    completedValue: 1200.00,
    highPriorityCount: 3,
    urgentCount: 2
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'expected' | 'receiving-in-progress' | 'completed'>('all');
  const [activeTab, setActiveTab] = useState<'receipts' | 'inspections'>('receipts');
  const [inspectionStatusFilter, setInspectionStatusFilter] = useState<'all' | 'pending-inspection' | 'inspection-in-progress' | 'accepted' | 'partially-accepted' | 'rejected'>('all');

  const mockReceipts: ItemReceipt[] = [
    {
      id: '1',
      receiptNumber: 'REC-001',
      vendorName: 'Acme Supplies',
      status: 'expected',
      expectedDate: new Date('2024-03-20'),
      receivedDate: new Date('2024-03-20'),
      receivedBy: 'John Doe',
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
      receivedDate: new Date('2024-03-19'),
      receivedBy: 'John Doe',
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
      expectedDate: new Date('2024-03-18'),
      receivedDate: new Date('2024-03-18'),
      receivedBy: 'John Doe',
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
      expectedDate: new Date('2024-03-17'),
      receivedDate: new Date('2024-03-17'),
      receivedBy: 'John Doe',
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
      receivedDate: new Date('2024-03-16'),
      receivedBy: 'John Doe',
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
      receivedDate: new Date('2024-03-15'),
      receivedBy: 'John Doe',
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
      receivedDate: new Date('2024-03-14'),
      receivedBy: 'John Doe',
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
      receivedDate: new Date('2024-03-16'),
      receivedBy: 'John Doe',
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
      receivedDate: new Date('2024-03-15'),
      receivedBy: 'John Doe',
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
    },
    {
      id: '10',
      receiptNumber: 'REC-010',
      vendorName: 'Delayed Electronics',
      status: 'completed',
      expectedDate: new Date('2024-03-15'),
      receivedDate: new Date('2024-03-17'),
      receivedBy: 'John Doe',
      totalItems: 4,
      totalAmount: 2800.00,
      priority: 'high',
      items: [
        {
          id: '10-1',
          name: 'Gaming Monitor',
          quantity: 2,
          unitPrice: 800.00,
          totalPrice: 1600.00,
          sku: 'MON-002',
          category: 'Electronics',
          priority: 'high'
        },
        {
          id: '10-2',
          name: 'Gaming Keyboard',
          quantity: 2,
          unitPrice: 600.00,
          totalPrice: 1200.00,
          sku: 'KBD-002',
          category: 'Electronics',
          priority: 'high'
        }
      ],
      poNumbers: ['PO-2024-010'],
      thumbnailUrl: '/shipment1.jpeg'
    }
  ];

  const mockInspections: QualityInspection[] = [
    {
      id: 'INS-001',
      status: 'pending-inspection',
      inspectionDate: new Date('2024-03-18'),
      inspectorName: 'John Smith',
      notes: 'Initial inspection pending',
      receipt: mockReceipts.find(r => r.id === '3')
    },
    {
      id: 'INS-002',
      status: 'accepted',
      inspectionDate: new Date('2024-03-17'),
      inspectorName: 'Jane Doe',
      notes: 'All items meet quality standards',
      receipt: mockReceipts.find(r => r.id === '4')
    },
    {
      id: 'INS-003',
      status: 'partially-accepted',
      inspectionDate: new Date('2024-03-15'),
      inspectorName: 'Mike Johnson',
      notes: 'Some items require rework',
      receipt: mockReceipts.find(r => r.id === '6')
    },
    {
      id: 'INS-004',
      status: 'rejected',
      inspectionDate: new Date('2024-03-14'),
      inspectorName: 'Sarah Wilson',
      notes: 'Items do not meet quality standards',
      receipt: mockReceipts.find(r => r.id === '7')
    },
    {
      id: 'INS-005',
      status: 'partially-accepted',
      inspectionDate: new Date('2024-03-16'),
      inspectorName: 'Tom Brown',
      notes: 'Minor issues found',
      receipt: mockReceipts.find(r => r.id === '8')
    },
    {
      id: 'INS-006',
      status: 'rejected',
      inspectionDate: new Date('2024-03-15'),
      inspectorName: 'Lisa Anderson',
      notes: 'Critical quality issues found',
      receipt: mockReceipts.find(r => r.id === '9')
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <StatsOverview stats={mockStats} />
          
          <div className="mt-8">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as 'receipts' | 'inspections')}
              >
                <option value="receipts">Receipts</option>
                <option value="inspections">Quality Inspections</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('receipts')}
                    className={`${
                      activeTab === 'receipts'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                  >
                    Receipts
                  </button>
                  <button
                    onClick={() => setActiveTab('inspections')}
                    className={`${
                      activeTab === 'inspections'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                  >
                    Quality Inspections
                  </button>
                </nav>
              </div>
            </div>

            <div className="mt-4">
              {activeTab === 'receipts' ? (
                <>
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
                </>
              ) : (
                <>
                  <QualityInspectionFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={inspectionStatusFilter}
                    onStatusFilterChange={setInspectionStatusFilter}
                  />
                  <div className="mt-4">
                    <QualityInspectionList
                      inspections={mockInspections}
                      searchQuery={searchQuery}
                      statusFilter={inspectionStatusFilter}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
