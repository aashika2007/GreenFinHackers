
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import AnalysisResults from './components/AnalysisResults';
import Game from './components/Game';
import Store from './components/Store';
import Login from './components/Login';
import Profile from './components/Profile';
import MockCheckout from './components/MockCheckout';
import { analyzeProduct } from './services/geminiService';
import { ProductAnalysis, Alternative, User, Voucher } from './types';
import { MOCK_LEADERBOARD } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState('home');
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Eco Explorer',
    email: 'explorer@ecobuy.com',
    avatar: 'https://picsum.photos/seed/explorer/200/200',
    bio: 'Passionate about making sustainable choices.',
    points: 0,
    level: 1,
    badges: []
  });
  
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ analysis: ProductAnalysis, alternatives: Alternative[] } | null>(null);
  const [selectedAltForPurchase, setSelectedAltForPurchase] = useState<Alternative | null>(null);
  const [showRewardModal, setShowRewardModal] = useState<{ points: number, message: string, title?: string } | null>(null);

  const handleLogin = (email: string, name: string) => {
    setUser({
      ...user,
      email,
      name,
      points: 0, // Ensure we start from 0 on login
      level: 1,
      badges: []
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTab('home');
    setAnalysisResult(null);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  /**
   * Checks if a string is a valid URL.
   * We expect a protocol and a host at minimum.
   */
  const isValidUrl = (string: string) => {
    try {
      const urlObj = new URL(string);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError(null);

    let formattedUrl = url.trim();
    if (!formattedUrl) {
      setUrlError("Please enter a product URL.");
      return;
    }

    // Auto-fix missing protocol (common user behavior)
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    if (!isValidUrl(formattedUrl)) {
      setUrlError("Please enter a valid web URL (e.g., amazon.com/product).");
      return;
    }

    // Sync input field with formatted URL for clarity
    setUrl(formattedUrl);
    setIsLoading(true);
    
    try {
      const result = await analyzeProduct(formattedUrl);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setUrlError("AI Analysis failed. Make sure the link is to a specific product page.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitiatePurchase = (alt: Alternative) => {
    setSelectedAltForPurchase(alt);
  };

  const handleConfirmPurchase = () => {
    if (!selectedAltForPurchase) return;

    const alt = selectedAltForPurchase;
    const newPoints = user.points + alt.rewardPoints;
    setUser({ ...user, points: newPoints });
    
    setShowRewardModal({ 
      title: "Purchase Complete!",
      points: alt.rewardPoints, 
      message: `Success! You earned rewards and saved ${alt.carbonSaved.toFixed(1)}kg of carbon by choosing ${alt.name}.` 
    });

    setSelectedAltForPurchase(null);
    setAnalysisResult(null);
    setUrl('');
    setUrlError(null);
  };

  const handleGameComplete = (points: number) => {
    setUser({ ...user, points: user.points + points });
  };

  const handlePurchaseVoucher = (voucher: Voucher) => {
    if (user.points >= voucher.pointsCost) {
      setUser({ ...user, points: user.points - voucher.pointsCost });
      setShowRewardModal({
        title: "Voucher Redeemed!",
        points: -voucher.pointsCost,
        message: `Your ${voucher.brand} ${voucher.value} is ready. Your code: ECO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      });
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentTab={currentTab} 
        setTab={setCurrentTab} 
        points={user.points} 
        avatar={user.avatar} 
      />

      <main className="py-12 pb-24 md:pb-12">
        {currentTab === 'home' && (
          <div className="space-y-12">
            {!analysisResult && (
              <section className="max-w-4xl mx-auto px-6 text-center">
                <div className="mb-8 animate-float inline-block">
                  <div className="w-20 h-20 bg-green-500 rounded-3xl rotate-12 flex items-center justify-center shadow-xl shadow-green-200">
                    <svg className="w-12 h-12 text-white -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight font-heading">
                  Shop Smarter, <br/><span className="text-green-600 underline decoration-green-200">Save the Planet</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
                  Paste any product link below. We'll analyze its carbon footprint and find eco-friendly alternatives for you to earn rewards.
                </p>

                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleAnalyze} className="relative">
                    <input
                      type="text"
                      placeholder="Paste link from Amazon, Myntra, etc..."
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (urlError) setUrlError(null);
                      }}
                      className={`w-full px-8 py-5 rounded-2xl bg-white border-2 shadow-xl focus:ring-4 focus:ring-green-50 outline-none transition-all text-lg pr-32 ${
                        urlError ? 'border-red-300 focus:border-red-500' : 'border-green-100 focus:border-green-500'
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-3 top-3 bottom-3 bg-green-600 text-white px-6 rounded-xl font-bold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                    >
                      {isLoading ? 'Analyzing...' : 'Analyze'}
                    </button>
                  </form>
                  {urlError && (
                    <p className="mt-3 text-red-500 text-sm font-medium animate-pulse">
                      {urlError}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest">
                  <span>✨ 50+ Retailers</span>
                  <span>🌱 AI Carbon Audit</span>
                  <span>🏆 Daily Rewards</span>
                </div>
              </section>
            )}

            {analysisResult && (
              <AnalysisResults 
                analysis={analysisResult.analysis} 
                alternatives={analysisResult.alternatives}
                onSelectAlternative={handleInitiatePurchase}
              />
            )}
          </div>
        )}

        {currentTab === 'leaderboard' && (
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-50">
              <div className="bg-green-600 p-8 text-white text-center">
                <h2 className="text-3xl font-bold font-heading mb-2">Eco Champions</h2>
                <p className="opacity-80">Ranking based on carbon saved and eco-actions taken.</p>
              </div>
              <div className="divide-y divide-gray-50">
                {MOCK_LEADERBOARD.map((entry) => (
                  <div key={entry.rank} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-6">
                      <span className={`text-2xl font-black w-8 ${entry.rank === 1 ? 'text-yellow-500' : 'text-gray-300'}`}>#{entry.rank}</span>
                      <img src={entry.avatar} alt={entry.name} className="w-14 h-14 rounded-2xl shadow-sm border-2 border-white object-cover" />
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{entry.name}</p>
                        <p className="text-sm text-gray-400 font-medium">{Math.floor(entry.points / 10)}kg CO2 Saved</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-black text-xl">{entry.points}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Eco Points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'game' && <Game onComplete={handleGameComplete} />}
        
        {currentTab === 'store' && (
          <Store userPoints={user.points} onPurchase={handlePurchaseVoucher} />
        )}

        {currentTab === 'profile' && (
          <Profile user={user} onUpdate={handleUpdateProfile} onLogout={handleLogout} />
        )}
      </main>

      {/* Mobile Navigation for smaller screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-green-100 flex justify-around py-4 px-6 z-40">
        {['home', 'leaderboard', 'game', 'store'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setCurrentTab(tab);
              setAnalysisResult(null);
              setSelectedAltForPurchase(null);
            }}
            className={`capitalize font-black text-[10px] tracking-tighter flex flex-col items-center ${
              currentTab === tab ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full mb-1 ${currentTab === tab ? 'bg-green-600' : 'bg-transparent'}`} />
            {tab}
          </button>
        ))}
      </div>

      {/* Mock Checkout Modal */}
      {selectedAltForPurchase && (
        <MockCheckout 
          alternative={selectedAltForPurchase}
          onConfirm={handleConfirmPurchase}
          onCancel={() => setSelectedAltForPurchase(null)}
        />
      )}

      {/* Reward/Success Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl scale-in-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl animate-bounce shadow-lg ${
              showRewardModal.points < 0 ? 'bg-green-100 shadow-green-100' : 'bg-yellow-400 shadow-yellow-100'
            }`}>
              {showRewardModal.points < 0 ? '🎁' : '✨'}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{showRewardModal.title || "Rewards Earned!"}</h2>
            <p className={`text-2xl font-black mb-4 ${showRewardModal.points < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {showRewardModal.points > 0 ? '+' : ''}{showRewardModal.points} Points
            </p>
            <p className="text-gray-500 mb-8 font-medium">{showRewardModal.message}</p>
            <button 
              onClick={() => setShowRewardModal(null)}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-colors"
            >
              Continue Eco-journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
