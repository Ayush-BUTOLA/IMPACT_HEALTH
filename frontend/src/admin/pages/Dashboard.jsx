import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
  Stethoscope,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import apiService from '../../api/apiService';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    published: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all blogs for metrics and table
      const res = await apiService.getAdminBlogs({ page: 0, size: 50 });
      const blogList = res.content || [];
      setBlogs(blogList);

      // Fetch pending blogs for dedicated review section
      const pendingList = await apiService.getPendingBlogs();
      setPendingBlogs(Array.isArray(pendingList) ? pendingList : []);

      // Calculate statistics
      const pendingCount = blogList.filter(b => b.status === 'PENDING').length;
      const publishedCount = blogList.filter(b => b.status === 'PUBLISHED').length;
      const rejectedCount = blogList.filter(b => b.status === 'REJECTED').length;

      setStats({
        total: blogList.length,
        pending: pendingCount || (Array.isArray(pendingList) ? pendingList.length : 0),
        published: publishedCount,
        rejected: rejectedCount
      });
    } catch (error) {
      console.error('Error loading admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PUBLISHED':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3.5 h-3.5"/> Published</span>;
      case 'PENDING':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 w-fit animate-pulse"><Clock className="w-3.5 h-3.5"/> Pending Approval</span>;
      case 'CHANGES_REQUESTED':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 flex items-center gap-1 w-fit"><AlertCircle className="w-3.5 h-3.5"/> Changes Requested</span>;
      case 'REJECTED':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-700 flex items-center gap-1 w-fit"><XCircle className="w-3.5 h-3.5"/> Rejected</span>;
      default:
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600 w-fit">Draft</span>;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D2A72] tracking-tight">Healthcare Administration Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Review medical submissions, approve articles, and manage doctor publications.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/pending"
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition shadow-md shadow-amber-500/20 flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Pending Reviews ({stats.pending})
          </Link>
          <Link
            to="/doctor/blogs"
            className="px-4 py-2.5 rounded-xl bg-[#1D2A72] text-white font-bold text-sm hover:bg-[#1D2A72]/90 transition shadow-md shadow-[#1D2A72]/20 flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            Doctor Portal
          </Link>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Blogs */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Blogs</span>
            <h3 className="text-3xl font-extrabold text-[#1D2A72] mt-1">{stats.total}</h3>
            <span className="text-xs text-slate-500 mt-1 block">In system repository</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#5A67F2] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Pending Approval */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(245,158,11,0.06)] flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Approval</span>
            <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{stats.pending}</h3>
            <span className="text-xs text-amber-700 mt-1 block font-medium">Requires Admin Review</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center animate-pulse">
            <Clock className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Published Blogs */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Published Blogs</span>
            <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.published}</h3>
            <span className="text-xs text-emerald-700 mt-1 block">Live on public portal</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Rejected Blogs */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Rejected Blogs</span>
            <h3 className="text-3xl font-extrabold text-rose-600 mt-1">{stats.rejected}</h3>
            <span className="text-xs text-rose-500 mt-1 block">Feedback sent to doctor</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* Pending Approval Section */}
      {pendingBlogs.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/60 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-amber-900">Articles Waiting For Approval ({pendingBlogs.length})</h2>
                <p className="text-xs text-amber-800">Doctors have submitted these articles. Review content and decide approval status.</p>
              </div>
            </div>
            <Link
              to="/admin/pending"
              className="text-xs font-bold text-amber-900 hover:text-amber-950 underline flex items-center gap-1"
            >
              View All Pending <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {pendingBlogs.slice(0, 2).map((blog) => (
              <div key={blog.id} className="bg-white p-4 rounded-xl border border-amber-100 flex flex-col justify-between shadow-sm">
                <div className="flex gap-4">
                  {blog.featuredImage ? (
                    <img src={blog.featuredImage} alt={blog.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs flex-shrink-0">
                      No Image
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#5A67F2] uppercase tracking-wider block">{blog.category?.name}</span>
                    <h4 className="font-bold text-[#1D2A72] text-sm truncate mt-0.5">{blog.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{blog.shortDescription}</p>
                    <span className="text-[11px] text-slate-400 mt-2 block font-medium">By {blog.author?.name}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Status: Pending
                  </span>
                  <Link
                    to={`/admin/review/${blog.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1D2A72] text-white text-xs font-bold hover:bg-[#1D2A72]/90 transition flex items-center gap-1.5 shadow-sm"
                  >
                    Review Blog <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Blog Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1D2A72]">Recent Blog Submissions</h3>
            <p className="text-xs text-slate-500">Live overview of recent doctor articles across all workflow statuses.</p>
          </div>
          <Link to="/admin/blogs" className="text-xs font-bold text-[#5A67F2] hover:underline flex items-center gap-1">
            View All Blogs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 font-semibold text-sm">Loading dashboard submissions...</div>
        ) : blogs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-semibold text-sm">No blogs submitted yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Blog Title</th>
                  <th className="py-3 px-4">Doctor / Author</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Submitted Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {blogs.slice(0, 8).map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-semibold text-[#1D2A72] max-w-xs truncate">
                      {blog.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {blog.author?.name || 'Dr. Elena Rostova'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {blog.category?.name || 'General'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Today'}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(blog.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {blog.status === 'PENDING' ? (
                        <Link
                          to={`/admin/review/${blog.id}`}
                          className="px-3 py-1 rounded-lg bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition inline-flex items-center gap-1"
                        >
                          Review <ChevronRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <Link
                          to={`/admin/review/${blog.id}`}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition inline-flex items-center gap-1"
                        >
                          View <Eye className="w-3 h-3" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
