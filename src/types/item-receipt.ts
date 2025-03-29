export interface ItemReceipt {
  id: string;
  receiptNumber: string;
  vendorName: string;
  status: 'expected' | 'receiving-in-progress' | 'completed';
  inspectionStatus?: 'pending-inspection' | 'inspection-in-progress' | 'accepted' | 'partially-accepted' | 'rejected';
  expectedDate: Date;
  totalItems: number;
  totalAmount: number;
  priority: 'normal' | 'high' | 'urgent';
  items: Item[];
  thumbnailUrl?: string; // URL to the packing slip or proof of receipt thumbnail
  poNumbers: string[]; // List of associated PO numbers
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