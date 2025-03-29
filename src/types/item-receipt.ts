export interface ItemReceipt {
  id: string;
  receiptNumber: string;
  vendorName: string;
  status: 'expected' | 'in-progress' | 'completed';
  expectedDate: Date;
  totalItems: number;
  totalAmount: number;
  priority: 'normal' | 'high' | 'urgent';
  items: Item[];
  thumbnailUrl?: string; // URL to the packing slip or proof of receipt thumbnail
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sku: string;
  category: string;
  priority: 'normal' | 'high' | 'urgent';
}

export interface ReceiptStats {
  expectedToday: number;
  inProgress: number;
  completedToday: number;
  totalValue: number;
  highPriorityCount: number;
  urgentCount: number;
} 