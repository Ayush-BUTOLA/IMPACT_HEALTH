import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function DraftCard({ draft, onEdit, onDelete }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-[#5A67F2]/10 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(29,42,114,0.02)] flex flex-col group h-full select-none"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-50 flex-shrink-0">
        <img
          src={draft.featuredImage || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"}
          alt={draft.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3.5 left-3.5">
          <CategoryBadge category={draft.category} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#5A67F2]" />
            <span>Saved {draft.lastEdited}</span>
          </div>
          
          <h4 className="text-sm font-extrabold text-[#1D2A72] leading-snug line-clamp-2 group-hover:text-[#5A67F2] transition duration-200">
            {draft.title}
          </h4>
          
          <p className="text-xs text-slate-400 font-medium line-clamp-2">
            {draft.shortDescription || "No description provided yet."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-50 flex-shrink-0">
          <button
            onClick={() => onEdit(draft)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-[#1D2A72] text-white hover:opacity-90 rounded-[12px] transition cursor-pointer shadow-sm shadow-[#1D2A72]/10"
          >
            <Edit className="w-3.5 h-3.5" />
            Continue Editing
          </button>
          
          <button
            onClick={() => onDelete(draft.id)}
            title="Delete Draft"
            className="p-2.5 rounded-[12px] border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
