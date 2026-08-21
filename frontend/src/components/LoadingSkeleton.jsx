import React from 'react';

export default function LoadingSkeleton({ type = "table", count = 3 }) {
  const shimmerClass = "animate-pulse bg-slate-200 rounded-[8px]";

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4 shadow-sm">
            <div className={`w-full aspect-video ${shimmerClass}`} />
            <div className="space-y-2">
              <div className={`h-4 w-1/3 ${shimmerClass}`} />
              <div className={`h-6 w-3/4 ${shimmerClass}`} />
              <div className={`h-4 w-full ${shimmerClass}`} />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className={`h-8 w-20 ${shimmerClass}`} />
              <div className={`h-4 w-12 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-sm space-y-4">
        {/* Table Header Shimmer */}
        <div className="grid grid-cols-6 gap-4 pb-4 border-b border-slate-100">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className={`h-4 ${shimmerClass} ${idx === 0 ? 'w-16' : 'w-24'}`} />
          ))}
        </div>
        
        {/* Table Rows Shimmer */}
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="grid grid-cols-6 gap-4 py-3 items-center border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-8 rounded-[8px] flex-shrink-0 ${shimmerClass}`} />
              <div className={`h-4 w-20 ${shimmerClass}`} />
            </div>
            <div className={`h-4 w-28 ${shimmerClass}`} />
            <div className={`h-4 w-20 ${shimmerClass}`} />
            <div className={`h-4 w-16 ${shimmerClass}`} />
            <div className={`h-4 w-16 ${shimmerClass}`} />
            <div className="flex gap-2 justify-end">
              <div className={`w-8 h-8 rounded-[8px] ${shimmerClass}`} />
              <div className={`w-8 h-8 rounded-[8px] ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={`h-12 w-full ${shimmerClass}`} />
      ))}
    </div>
  );
}
