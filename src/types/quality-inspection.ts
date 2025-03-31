import { ItemReceipt } from './item-receipt';

export interface QualityInspection {
    id: string;
    status: 'pending-inspection' | 'inspection-in-progress' | 'accepted' | 'partially-accepted' | 'rejected';
    inspectionDate?: Date;
    inspectorName?: string;
    notes?: string;
    receipt?: ItemReceipt;
}

export interface QualityInspectionLine {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    sku: string;
    category: string;
    priority: 'normal' | 'high' | 'urgent';
    receipt?: ItemReceipt;
}