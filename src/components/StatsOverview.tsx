import React from 'react';
import { ReceiptStats } from '@/types/item-receipt';
import { 
  TruckIcon, 
  ClockIcon, 
  CheckCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface StatsOverviewProps {
  stats: ReceiptStats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statsList = [
    {
      name: 'Expected Today',
      value: stats.expectedToday,
      icon: TruckIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Receiving in Progress',
      value: stats.inProgress,
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Completed Today',
      value: stats.completedToday,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Total Value',
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
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
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </dd>
        </div>
      ))}
    </div>
  );
} 