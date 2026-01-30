export interface TagDetails {
  id: string;
  petName: string;
  petNameCase: 'uppercase' | 'mixed';
  animalType: 'dog' | 'cat' | 'other';
  animalTypeOther?: string;
  shape: string;
  size: 'small' | 'large';
  material: 'brass' | 'stainless';
  frontLine1: string;
  frontLine2?: string;
  backLine1: string;
  backLine2?: string;
  backLine3?: string;
  mockupFile?: File;
}

export interface OrderFormData {
  // Section 1: Customer Information
  customerName: string;
  phoneNumber: string;
  email?: string;
  preferredContact: 'call' | 'text' | 'email';

  // Section 2 & 3: Tag Details (multiple tags allowed)
  tags: TagDetails[];

  // Section 4: Font & Icons
  fontChoice: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
  addImage: boolean;
  imageFile?: File;
  icons: {
    paw: boolean;
    bone: boolean;
    heart: boolean;
    star: boolean;
    other: boolean;
    otherText?: string;
  };
  iconPlacement: 'before' | 'after' | 'above' | 'back';
  notes?: string;

  // Section 5: Price & Order Info
  baseTagPrice: number;
  addOnsTotal: number;
  orderTotal: number;
  paymentMethod: 'cash' | 'card' | 'other';
  paymentMethodOther?: string;
  dateOrdered: Date;
  readyBy?: Date;
  staffInitials?: string;

  // Section 6: Spelling Confirmation
  spellingConfirmed: boolean;
  signature: string;
  signatureDate: Date;
}

export interface Order extends OrderFormData {
  id: string;
  createdAt: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export const TAG_SHAPES = [
  'Round',
  'Bone',
  'Heart',
  'Rectangle',
  'Oval',
  'Star',
  'Paw',
  'Fire Hydrant',
  'Custom',
] as const;

export const FONT_OPTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] as const;
