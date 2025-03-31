export interface QualityInspection {
    id: string;
    status: 'pending-inspection' | 'inspection-in-progress' | 'accepted' | 'partially-accepted' | 'rejected';
    inspectionDate?: Date;
    inspectorName?: string;
    notes?: string;
}

export interface QualityInspectionLine {
    id: string;
    itemId: string;
    quantity: number;
    acceptedQuantity: number;
    sku: string;
    category: string;
    receiptId: string;
    inspectionId: string;
}