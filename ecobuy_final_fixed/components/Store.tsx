
import React from 'react';
import { MOCK_VOUCHERS } from '../constants';
import { Voucher } from '../types';

interface StoreProps {
  userPoints: number;
  onPurchase: (voucher: Voucher) => void;
}

const Store: React.FC<StoreProps> = ({ userPoints, onPurchase }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-extrabold text-gray-900 font-heading">Eco Rewards Store</h2>
        <p className="text-gray-500">Redeem your hard-earned points for sustainable gift cards and vouchers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_VOUCHERS.map((voucher) => {
          const canAfford = userPoints >= voucher.pointsCost;
          
          return (
            <div 
              key={voucher.id}
              className={`relative overflow-hidden rounded-3xl p-6 shadow-xl transition-all border-4 ${
                canAfford ? 'border-transparent hover:-translate-y-2' : 'border-gray-100 opacity-75'
              }`}
              style={{ backgroundColor: voucher.color }}
            >
              {/* Card Pattern/Overlay */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full text-white">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center p-3 backdrop-blur-md">
                    <img 
                      src={voucher.image} 
                      alt={voucher.brand} 
                      className="w-full h-full object-contain filter brightness-0 invert" 
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70">Points Required</p>
                    <p className="text-2xl font-black">{voucher.pointsCost}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-lg font-bold opacity-80">{voucher.brand}</h3>
                  <p className="text-3xl font-black mb-6">{voucher.value}</p>
                  
                  <button
                    onClick={() => canAfford && onPurchase(voucher)}
                    disabled={!canAfford}
                    className={`w-full py-4 rounded-2xl font-bold transition-all ${
                      canAfford 
                        ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg' 
                        : 'bg-white/20 text-white cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Now' : `Need ${voucher.pointsCost - userPoints} more points`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Store;
