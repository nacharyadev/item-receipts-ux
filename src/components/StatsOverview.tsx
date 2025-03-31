import React from 'react';
import { ReceiptStats } from '@/types/item-receipt';
import {
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface StatsOverviewProps {
  stats: ReceiptStats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statsList = [
    {
      name: 'Expected Today',
      value: stats.expectedToday,
      totalValue: stats.expectedValue,
      icon: TruckIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'In Progress',
      value: stats.inProgress,
      totalValue: stats.inProgressValue,
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Sent for Inspection',
      value: stats.sentForInspection,
      totalValue: stats.sentForInspectionValue,
      icon: ArrowPathIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      name: 'Completed Today',
      value: stats.completedToday,
      totalValue: stats.completedValue,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statsList.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className={`absolute rounded-md p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex flex-col pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Total Value: <span className="font-medium">${stat.totalValue.toLocaleString()}</span>
                </p>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 