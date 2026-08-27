import React, { useState } from 'react';
import { Eye, Edit2, Copy, Trash2, ArrowUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
import CategoryBadge from './CategoryBadge';

export default function DataTable({
  data = [],
  onPreview,
  onEdit,
  onDuplicate,
  onDelete
}) {
  const [sortField, setSortField] = useState('lastEdited');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'views') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Default string comparison
    aVal = String(aVal || '').toLowerCase();
    bVal = String(bVal || '').toLowerCase();

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortHeader = ({ field, label }) => (
    <th
      onClick={() => handleSort(field)}
      className="px-6 py-4 text-left text-xs font-bold text-[#1D2A72] uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition"
    >
      <div className="flex items-center gap-1.5 select-none">
        {label}
        <ArrowUpDown className="w-3 h-3 text-slate-400" />
      </div>
    </th>
  );

  return (
    <div className="w-full bg-white border border-[#5A67F2]/10 rounded-[24px] shadow-[0_8px_30px_rgba(29,42,114,0.02)] overflow-hidden select-none">
      {/* Desktop Responsive Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-[#F8FAFF]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#1D2A72] uppercase tracking-wider w-16">
                Thumb
              </th>
              <SortHeader field="title" label="Title" />
              <SortHeader field="category" label="Category" />
              <SortHeader field="author" label="Author" />
              <SortHeader field="status" label="Status" />
              <SortHeader field="publishedDate" label="Date" />
              <SortHeader field="views" label="Views" />
              <th className="px-6 py-4 text-right text-xs font-bold text-[#1D2A72] uppercase tracking-wider w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {sortedData.map((blog) => (
              <tr key={blog.id} className="hover:bg-[#F8FAFF]/40 transition duration-150">
                {/* Thumbnail */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={blog.featuredImage || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=80&h=60&q=80"}
                    alt={blog.title}
                    className="w-12 h-9 object-cover rounded-[8px] border border-slate-100 shadow-sm"
                  />
                </td>
                
                {/* Title */}
                <td className="px-6 py-4">
                  <div className="flex flex-col max-w-xs">
                    <span className="text-sm font-bold text-[#1D2A72] line-clamp-1 hover:underline cursor-pointer" onClick={() => onEdit(blog)}>
                      {blog.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">
                      /{blog.slug}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <CategoryBadge category={blog.category} />
                </td>

                {/* Author */}
                <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-600">
                  {blog.author}
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={blog.status} />
                </td>

                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 font-bold">
                  {blog.publishedDate || blog.lastEdited || '-'}
                </td>

                {/* Views */}
                <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-[#1D2A72]">
                  {blog.views.toLocaleString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onPreview(blog)}
                      title="Preview Article"
                      className="p-1.5 rounded-[10px] text-slate-400 hover:text-[#1D2A72] hover:bg-slate-100 transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(blog)}
                      title="Edit Article"
                      className="p-1.5 rounded-[10px] text-slate-400 hover:text-[#5A67F2] hover:bg-slate-100 transition cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDuplicate(blog.id)}
                      title="Duplicate as Draft"
                      className="p-1.5 rounded-[10px] text-slate-400 hover:text-[#35C76F] hover:bg-slate-100 transition cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(blog.id)}
                      title="Delete Article"
                      className="p-1.5 rounded-[10px] text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Grid Fallback */}
      <div className="block lg:hidden divide-y divide-slate-100">
        {sortedData.map((blog) => (
          <div key={blog.id} className="p-5 space-y-4">
            <div className="flex items-start gap-4">
              <img
                src={blog.featuredImage || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=120&h=80&q=80"}
                alt={blog.title}
                className="w-20 h-14 object-cover rounded-[12px] border border-slate-100 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <CategoryBadge category={blog.category} />
                  <StatusBadge status={blog.status} />
                </div>
                <h4 className="text-sm font-bold text-[#1D2A72] leading-tight line-clamp-2" onClick={() => onEdit(blog)}>
                  {blog.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                  By {blog.author} • {blog.publishedDate || blog.lastEdited}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
              <span className="text-xs font-bold text-[#1D2A72] bg-[#F8FAFF] px-2.5 py-1 rounded-[8px] border border-[#5A67F2]/5">
                {blog.views.toLocaleString()} views
              </span>
              
              <div className="flex gap-1">
                <button
                  onClick={() => onPreview(blog)}
                  className="p-2 rounded-[10px] text-slate-400 hover:text-[#1D2A72] hover:bg-slate-100 transition cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(blog)}
                  className="p-2 rounded-[10px] text-slate-400 hover:text-[#5A67F2] hover:bg-slate-100 transition cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDuplicate(blog.id)}
                  className="p-2 rounded-[10px] text-slate-400 hover:text-[#35C76F] hover:bg-slate-100 transition cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(blog.id)}
                  className="p-2 rounded-[10px] text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
