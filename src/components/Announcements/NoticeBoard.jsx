import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { Megaphone, Plus, Bell, Calendar, User, X, Check } from 'lucide-react';

export const NoticeBoard = () => {
  const { announcements, addAnnouncement } = usePlacement();
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Placement Drive',
    priority: 'High',
    author: 'Placement Cell Officer',
    content: ''
  });

  const categories = ['All', 'Placement Drive', 'Workshop', 'Policy Update'];

  const filteredAnnouncements = announcements.filter(a => 
    filterCategory === 'All' || a.category === filterCategory
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(formData);
    setFormData({
      title: '',
      category: 'Placement Drive',
      priority: 'High',
      author: 'Placement Cell Officer',
      content: ''
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
        <div>
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-400" />
            TPO Notice Board & Communication Hub
          </h2>
          <p className="text-xs text-gray-400">Official notifications broadcasted to student community</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Broadcast Announcement
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 glass-card p-3 rounded-2xl">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === cat
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements Timeline List */}
      <div className="space-y-3">
        {filteredAnnouncements.map(notice => (
          <div key={notice.id} className="glass-panel p-5 rounded-2xl border border-gray-800/80 hover:border-gray-700 transition-all space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    notice.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    notice.priority === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {notice.priority} Priority
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold px-2 py-0.5 bg-gray-800 rounded">
                    {notice.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{notice.title}</h3>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-500 shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{notice.date}</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-gray-950/40 p-3 rounded-xl border border-gray-800">
              {notice.content}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-gray-500">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Author: <strong className="text-gray-300">{notice.author}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                Post Announcement
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  placeholder="e.g. Pre-placement talk schedule"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-gray-900"
                  >
                    <option value="Placement Drive">Placement Drive</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Policy Update">Policy Update</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-gray-900"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Detailed Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  placeholder="Broadcast instructions..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-600/30"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
