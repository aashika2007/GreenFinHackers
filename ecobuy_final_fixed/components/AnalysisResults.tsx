
import React from 'react';
import { ProductAnalysis, Alternative } from '../types';
import CarbonChart from './CarbonChart';

interface AnalysisResultsProps {
  analysis: ProductAnalysis;
  alternatives: Alternative[];
  onSelectAlternative: (alt: Alternative) => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, alternatives, onSelectAlternative }) => {
  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 pb-20">
      {/* Main Analysis Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex flex-wrap items-start justify-between mb-6 gap-4">
            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-md border border-green-100">Verified Product</span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{analysis.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{analysis.name}</h1>
              <p className="text-gray-500 font-medium">Brand: <span className="text-gray-900">{analysis.brand}</span></p>
            </div>
            <div className={`px-5 py-3 rounded-2xl text-center shadow-sm border ${
              analysis.carbonScore > 70 
                ? 'bg-green-50 text-green-700 border-green-100' 
                : 'bg-orange-50 text-orange-700 border-orange-100'
            }`}>
              <p className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Eco Score</p>
              <p className="text-2xl font-black">{analysis.carbonScore}/100</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100">
            <div className="flex items-center space-x-2 mb-3">
              <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Analysis Breakdown</h4>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{analysis.summary}</p>
          </div>

          <div className="mt-auto grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
            <div className="text-center group">
              <div className="w-2 h-2 rounded-full bg-green-600 mx-auto mb-2 group-hover:scale-125 transition-transform" />
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Manufacturing</p>
              <p className="text-xl font-black text-gray-800">{analysis.footprint.manufacturing.toFixed(1)}kg</p>
            </div>
            <div className="text-center group">
              <div className="w-2 h-2 rounded-full bg-green-400 mx-auto mb-2 group-hover:scale-125 transition-transform" />
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Packaging</p>
              <p className="text-xl font-black text-gray-800">{analysis.footprint.packaging.toFixed(1)}kg</p>
            </div>
            <div className="text-center group">
              <div className="w-2 h-2 rounded-full bg-green-200 mx-auto mb-2 group-hover:scale-125 transition-transform" />
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Delivery</p>
              <p className="text-xl font-black text-gray-800">{analysis.footprint.delivery.toFixed(1)}kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Footprint Share</h3>
          <p className="text-xs text-gray-400 mb-6 text-center">Carbon impact distributed across lifecycle</p>
          <CarbonChart data={analysis.footprint} />
          <div className="mt-8 text-center bg-green-600 w-full py-6 rounded-2xl shadow-lg shadow-green-100 text-white">
            <p className="text-5xl font-black">{analysis.footprint.total.toFixed(1)}kg</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Total Carbon Footprint</p>
          </div>
        </div>
      </div>

      {/* Alternatives Section */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
              <span className="text-2xl">🌍</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-heading">Eco-Friendly Alternatives</h2>
              <p className="text-sm text-gray-500">Earn points by making more sustainable choices</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alternatives.map((alt) => (
            <div key={alt.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                  alt.type === 'second_hand' 
                    ? 'bg-purple-50 text-purple-700 border-purple-100' 
                    : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {alt.type.replace(/_/g, ' ')}
                </span>
                <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <span className="text-xs">✨</span>
                  <span className="text-xs font-black text-yellow-700">+{alt.rewardPoints}</span>
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">{alt.name}</h4>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed flex-grow">{alt.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Net Savings</span>
                  <span className="text-green-600 font-black text-lg">-{alt.carbonSaved.toFixed(1)}kg CO2</span>
                </div>
                <button 
                  onClick={() => onSelectAlternative(alt)}
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition-all shadow-md active:scale-95"
                >
                  Buy & Earn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
