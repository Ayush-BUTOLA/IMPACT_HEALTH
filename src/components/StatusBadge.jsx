import React from 'react';

export default function StatusBadge({ status }) {
  let bgClass = 'bg-slate-100 text-slate-600 border-slate-200';
  let label = 'Unknown';

  switch (status?.toLowerCase()) {
    case 'published':
      bgClass = 'bg-[#35C76F]/10 text-[#258d4e] border-[#35C76F]/20';
      label = 'Published';
      break;
    case 'draft':
      bgClass = 'bg-[#5A67F2]/10 text-[#5A67F2] border-[#5A67F2]/20';
      label = 'Draft';
      break;
    case 'archived':
      bgClass = 'bg-gray-100 text-gray-500 border-gray-200';
      label = 'Archived';
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${bgClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 flex-shrink-0 animate-pulse" />
      {label}
    </span>
  );
}
