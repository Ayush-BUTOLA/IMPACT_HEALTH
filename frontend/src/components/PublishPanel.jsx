import React, { useState, useEffect } from 'react';
import { Calendar, Eye, ShieldAlert, Award, FileText, Clock, Save, Send } from 'lucide-react';

export default function PublishPanel({
  content = "",
  status = "draft",
  featured = false,
  onStatusChange,
  onFeaturedChange,
  onSave,
  isEditMode = false
}) {
  const [visibility, setVisibility] = useState('Public');
  const [scheduleDate, setScheduleDate] = useState('');
  const [password, setPassword] = useState('');

  // Stats calculation
  const [stats, setStats] = useState({ words: 0, chars: 0, readingTime: 1 });

  useEffect(() => {
    // Strip HTML tags to get pure text content
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const text = doc.body.textContent || "";
    const chars = text.length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(words / 200)); // Average 200 wpm
    
    setStats({ words, chars, readingTime });
  }, [content]);

  return (
    <div className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] space-y-6 sticky top-24 select-none">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="font-bold text-base text-[#1D2A72]">Publishing Desk</h3>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">Control publication status and access.</p>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSave('draft')}
          className="flex items-center justify-center gap-1.5 py-3 text-xs font-bold border border-[#5A67F2]/20 hover:bg-[#5A67F2]/5 rounded-[12px] text-[#5A67F2] transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={() => onSave('published')}
          className="flex items-center justify-center gap-1.5 py-3 text-xs font-bold bg-[#1D2A72] text-white hover:opacity-90 rounded-[12px] transition cursor-pointer shadow-md shadow-[#1D2A72]/15"
        >
          <Send className="w-4 h-4" />
          {isEditMode ? 'Update Blog' : 'Publish'}
        </button>
      </div>

      <hr className="border-slate-100" />

      {/* Visibility Settings */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1D2A72] uppercase tracking-wider">
          <Eye className="w-4 h-4 text-[#5A67F2]" />
          <span>Visibility</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Public', 'Private', 'Protected'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setVisibility(option)}
              className={`py-2 px-1 text-[11px] font-bold rounded-[10px] border transition cursor-pointer ${
                visibility === option
                  ? 'bg-[#5A67F2]/10 border-[#5A67F2] text-[#5A67F2]'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {visibility === 'Protected' && (
          <input
            type="password"
            placeholder="Set Access Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[10px] focus:outline-none focus:border-[#5A67F2] text-[#1D2A72] font-semibold"
          />
        )}
      </div>

      {/* Scheduling (UI only) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1D2A72] uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-[#5A67F2]" />
          <span>Schedule Post (Optional)</span>
        </div>
        <input
          type="datetime-local"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[10px] text-[#1D2A72] font-semibold outline-none focus:border-[#5A67F2] transition"
        />
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center justify-between bg-[#F8FAFF] p-3.5 rounded-[16px] border border-[#5A67F2]/5">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#5A67F2]" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#1D2A72]">Featured Article</span>
            <span className="text-[9px] text-slate-400 font-semibold">Highlight on homepage</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onFeaturedChange(!featured)}
          className={`w-10 h-6 rounded-full transition-colors relative focus:outline-none ${
            featured ? 'bg-[#35C76F]' : 'bg-slate-200'
          }`}
        >
          <span
            className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 left-0.75 transition-transform ${
              featured ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <hr className="border-slate-100" />

      {/* Document Metrics */}
      <div className="space-y-3 bg-[#F8FAFF] p-4 rounded-[18px] border border-[#5A67F2]/5">
        <h4 className="text-xs font-bold text-[#1D2A72] uppercase tracking-wider mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#5A67F2]" />
          Article Metrics
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-2.5 rounded-[12px] border border-[#5A67F2]/5 shadow-sm">
            <div className="text-base font-bold text-[#1D2A72]">{stats.words}</div>
            <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Words</div>
          </div>
          <div className="bg-white p-2.5 rounded-[12px] border border-[#5A67F2]/5 shadow-sm">
            <div className="text-base font-bold text-[#1D2A72]">{stats.chars}</div>
            <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Chars</div>
          </div>
          <div className="bg-white p-2.5 rounded-[12px] border border-[#5A67F2]/5 shadow-sm">
            <div className="text-base font-bold text-[#1D2A72] flex items-center justify-center gap-0.5">
              {stats.readingTime}
              <Clock className="w-3 h-3 text-[#5A67F2]" />
            </div>
            <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Min Read</div>
          </div>
        </div>
      </div>
    </div>
  );
}
