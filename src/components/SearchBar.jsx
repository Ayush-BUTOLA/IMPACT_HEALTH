import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

export default function SearchBar({
  filters = {},
  onChange,
  categories = [],
  authors = [],
  placeholder = "Search by title or author..."
}) {
  const { search = '', category = '', status = '', author = '' } = filters;

  const handleFieldChange = (field, val) => {
    onChange({
      ...filters,
      [field]: val
    });
  };

  const resetFilters = () => {
    onChange({
      search: '',
      category: '',
      status: '',
      author: ''
    });
  };

  const statuses = [
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
    { label: "Archived", value: "archived" }
  ];

  return (
    <div className="bg-white border border-[#5A67F2]/10 rounded-[20px] p-4 shadow-[0_8px_30px_rgba(29,42,114,0.02)] flex flex-col md:flex-row md:items-center gap-3 select-none">
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => handleFieldChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
      </div>

      {/* Filter Dropdowns Container */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => handleFieldChange('category', e.target.value)}
          className="px-3.5 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-xs font-semibold text-[#1D2A72] focus:outline-none focus:border-[#5A67F2] cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => handleFieldChange('status', e.target.value)}
          className="px-3.5 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-xs font-semibold text-[#1D2A72] focus:outline-none focus:border-[#5A67F2] cursor-pointer"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        {/* Author Filter */}
        <select
          value={author}
          onChange={(e) => handleFieldChange('author', e.target.value)}
          className="px-3.5 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-xs font-semibold text-[#1D2A72] focus:outline-none focus:border-[#5A67F2] cursor-pointer"
        >
          <option value="">All Authors</option>
          {authors.map((auth) => (
            <option key={auth} value={auth}>{auth}</option>
          ))}
        </select>

        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          title="Reset Filters"
          className="p-2.5 rounded-[14px] bg-[#F8FAFF] border border-[#5A67F2]/10 text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
