
import React, { useState } from 'react';
import { Alternative } from '../types';

interface MockCheckoutProps {
  alternative: Alternative;
  onConfirm: () => void;
  onCancel: () => void;
}

const MockCheckout: React.FC<MockCheckoutProps> = ({ alternative, onConfirm, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl border border-green-100 overflow-hidden relative">
        {/* Progress Bar (simulated) */}
        {isProcessing && (
          <div className="absolute top-0 left-0 h-1.5 bg-green-500 animate-progress-loading" style={{ width: '100%' }} />
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-gray-900 font-heading">Secure Checkout</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200 p-2 shrink-0">
              <span className="text-3xl">📦</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Eco Selection</p>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{alternative.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{alternative.description}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Eco Saving Rewards</span>
              <span className="text-green-600 font-bold">+{alternative.rewardPoints} Pts</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Carbon Reduction</span>
              <span className="text-green-600 font-bold">-{alternative.carbonSaved.toFixed(1)}kg CO2</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-dashed border-slate-300">
              <span className="text-gray-900 font-black">Mock Total</span>
              <span className="text-gray-900 font-black text-xl">$XX.XX</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePurchase}
            disabled={isProcessing}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center space-x-3 ${
              isProcessing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 shadow-green-100 active:scale-95'
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Complete Purchase</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
          
          <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
            🛡️ Mock payment secured by EcoBuy
          </p>
        </div>
      </div>
    </div>
  );
};

export default MockCheckout;