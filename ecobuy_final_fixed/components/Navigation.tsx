
import React from 'react';

interface NavigationProps {
  currentTab: string;
  setTab: (tab: string) => void;
  points: number;
  avatar: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, setTab, points, avatar }) => {
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-green-100 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setTab('home')}>
        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <span className="text-2xl font-bold font-heading text-green-900 hidden sm:inline">EcoBuy</span>
      </div>

      <div className="hidden lg:flex space-x-8">
        {['home', 'leaderboard', 'game', 'store'].map((tab) => (
          <button
            key={tab}
            onClick={() => setTab(tab)}
            className={`capitalize font-bold text-sm transition-colors tracking-wide ${
              currentTab === tab ? 'text-green-600 border-b-2 border-green-600 pb-1' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-green-50 px-3 py-1.5 rounded-full border border-green-100 flex items-center space-x-2">
          <span className="text-green-600 font-bold text-sm">✨ {points}</span>
          <span className="hidden xs:inline text-[10px] text-green-700 font-black uppercase tracking-wider">Pts</span>
        </div>
        <button 
          onClick={() => setTab('profile')}
          className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 ${
            currentTab === 'profile' ? 'border-green-600 shadow-md' : 'border-green-200'
          }`}
        >
          <img src={avatar} alt="User Profile" className="w-full h-full object-cover bg-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;