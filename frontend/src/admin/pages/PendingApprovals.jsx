import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, Stethoscope, ChevronRight, AlertCircle } from 'lucide-react';
import apiService from '../../api/apiService';

export default function PendingApprovals() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  const fetchPendingBlogs = async () => {
    setLoading(true);
    try {
      const data = await apiService.getPendingBlogs();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching pending blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 animate-pulse" /> Admin Approval Desk
          </div>
          <h1 className="text-2xl font-bold text-[#1D2A72]">Pending Blog Approvals</h1>
          <p className="text-sm text-slate-500 mt-0.5">Articles submitted by doctors awaiting medical compliance & editorial approval.</p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>{blogs.length} Articles Pending Action</span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 font-semibold text-sm">Loading pending approval queue...</div>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto font-bold text-xl">
            ✓
          </div>
          <h3 className="text-lg font-bold text-[#1D2A72]">Approval Queue Clear!</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">There are no doctor submissions currently waiting for review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(245,158,11,0.06)] overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  {blog.featuredImage ? (
                    <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold text-sm">
                      No Image Provided
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-sm animate-pulse">
                    PENDING REVIEW
                  </span>
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#1D2A72]/80 backdrop-blur-md text-white font-bold text-xs">
                    {blog.category?.name || 'Category'}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-[#1D2A72] text-base line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {blog.shortDescription}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs overflow-hidden flex-shrink-0">
                      {blog.author?.profileImage ? (
                        <img src={blog.author.profileImage} alt={blog.author.name} className="w-full h-full object-cover" />
                      ) : (
                        <Stethoscope className="w-4 h-4 text-[#1D2A72]" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#1D2A72] truncate">{blog.author?.name || 'Doctor'}</span>
                      <span className="text-[10px] text-slate-400">
                        Submitted: {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Today'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <Link
                  to={`/admin/review/${blog.id}`}
                  className="w-full py-2.5 rounded-xl bg-[#1D2A72] text-white font-bold text-xs hover:bg-[#1D2A72]/90 transition shadow-md shadow-[#1D2A72]/20 flex items-center justify-center gap-2"
                >
                  Review Blog <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
