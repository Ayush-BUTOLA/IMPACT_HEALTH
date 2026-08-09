import React, { useState } from 'react';
import { useAdminState } from '../../context/AdminStateContext';
import { FolderPlus, Edit, Trash2, Folder, Layers } from 'lucide-react';
import Modal from '../../components/Modal';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import CategoryBadge from '../../components/CategoryBadge';

export default function Categories() {
  const { categories, blogs, addCategory, deleteCategory, triggerToast } = useAdminState();

  // State Variables
  const [newCatName, setNewCatName] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteCatName, setDeleteCatName] = useState(null);

  // Submit Handler
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      triggerToast("Category name cannot be empty.", "error");
      return;
    }
    addCategory(newCatName);
    setNewCatName('');
    setIsAddOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteCatName) {
      deleteCategory(deleteCatName);
      setDeleteCatName(null);
    }
  };

  // Helper: Count blogs in a category
  const getBlogCount = (catName) => {
    return blogs.filter(b => b.category === catName).length;
  };

  return (
    <div className="space-y-6 select-none animate-fade">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5A67F2]/10 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1D2A72]">Category Management</h2>
          <p className="text-xs text-slate-400 font-semibold">
            Create, manage, and inspect the clinical taxonomy for your health portal.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1D2A72] text-white font-bold text-xs rounded-[14px] hover:opacity-90 active:scale-98 transition shadow-lg shadow-[#1D2A72]/15 cursor-pointer"
        >
          <FolderPlus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = getBlogCount(cat);
          return (
            <div
              key={cat}
              className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-5 shadow-[0_8px_30px_rgba(29,42,114,0.02)] flex items-start gap-4 hover:shadow-md hover:border-[#5A67F2]/20 transition"
            >
              <div className="w-12 h-12 rounded-[16px] bg-[#5A67F2]/10 flex items-center justify-center text-[#5A67F2] flex-shrink-0">
                <Folder className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <CategoryBadge category={cat} />
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        // In mock logic, just trigger toast
                        triggerToast("Editing categories requires active database binding (UI Mock).", "info");
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-[#5A67F2] hover:bg-slate-50 transition cursor-pointer"
                      title="Edit Category"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteCatName(cat)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-slate-400 text-xs font-bold">
                  <Layers className="w-4 h-4 text-[#5A67F2]/65" />
                  <span>{count} {count === 1 ? 'Article' : 'Articles'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Category"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72]">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g. Immunology & Vaccines"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] font-semibold outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2.5 text-xs font-bold text-slate-500 border border-slate-200 rounded-[12px] hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-bold bg-[#1D2A72] text-white hover:opacity-90 rounded-[12px] transition cursor-pointer"
            >
              Create Category
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={!!deleteCatName}
        onClose={() => setDeleteCatName(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete the category "${deleteCatName}"? Blog posts filed under it will need to be re-assigned.`}
      />
    </div>
  );
}
