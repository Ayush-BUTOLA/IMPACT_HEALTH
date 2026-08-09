import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminState } from '../../context/AdminStateContext';
import { motion } from 'motion/react';
import {
  FileText,
  Send,
  Bookmark,
  Eye,
  Clock,
  TrendingUp,
  PlusCircle,
  Activity,
  HeartPulse,
  Save
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import CategoryBadge from '../../components/CategoryBadge';

export default function Dashboard() {
  const { blogs, addBlog, triggerToast } = useAdminState();
  const navigate = useNavigate();

  // Quick Draft State
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('Disease & Diagnosis');

  // Stats calculation
  const totalBlogs = blogs.length;
  const publishedCount = blogs.filter(b => b.status === 'published').length;
  const draftCount = blogs.filter(b => b.status === 'draft').length;
  const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
  
  // Calculate average reading time (e.g. "5 min read" -> 5)
  const avgReadingTimeVal = blogs.length > 0 
    ? Math.round(blogs.reduce((sum, b) => {
        const min = parseInt(b.readingTime || '5');
        return sum + (isNaN(min) ? 5 : min);
      }, 0) / blogs.length) 
    : 0;

  const handleQuickDraftSubmit = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) {
      triggerToast("Please enter a title for the quick draft.", "error");
      return;
    }

    const newDraft = {
      title: quickTitle,
      slug: quickTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      shortDescription: "Quick draft created from the dashboard.",
      content: "<p>Start writing your content here...</p>",
      category: quickCategory,
      tags: ["Draft"],
      author: "Dr. Elena Rostova",
      readingTime: "1 min read",
      featured: false,
      status: "draft",
      featuredImage: ""
    };

    addBlog(newDraft);
    setQuickTitle('');
  };

  const statCards = [
    { title: "Total Articles", value: totalBlogs, icon: FileText, color: "text-[#5A67F2] bg-[#5A67F2]/10" },
    { title: "Published Posts", value: publishedCount, icon: Send, color: "text-[#35C76F] bg-[#35C76F]/10" },
    { title: "Active Drafts", value: draftCount, icon: Bookmark, color: "text-amber-500 bg-amber-50" },
    { title: "Lifetime Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-cyan-500 bg-cyan-50" },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#1D2A72] to-[#5A67F2] p-8 rounded-[24px] text-white shadow-lg relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-white/5 -mr-20 -mt-20 blur-2xl" />
        <div className="absolute left-1/3 bottom-0 w-40 h-40 rounded-full bg-white/5 -ml-10 -mb-10 blur-xl" />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[#35C76F]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#35C76F]">Welcome Back</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight">Impact Health Editorial Dashboard</h2>
          <p className="text-xs text-[#ECECFE]/85 font-medium max-w-xl leading-relaxed">
            Manage disease management guides, diagnostics articles, wellness updates, and clinical trials reports.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/create')}
          className="relative z-10 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#35C76F] text-white font-bold text-xs rounded-[14px] hover:opacity-90 active:scale-98 transition shadow-lg shadow-[#35C76F]/25 cursor-pointer flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Article
        </button>
      </div>

      {/* Stats Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="bg-white border border-[#5A67F2]/10 rounded-[20px] p-5 shadow-[0_8px_30px_rgba(29,42,114,0.02)] flex items-center justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{card.title}</span>
                <span className="text-2xl font-black text-[#1D2A72] block">{card.value}</span>
              </div>
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Middle Grid: Analytics & Quick Draft */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SVG Analytics Chart */}
        <div className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#5A67F2]" />
              <div>
                <h3 className="font-bold text-sm text-[#1D2A72]">Reader Analytics</h3>
                <span className="text-[10px] text-slate-400 font-semibold">Comparative performance metrics</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-[#35C76F] bg-[#35C76F]/10 border border-[#35C76F]/20 px-2 py-0.5 rounded-full">
              +14.8% Monthly growth
            </span>
          </div>

          {/* Custom SVG Line Chart */}
          <div className="relative pt-4">
            <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 200">
              {/* Grid lines */}
              <line x1="0" y1="0" x2="500" y2="0" stroke="#f1f5f9" strokeWidth="1.5" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1.5" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1.5" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1.5" />
              <line x1="0" y1="200" x2="500" y2="200" stroke="#f8fafc" strokeWidth="2" />

              {/* Chart Line Gradient */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5A67F2" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#5A67F2" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Area path */}
              <path
                d="M 0 160 Q 80 120 120 140 T 250 80 T 380 90 T 500 40 L 500 200 L 0 200 Z"
                fill="url(#chartGradient)"
              />

              {/* Line path */}
              <path
                d="M 0 160 Q 80 120 120 140 T 250 80 T 380 90 T 500 40"
                fill="none"
                stroke="#1D2A72"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Secondary line (Views) */}
              <path
                d="M 0 190 Q 80 160 120 180 T 250 120 T 380 140 T 500 80"
                fill="none"
                stroke="#35C76F"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Dots */}
              <circle cx="120" cy="140" r="4.5" fill="#1D2A72" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="250" cy="80" r="4.5" fill="#1D2A72" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="380" cy="90" r="4.5" fill="#1D2A72" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="500" cy="40" r="4.5" fill="#1D2A72" stroke="#ffffff" strokeWidth="1.5" />
            </svg>

            {/* Labels */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase mt-3">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4 (Current)</span>
            </div>
          </div>
        </div>

        {/* Quick Draft Box */}
        <div className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#1D2A72]">Quick Writer</h3>
            <span className="text-[10px] text-slate-400 font-semibold">Instantly save thoughts as drafts.</span>
          </div>

          <form onSubmit={handleQuickDraftSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Draft Title
              </label>
              <input
                type="text"
                placeholder="e.g. New Insights on Hypertension"
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[12px] text-xs text-[#1D2A72] font-semibold outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Category
              </label>
              <select
                value={quickCategory}
                onChange={(e) => setQuickCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[12px] text-xs text-[#1D2A72] font-semibold focus:outline-none focus:border-[#5A67F2] cursor-pointer"
              >
                <option value="Disease & Diagnosis">Disease & Diagnosis</option>
                <option value="Management">Management</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Research">Research</option>
                <option value="Wellness">Wellness</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-bold bg-[#1D2A72] text-white hover:opacity-90 rounded-[12px] transition cursor-pointer shadow-sm shadow-[#1D2A72]/15"
            >
              <Save className="w-3.5 h-3.5" />
              Save Quick Draft
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Row: Recent Activity Log & Top Performing posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Blogs */}
        <div className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#1D2A72]">Trending Articles</h3>
            <Link to="/admin/blogs" className="text-xs font-bold text-[#5A67F2] hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {blogs
              .filter(b => b.status === 'published')
              .slice(0, 3)
              .map((blog) => (
                <div key={blog.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={blog.featuredImage || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=60&h=45&q=80"}
                      alt=""
                      className="w-10 h-7 object-cover rounded-[6px] border border-slate-100"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#1D2A72] line-clamp-1">
                        {blog.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        By {blog.author} • <CategoryBadge category={blog.category} />
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1D2A72] bg-[#F8FAFF] px-2.5 py-1 rounded-[8px] border border-[#5A67F2]/5 flex-shrink-0">
                    {blog.views.toLocaleString()} views
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#5A67F2]" />
            <h3 className="font-bold text-sm text-[#1D2A72]">Activity Logs</h3>
          </div>

          <div className="space-y-3.5">
            {[
              { type: 'publish', msg: 'Cardiology guide was published by Elena R.', time: '10 mins ago' },
              { type: 'draft', msg: 'Glucose monitoring draft saved successfully', time: '1 hour ago' },
              { type: 'category', msg: 'Category "Mental Health" was updated', time: 'Yesterday' },
              { type: 'settings', msg: 'Site newsletter subscriptions activated', time: '2 days ago' },
            ].map((log, idx) => (
              <div key={idx} className="flex gap-3 text-xs leading-normal">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5A67F2] mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-700">{log.msg}</p>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
