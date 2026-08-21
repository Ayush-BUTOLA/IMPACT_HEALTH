import React from 'react';
import { SearchX, Inbox } from 'lucide-react';

export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your search terms or filters to find what you are looking for.",
  iconType = "search", // search | box
  actionButton
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-16 border border-[#5A67F2]/10 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(29,42,114,0.02)] text-center select-none">
      <div className="w-16 h-16 rounded-[20px] bg-[#F8FAFF] border border-[#5A67F2]/10 flex items-center justify-center text-[#5A67F2]/75 mb-4 shadow-inner">
        {iconType === 'search' ? (
          <SearchX className="w-8 h-8" />
        ) : (
          <Inbox className="w-8 h-8" />
        )}
      </div>
      <h3 className="text-base font-bold text-[#1D2A72] mb-1.5">{title}</h3>
      <p className="text-xs text-slate-400 font-semibold max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionButton && (
        <div>{actionButton}</div>
      )}
    </div>
  );
}
