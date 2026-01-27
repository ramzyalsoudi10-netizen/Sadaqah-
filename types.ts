
export type Language = 'en' | 'ar';

export interface Stats {
  totalRaised: number;
  totalDonors: number;
  familiesSupported: number;
  ramadanStartDate: string;
}

export interface UpdatePost {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
}

export interface ImpactLabel {
  amount: number;
  labelEn: string;
  labelAr: string;
}

export enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  USDT = 'USDT'
}

export interface DonationSubmission {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: 'pending' | 'confirmed';
  timestamp: number;
  txHash?: string;
}
