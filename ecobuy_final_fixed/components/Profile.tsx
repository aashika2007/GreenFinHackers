
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    avatar: user.avatar
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...user,
      ...formData
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-50">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-48 relative">
          <button 
            onClick={onLogout}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur-md transition-all font-bold text-sm"
          >
            Sign Out
          </button>
        </div>
        
        <div className="px-10 pb-10 relative">
          <div className="flex flex-col md:flex-row items-end -mt-16 mb-8 gap-6">
            <div className="relative group">
              <img 
                src={formData.avatar} 
                alt={formData.name} 
                className="w-32 h-32 rounded-3xl border-8 border-white shadow-xl object-cover bg-white"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-white text-xs font-bold">Edit URL</span>
                </div>
              )}
            </div>
            
            <div className="flex-grow pb-2">
              <h2 className="text-3xl font-black text-gray-900 font-heading">{user.name}</h2>
              <p className="text-green-600 font-bold">Level {user.level} Sustainability Expert</p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
                isEditing ? 'bg-gray-100 text-gray-600' : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">About Me</h3>
                  <p className="text-gray-700 leading-relaxed italic">
                    {user.bio || "No bio set. Tell the community about your eco-journey!"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <p className="text-[10px] font-black text-green-700 uppercase mb-1">Total Savings</p>
                    <p className="text-2xl font-black text-green-900">{Math.floor(user.points / 5)}kg CO2</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-700 uppercase mb-1">Badges Earned</p>
                    <p className="text-2xl font-black text-blue-900">{user.badges.length || 0}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Achievements</h3>
                  <div className="flex flex-wrap gap-3">
                    {user.badges.length > 0 ? user.badges.map((badge, idx) => (
                      <span key={idx} className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-sm font-bold border border-amber-200">
                        🏅 {badge}
                      </span>
                    )) : (
                      <p className="text-sm text-gray-400 italic">No badges earned yet. Complete your first analysis!</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Contact Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-gray-400">📧</span>
                      <span className="text-gray-600 font-medium">{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Avatar URL</label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all"
                  placeholder="Tell us about your environmental goals..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95"
              >
                Save Profile Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
