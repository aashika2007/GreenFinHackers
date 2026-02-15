
export interface CarbonFootprint {
  manufacturing: number; // in kg CO2
  packaging: number; // in kg CO2
  delivery: number; // in kg CO2
  total: number;
}

export interface ProductAnalysis {
  name: string;
  brand: string;
  category: string;
  carbonScore: number; // 0-100 (100 is best/lowest carbon)
  footprint: CarbonFootprint;
  summary: string;
}

export interface Alternative {
  id: string;
  name: string;
  type: 'different_product' | 'same_different_site' | 'second_hand';
  description: string;
  carbonSaved: number;
  rewardPoints: number;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  points: number;
  level: number;
  badges: string[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
}

export interface Voucher {
  id: string;
  brand: string;
  value: string;
  pointsCost: number;
  color: string;
  image: string;
}
