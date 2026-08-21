import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FolderOpen, Tag, CheckCircle2 } from 'lucide-react';
import apiService from '../../api/apiService';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await apiService.getPublicCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setCreating(true);
    try {
      await apiService.createCategory({
        name: newCategoryName.trim(),
        description: newCategoryDesc.trim() || undefined
      });
      setNewCategoryName('');
      setNewCategoryDesc('');
      fetchCategories();
    } catch (err) {
      alert('Failed to create category: ' + (err.response?.data?.message || err.message));
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    try {
      await apiService.deleteCategory(id);
      fetchCategories();
    } catch (err) {
      alert('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#1D2A72]">Blog Categories Management</h1>
        <p className="text-sm text-slate-500 mt-0.5">Organize articles into medical & health taxonomy categories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create Category Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 h-fit">
          <h3 className="text-base font-bold text-[#1D2A72] flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#5A67F2]" /> Add New Category
          </h3>

          <form onSubmit={handleCreateCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Category Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Mental Health, Nutrition"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A67F2]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Brief description of articles under this category..."
                value={newCategoryDesc}
                onChange={(e) => setNewCategoryDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A67F2]"
              />
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full py-2.5 rounded-xl bg-[#1D2A72] text-white font-bold text-xs hover:bg-[#1D2A72]/90 transition shadow-md shadow-[#1D2A72]/20"
            >
              {creating ? 'Saving...' : 'Add Category'}
            </button>
          </form>
        </div>

        {/* Category List */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#1D2A72] flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-[#5A67F2]" /> Active System Categories ({categories.length})
          </h3>

          {loading ? (
            <div className="py-12 text-center text-slate-400 font-semibold text-sm">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#5A67F2]" />
                      <span className="font-bold text-[#1D2A72] text-sm">{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 block">slug: {cat.slug}</span>
                    {cat.description && <p className="text-xs text-slate-500 line-clamp-2 mt-1">{cat.description}</p>}
                  </div>

                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
