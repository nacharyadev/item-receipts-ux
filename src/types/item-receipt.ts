export interface ItemReceipt {
  id: string;
  receiptNumber: string;
  vendorName: string;
  status: 'expected' | 'receiving-in-progress' | 'sent-for-inspection' | 'completed';
  expectedDate: Date;
  receivedDate: Date;
  receivedBy: string;
  totalItems: number;
  totalAmount: number;
  priority: 'normal' | 'high' | 'urgent';
  items: ItemReceiptLine[];
  thumbnailUrl?: string; // URL to the packing slip or proof of receipt thumbnail
  poNumbers: string[]; // List of associated PO numbers
}

export interface ItemReceiptLine {
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
  expectedValue: number;
  inProgress: number;
  inProgressValue: number;
  sentForInspection: number;
  sentForInspectionValue: number;
  completedToday: number;
  completedValue: number;
  highPriorityCount: number;
  urgentCount: number;
} 