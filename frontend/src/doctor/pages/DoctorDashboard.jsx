import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Edit,
  Send,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Stethoscope,
  X,
  FileText,
  Sparkles
} from 'lucide-react';
import apiService from '../../api/apiService';

export default function DoctorDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRejectReason, setSelectedRejectReason] = useState(null);

  useEffect(() => {
    fetchDoctorBlogs();
  }, []);

  const fetchDoctorBlogs = async () => {
    setLoading(true);
    try {
      const data = await apiService.getDoctorBlogs();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching doctor blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBlog = async (id, title) => {
    if (!window.confirm(`Submit "${title}" to Admin for approval?`)) return;
    try {
      await apiService.submitBlog(id);
      alert('Blog submitted for admin approval!');
      fetchDoctorBlogs();
    } catch (err) {
      alert('Failed to submit blog: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteBlog = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete draft "${title}"?`)) return;
    try {
      await apiService.deleteBlog(id);
      fetchDoctorBlogs();
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  const getStatusCard = (blog) => {
    switch (blog.status) {
      case 'DRAFT':
        return (
          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
            <Link
              to={`/doctor/blogs/edit/${blog.id}`}
              className="flex-1 py-2 rounded-xl bg-[#1D2A72] text-white font-bold text-xs hover:bg-[#1D2A72]/90 transition text-center flex items-center justify-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
            <button
              onClick={() => handleSubmitBlog(blog.id, blog.title)}
              className="flex-1 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Submit
            </button>
            <button
              onClick={() => handleDeleteBlog(blog.id, blog.title)}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition"
              title="Delete Draft"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );

      case 'PENDING':
        return (
          <div className="pt-3 border-t border-slate-100">
            <Link
              to={`/admin/review/${blog.id}`}
              className="w-full py-2 rounded-xl bg-slate-100 text-[#1D2A72] font-bold text-xs hover:bg-slate-200 transition text-center flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> View In Review State
            </Link>
          </div>
        );

      case 'CHANGES_REQUESTED':
        return (
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 text-[11px]">
              <span className="font-bold block">Admin Feedback:</span>
              <p className="line-clamp-2 italic">{blog.rejectionReason}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/doctor/blogs/edit/${blog.id}`}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition text-center flex items-center justify-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" /> Edit & Resubmit
              </Link>
            </div>
          </div>
        );

      case 'REJECTED':
        return (
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedRejectReason(blog.rejectionReason)}
                className="flex-1 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs hover:bg-rose-100 transition text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5" /> View Reason
              </button>
              <Link
                to={`/doctor/blogs/edit/${blog.id}`}
                className="flex-1 py-2 rounded-xl bg-[#1D2A72] text-white font-bold text-xs hover:bg-[#1D2A72]/90 transition text-center flex items-center justify-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" /> Edit & Resubmit
              </Link>
            </div>
          </div>
        );

      case 'PUBLISHED':
      default:
        return (
          <div className="pt-3 border-t border-slate-100">
            <Link
              to={`/blogs/${blog.slug}`}
              target="_blank"
              className="w-full py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 transition text-center flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> View Live Article
            </Link>
          </div>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PUBLISHED':
        return <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> PUBLISHED</span>;
      case 'PENDING':
        return <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 animate-pulse"><Clock className="w-3 h-3"/> PENDING APPROVAL</span>;
      case 'CHANGES_REQUESTED':
        return <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-100 text-blue-800 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> CHANGES REQUESTED</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-100 text-rose-700 flex items-center gap-1"><XCircle className="w-3 h-3"/> REJECTED</span>;
      default:
        return <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-slate-100 text-slate-600">DRAFT</span>;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1D2A72] to-[#5A67F2] p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 flex-shrink-0">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Physician Publishing Desk</span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Doctor Blog Management</h1>
            <p className="text-xs text-indigo-100 mt-1">Create medical research articles, track admin reviews, and publish to the patient portal.</p>
          </div>
        </div>

        <Link
          to="/doctor/blogs/create"
          className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-extrabold text-sm hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30 flex items-center gap-2 w-fit flex-shrink-0"
        >
          <Plus className="w-5 h-5" /> Write New Blog Post
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1D2A72]">My Submissions & Drafts ({blogs.length})</h2>
          <span className="text-xs text-slate-400 font-medium">Logged as: Dr. Elena Rostova</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400 font-semibold text-sm">Loading physician articles...</div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-4">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#1D2A72]">No Medical Blogs Created Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Start sharing health guidelines and research by writing your first article.</p>
            <Link
              to="/doctor/blogs/create"
              className="px-5 py-2.5 rounded-xl bg-[#1D2A72] text-white font-bold text-xs inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create Blog Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-100">
                    {blog.featuredImage ? (
                      <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">No Image</div>
                    )}
                    <div className="absolute top-3 right-3">{getStatusBadge(blog.status)}</div>
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#1D2A72]/80 backdrop-blur-md text-white font-bold text-xs">
                      {blog.category?.name}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-[#1D2A72] text-base line-clamp-2 leading-snug">{blog.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{blog.shortDescription}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">Last edited: {blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString() : 'Today'}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50">{getStatusCard(blog)}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* REJECTION REASON MODAL */}
      <AnimatePresence>
        {selectedRejectReason && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-rose-600 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Admin Rejection Reason
                </h3>
                <button onClick={() => setSelectedRejectReason(null)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 text-xs text-slate-700 font-mono leading-relaxed">
                {selectedRejectReason}
              </div>

              <button
                onClick={() => setSelectedRejectReason(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 font-bold text-xs text-slate-700 hover:bg-slate-200 transition"
              >
                Close Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
