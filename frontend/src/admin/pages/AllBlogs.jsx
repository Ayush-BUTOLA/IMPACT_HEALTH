import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import apiService from '../../api/apiService';

export default function AllBlogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || '';

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [categoryFilter, setCategoryFilter] = useState('');

  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setStatusFilter(searchParams.get('status') || '');
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [search, statusFilter, categoryFilter, page]);

  const fetchCategories = async () => {
    try {
      const data = await apiService.getPublicCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        size: 10,
        search: search.trim() || undefined,
        status: statusFilter || undefined,
        categoryId: categoryFilter || undefined,
      };
      const res = await apiService.getAdminBlogs(params);
      setBlogs(res.content || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error('Error fetching admin blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete blog "${title}"?`)) return;
    try {
      await apiService.deleteAdminBlog(id);
      fetchBlogs();
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PUBLISHED':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3.5 h-3.5"/> Published</span>;
      case 'PENDING':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 w-fit animate-pulse"><Clock className="w-3.5 h-3.5"/> Pending</span>;
      case 'CHANGES_REQUESTED':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 flex items-center gap-1 w-fit"><AlertCircle className="w-3.5 h-3.5"/> Changes Requested</span>;
      case 'REJECTED':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-700 flex items-center gap-1 w-fit"><XCircle className="w-3.5 h-3.5"/> Rejected</span>;
      default:
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600 w-fit">Draft</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D2A72]">Blog Management Repository</h1>
          <p className="text-sm text-slate-500 mt-0.5">Filter, review, edit, or remove doctor publications across all system statuses.</p>
        </div>

        <Link
          to="/doctor/blogs/create"
          className="px-4 py-2.5 rounded-xl bg-[#1D2A72] text-white font-bold text-xs hover:bg-[#1D2A72]/90 transition shadow-md shadow-[#1D2A72]/20 flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" /> Create New Article
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A67F2]"
          />
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setSearchParams(e.target.value ? { status: e.target.value } : {}); setPage(0); }}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending Approval</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Drafts</option>
              <option value="CHANGES_REQUESTED">Changes Requested</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(0); }}
            className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 font-semibold text-sm">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-semibold text-sm">No blogs matched your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Blog</th>
                  <th className="py-3.5 px-4">Doctor</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted Date</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        {blog.featuredImage ? (
                          <img src={blog.featuredImage} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-[10px]">No Img</div>
                        )}
                        <span className="font-bold text-[#1D2A72] text-xs line-clamp-2">{blog.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">
                      {blog.author?.name || 'Dr. Elena Rostova'}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {blog.category?.name || 'General'}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(blog.status)}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-emerald-600 font-semibold">
                      {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <Link
                        to={`/admin/review/${blog.id}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-[#1D2A72] text-xs font-bold hover:bg-slate-200 transition inline-flex items-center gap-1"
                        title="Review / View Blog"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>

                      <button
                        onClick={() => handleDelete(blog.id, blog.title)}
                        className="p-1 rounded-lg hover:bg-rose-50 text-rose-500 transition inline-flex items-center"
                        title="Delete Blog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Page {page + 1} of {totalPages}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
