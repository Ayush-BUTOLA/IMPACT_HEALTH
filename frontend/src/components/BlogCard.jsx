import React from 'react';
import { motion } from 'motion/react';
import { Eye, Clock, Calendar, Edit3, Trash2 } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import StatusBadge from './StatusBadge';

export default function BlogCard({ blog, onEdit, onDelete, onPreview }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-[#5A67F2]/10 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(29,42,114,0.02)] flex flex-col group h-full select-none"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-50 flex-shrink-0">
        <img
          src={blog.featuredImage || "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80"}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
          <CategoryBadge category={blog.category} />
          <StatusBadge status={blog.status} />
        </div>
        
        {blog.featured && (
          <span className="absolute top-3.5 right-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
            ★ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#5A67F2]" />
              {blog.publishedDate || blog.lastEdited}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#5A67F2]" />
              {blog.readingTime || "5 min read"}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-extrabold text-[#1D2A72] leading-snug line-clamp-2 group-hover:text-[#5A67F2] transition duration-200 cursor-pointer" onClick={() => onPreview(blog)}>
            {blog.title}
          </h4>

          {/* Short description */}
          <p className="text-xs text-slate-400 font-medium line-clamp-2">
            {blog.shortDescription || "Click to preview this blog."}
          </p>
        </div>

        {/* Footer info & quick actions */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-50 flex-shrink-0">
          <span className="text-[10px] font-bold text-slate-500 bg-[#F8FAFF] px-2 py-1 rounded-[6px] flex items-center gap-1 border border-slate-100">
            <Eye className="w-3 h-3 text-[#5A67F2]" />
            {blog.views.toLocaleString()} Views
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(blog)}
              title="Edit Blog"
              className="p-2 rounded-[10px] text-slate-400 hover:text-[#5A67F2] hover:bg-slate-100 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              title="Delete Blog"
              className="p-2 rounded-[10px] text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
