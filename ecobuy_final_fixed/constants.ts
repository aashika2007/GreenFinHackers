
import { LeaderboardEntry, Voucher } from './types';

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "EcoWarrior Sarah", points: 12450, avatar: "https://picsum.photos/seed/sarah/100/100" },
  { rank: 2, name: "GreenGuardian Mike", points: 11200, avatar: "https://picsum.photos/seed/mike/100/100" },
  { rank: 3, name: "PlanetSaver Elena", points: 9800, avatar: "https://picsum.photos/seed/elena/100/100" },
  { rank: 4, name: "ZeroWaste Tom", points: 8500, avatar: "https://picsum.photos/seed/tom/100/100" },
  { rank: 5, name: "Sustainably Yours", points: 7200, avatar: "https://picsum.photos/seed/anna/100/100" },
];

export const SUSTAINABILITY_QUIZ = [
  {
    question: "Which material has the lowest carbon footprint for packaging?",
    options: ["Recycled Cardboard", "Plastic Wrap", "Styrofoam", "Aluminum Foil"],
    answer: 0
  },
  {
    question: "What percentage of carbon emissions come from fashion manufacturing?",
    options: ["2%", "10%", "25%", "50%"],
    answer: 1
  },
  {
    question: "Which delivery method is generally most eco-friendly?",
    options: ["Next-day Air", "Standard Ground Shipping", "Consolidated Shipping", "Same-day Courier"],
    answer: 2
  }
];

export const MOCK_VOUCHERS: Voucher[] = [
  {
    id: 'v1',
    brand: 'Amazon',
    value: '$10 Gift Card',
    pointsCost: 1000,
    color: '#232f3e',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
  },
  {
    id: 'v2',
    brand: 'Starbucks',
    value: '$5 Beverage Credit',
    pointsCost: 500,
    color: '#00704a',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg'
  },
  {
    id: 'v3',
    brand: 'Patagonia',
    value: '15% Discount Code',
    pointsCost: 300,
    color: '#3d3935',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Patagonia_logo.svg'
  },
  {
    id: 'v4',
    brand: 'Allbirds',
    value: '$20 Eco Voucher',
    pointsCost: 2000,
    color: '#212a2f',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Allbirds_Logo.svg'
  },
  {
    id: 'v5',
    brand: 'Spotify',
    value: '1 Month Premium',
    pointsCost: 1200,
    color: '#1DB954',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg'
  },
  {
    id: 'v6',
    brand: 'Local Farmers Market',
    value: '$15 Basket Credit',
    pointsCost: 800,
    color: '#8b4513',
    image: 'https://cdn-icons-png.flaticon.com/512/135/135620.png'
  }
];
