export type UserRole = 'farmer' | 'officer' | 'guest';

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  preferredCentre: string;
  khasraNumber: string;
  landAreaAcres: number;
  bankAccountVerified: boolean;
  bankName: string;
  accountNumberMasked: string;
  activeToken?: string;
}

export type CongestionLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface ProcurementCentre {
  id: string;
  name: string;
  code: string;
  location: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  capacity: number;
  bookedCount: number;
  completedCount: number;
  waitingCount: number;
  currentToken: string;
  status: 'operating' | 'busy' | 'closed';
  avgProcessingMinutes: number;
  cropsSupported: string[];
}

export interface TimeSlot {
  id: string;
  centreId: string;
  time: string;
  totalSlots: number;
  bookedSlots: number;
  isFull: boolean;
}

export type QueueStatus = 'serving' | 'waiting' | 'completed' | 'absent' | 'cancelled';

export interface QueueItem {
  id: string;
  centreId: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  crop: string;
  quantityQuintals: number;
  tokenNumber: string;
  tokenSeq: number;
  slotTime: string;
  status: QueueStatus;
  createdAt: string;
  calledAt?: string;
  completedAt?: string;
}

export type ProcurementStepId =
  | 'slot_booked'
  | 'farmer_arrived'
  | 'quality_check'
  | 'weighed'
  | 'accepted'
  | 'payment_initiated'
  | 'payment_completed';

export interface ProcurementStep {
  id: ProcurementStepId;
  label: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  details?: string;
}

export interface ProcurementRecord {
  id: string;
  farmerId: string;
  centreId: string;
  tokenNumber: string;
  crop: string;
  quantityQuintals: number;
  mspRatePerQuintal: number;
  totalAmount: number;
  currentStep: ProcurementStepId;
  moisturePercent: number;
  qualityGrade: string;
  netWeightQuintals: number;
  bagCount: number;
  transactionId?: string;
  steps: ProcurementStep[];
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  farmerId: string;
  title: string;
  message: string;
  type: 'turn_approaching' | 'turn_next' | 'slot_confirmed' | 'centre_update' | 'procurement_update' | 'payment_update';
  read: boolean;
  createdAt: string;
}

export interface BookingFormData {
  centreId: string;
  crop: string;
  quantityQuintals: number;
  date: string;
  timeSlot: string;
}
