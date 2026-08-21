import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Tag,
  Stethoscope,
  Clock,
  X,
  FileText,
  Sparkles
} from 'lucide-react';
import apiService from '../../api/apiService';

export default function BlogReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modals state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [changesReason, setChangesReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const fetchBlogDetail = async () => {
    setLoading(true);
    try {
      const data = await apiService.getBlogById(id);
      setBlog(data);
    } catch (err) {
      console.error('Error fetching blog review detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!window.confirm('Are you sure you want to approve and publish this blog? It will immediately become live on the public website.')) {
      return;
    }
    setActionLoading(true);
    try {
      await apiService.approveBlog(id);
      alert('Blog approved and published successfully!');
      navigate('/admin/pending');
    } catch (err) {
      alert('Failed to approve blog: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!rejectReason.trim()) {
      setErrorMessage('Rejection reason is required.');
      return;
    }
    setActionLoading(true);
    try {
      await apiService.rejectBlog(id, rejectReason.trim());
      alert('Blog rejected. Reason communicated to author.');
      setShowRejectModal(false);
      navigate('/admin/pending');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestChangesSubmit = async (e) => {
    e.preventDefault();
    if (!changesReason.trim()) {
      setErrorMessage('Change notes for doctor are required.');
      return;
    }
    setActionLoading(true);
    try {
      await apiService.requestChanges(id, changesReason.trim());
      alert('Change request sent to doctor successfully.');
      setShowChangesModal(false);
      navigate('/admin/pending');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-slate-400 font-semibold text-sm">Loading article for preview...</div>;
  }

  if (!blog) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-slate-500 font-bold">Blog not found.</p>
        <Link to="/admin/blogs" className="text-[#5A67F2] font-bold text-sm underline">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28">
      {/* Top Banner / Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link to="/admin/pending" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1D2A72] transition">
          <ArrowLeft className="w-4 h-4" /> Back to Pending Queue
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Article ID: #{blog.id}</span>
          <span className={`px-3 py-1 text-xs font-extrabold rounded-full ${
            blog.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' :
            blog.status === 'PENDING' ? 'bg-amber-100 text-amber-800 animate-pulse' :
            blog.status === 'CHANGES_REQUESTED' ? 'bg-blue-100 text-blue-800' :
            blog.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {blog.status}
          </span>
        </div>
      </div>

      {/* Admin Notice Banner */}
      <div className="bg-[#1D2A72] text-white p-4 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="font-bold text-base">Public Website Live Preview Mode</h2>
            <p className="text-xs text-slate-300">You are inspecting this article exactly as readers will see it once published.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApprove}
            disabled={actionLoading}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition shadow-md shadow-emerald-500/30 flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" /> Approve & Publish
          </button>
          <button
            onClick={() => { setErrorMessage(''); setShowChangesModal(true); }}
            disabled={actionLoading}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <AlertCircle className="w-4 h-4" /> Request Changes
          </button>
          <button
            onClick={() => { setErrorMessage(''); setShowRejectModal(true); }}
            disabled={actionLoading}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <XCircle className="w-4 h-4" /> Reject
          </button>
        </div>
      </div>

      {/* Existing Rejection / Feedback Note if present */}
      {blog.rejectionReason && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-900 text-xs font-medium space-y-1">
          <span className="font-bold uppercase tracking-wider block text-rose-700">Existing Administrative Note / Feedback:</span>
          <p className="bg-white p-3 rounded-xl border border-rose-100 text-slate-700 font-mono">{blog.rejectionReason}</p>
        </div>
      )}

      {/* ARTICLE PUBLIC PREVIEW CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto overflow-hidden">
        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="relative h-96 bg-slate-900 overflow-hidden">
            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-[#5A67F2] text-white font-bold text-xs uppercase tracking-wider">
                {blog.category?.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
                {blog.title}
              </h1>
            </div>
          </div>
        )}

        <div className="p-8 md:p-12 space-y-8">
          {/* Header metadata if no image */}
          {!blog.featuredImage && (
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <span className="px-3.5 py-1 rounded-full bg-slate-100 text-[#1D2A72] font-bold text-xs uppercase tracking-wider">
                {blog.category?.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D2A72] tracking-tight">
                {blog.title}
              </h1>
            </div>
          )}

          {/* Doctor / Author Meta */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1D2A72] text-white flex items-center justify-center font-bold overflow-hidden shadow-sm">
                {blog.author?.profileImage ? (
                  <img src={blog.author.profileImage} alt={blog.author.name} className="w-full h-full object-cover" />
                ) : (
                  <Stethoscope className="w-6 h-6" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-[#1D2A72] text-base">{blog.author?.name || 'Dr. Elena Rostova'}</h4>
                <p className="text-xs text-slate-500 font-medium">{blog.author?.specialization || 'Medical Specialist'}</p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-400 font-medium space-y-1">
              <div className="flex items-center gap-1.5 justify-end">
                <Calendar className="w-3.5 h-3.5" />
                <span>Submitted: {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Today'}</span>
              </div>
              {blog.publishedAt && (
                <div className="flex items-center gap-1.5 justify-end text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Published: {new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Short Description */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-[#1D2A72] text-base font-medium italic leading-relaxed">
            "{blog.shortDescription}"
          </div>

          {/* Full Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-4">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Additional Images Gallery */}
          {blog.images && blog.images.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Additional Article Gallery Images</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {blog.images.map((img) => (
                  <img
                    key={img.id}
                    src={img.imagePath}
                    alt={img.altText || 'Gallery image'}
                    className="w-full h-40 object-cover rounded-xl border border-slate-200 shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-4 px-6 shadow-2xl flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reviewing Submission:</span>
          <span className="font-bold text-[#1D2A72] text-sm max-w-xs truncate">{blog.title}</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleApprove}
            disabled={actionLoading}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-emerald-500 text-white font-extrabold text-sm hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" /> Approve & Publish
          </button>
          <button
            onClick={() => { setErrorMessage(''); setShowChangesModal(true); }}
            disabled={actionLoading}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <AlertCircle className="w-5 h-5" /> Request Changes
          </button>
          <button
            onClick={() => { setErrorMessage(''); setShowRejectModal(true); }}
            disabled={actionLoading}
            className="px-5 py-3 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <XCircle className="w-5 h-5" /> Reject
          </button>
        </div>
      </div>

      {/* REJECT MODAL */}
      <AnimatePresence>
        {showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-rose-600 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Reject Blog Submission
                </h3>
                <button onClick={() => setShowRejectModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl">{errorMessage}</div>
              )}

              <form onSubmit={handleRejectSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Reason for rejection <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Provide detailed reason why this article was rejected so the doctor can review..."
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRejectModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition shadow-md shadow-rose-600/20"
                  >
                    {actionLoading ? 'Rejecting...' : 'Reject Blog'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REQUEST CHANGES MODAL */}
      <AnimatePresence>
        {showChangesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Request Changes from Doctor
                </h3>
                <button onClick={() => setShowChangesModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl">{errorMessage}</div>
              )}

              <form onSubmit={handleRequestChangesSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    What should the doctor change? <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={changesReason}
                    onChange={(e) => setChangesReason(e.target.value)}
                    placeholder="Specify edits, citations, or structural adjustments needed before approval..."
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowChangesModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
                  >
                    {actionLoading ? 'Sending...' : 'Send to Doctor'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
