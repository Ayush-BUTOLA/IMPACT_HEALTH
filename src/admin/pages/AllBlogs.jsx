import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminState } from '../../context/AdminStateContext';
import SearchBar from '../../components/SearchBar';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import CategoryBadge from '../../components/CategoryBadge';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { Calendar, Eye, Clock, PlusCircle } from 'lucide-react';

export default function AllBlogs() {
  const {
    blogs,
    categories,
    deleteBlog,
    duplicateBlog,
    setBlogToEdit,
    triggerToast
  } = useAdminState();

  const navigate = useNavigate();

  // Search & Filters State
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    author: ''
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal States
  const [previewBlog, setPreviewBlog] = useState(null);
  const [deleteBlogId, setDeleteBlogId] = useState(null);

  // Extract unique authors for filtering
  const authorsList = Array.from(new Set(blogs.map(b => b.author).filter(Boolean)));

  // Filter logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      blog.author.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory = !filters.category || blog.category === filters.category;
    const matchesStatus = !filters.status || blog.status === filters.status;
    const matchesAuthor = !filters.author || blog.author === filters.author;

    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor;
  });

  // Pagination Math
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Actions
  const handleEdit = (blog) => {
    setBlogToEdit(blog);
    navigate('/admin/create');
  };

  const handleDeleteConfirm = () => {
    if (deleteBlogId) {
      deleteBlog(deleteBlogId);
      setDeleteBlogId(null);
    }
  };

  return (
    <div className="space-y-6 select-none animate-fade">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5A67F2]/10 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1D2A72]">Blog Directory</h2>
          <p className="text-xs text-slate-400 font-semibold">
            Search, filter, edit, duplicate, and manage all your healthcare articles.
          </p>
        </div>
        
        <button
          onClick={() => {
            setBlogToEdit(null);
            navigate('/admin/create');
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1D2A72] text-white font-bold text-xs rounded-[14px] hover:opacity-90 active:scale-98 transition shadow-lg shadow-[#1D2A72]/15 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Create Blog
        </button>
      </div>

      {/* Search and Filters */}
      <SearchBar
        filters={filters}
        onChange={setFilters}
        categories={categories}
        authors={authorsList}
      />

      {/* Results View */}
      {paginatedBlogs.length > 0 ? (
        <div className="space-y-4">
          <DataTable
            data={paginatedBlogs}
            onPreview={setPreviewBlog}
            onEdit={handleEdit}
            onDuplicate={duplicateBlog}
            onDelete={setDeleteBlogId}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <EmptyState
          title="No Articles Found"
          description="We couldn't find any articles matching your search criteria. Try modifying your filters or title search."
          actionButton={
            <button
              onClick={() => setFilters({ search: '', category: '', status: '', author: '' })}
              className="px-4 py-2.5 bg-[#5A67F2]/10 border border-[#5A67F2]/20 hover:bg-[#5A67F2]/20 rounded-[12px] text-xs font-bold text-[#5A67F2] transition cursor-pointer"
            >
              Reset All Filters
            </button>
          }
        />
      )}

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewBlog}
        onClose={() => setPreviewBlog(null)}
        title="Article Preview"
      >
        {previewBlog && (
          <div className="space-y-6">
            <img
              src={previewBlog.featuredImage || "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80"}
              alt=""
              className="w-full aspect-[16/7] object-cover rounded-[18px] border border-slate-100 shadow-sm"
            />
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={previewBlog.category} />
                <StatusBadge status={previewBlog.status} />
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#5A67F2]" />
                  {previewBlog.readingTime || "5 min read"}
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#5A67F2]" />
                  Published {previewBlog.publishedDate || previewBlog.lastEdited}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-[#1D2A72] leading-tight">
                {previewBlog.title}
              </h2>

              <p className="text-xs text-slate-500 font-semibold italic border-l-2 border-[#5A67F2] pl-3 py-1 bg-slate-50/50 rounded-r-md">
                {previewBlog.shortDescription}
              </p>

              <div
                className="prose prose-slate max-w-none text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-4"
                dangerouslySetInnerHTML={{ __html: previewBlog.content }}
              />

              <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-6">
                <span className="text-xs font-bold text-[#1D2A72]">Author: {previewBlog.author}</span>
                <span className="text-[11px] font-extrabold text-[#35C76F] bg-[#35C76F]/10 px-2.5 py-1 rounded-[8px] border border-[#35C76F]/20 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {previewBlog.views.toLocaleString()} Total views
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteBlogId}
        onClose={() => setDeleteBlogId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Article"
        message="Are you sure you want to permanently delete this blog post? This action cannot be undone."
      />
    </div>
  );
}
