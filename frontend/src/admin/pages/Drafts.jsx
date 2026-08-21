import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminState } from '../../context/AdminStateContext';
import DraftCard from '../../components/DraftCard';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import EmptyState from '../../components/EmptyState';
import { FileEdit, PlusCircle } from 'lucide-react';

export default function Drafts() {
  const { blogs, deleteBlog, setBlogToEdit } = useAdminState();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  // Filter drafts
  const drafts = blogs.filter(b => b.status === 'draft');

  const handleEdit = (blog) => {
    setBlogToEdit(blog);
    navigate('/admin/create');
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteBlog(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 select-none animate-fade">
      {/* Title Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5A67F2]/10 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1D2A72]">Active Drafts</h2>
          <p className="text-xs text-slate-400 font-semibold">
            Unpublished writings and pending content items.
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

      {/* Grid of Draft Cards */}
      {drafts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((draft) => (
            <DraftCard
              key={draft.id}
              draft={draft}
              onEdit={handleEdit}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Drafts Pending"
          description="Your drafting cabinet is empty. Write quick concepts from the dashboard or start a structured post."
          iconType="box"
          actionButton={
            <button
              onClick={() => {
                setBlogToEdit(null);
                navigate('/admin/create');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1D2A72] hover:opacity-90 text-white font-bold text-xs rounded-[12px] transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Write New Blog
            </button>
          }
        />
      )}

      {/* Delete Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Draft"
        message="Are you sure you want to discard this draft? This will permanently erase the draft content."
      />
    </div>
  );
}
