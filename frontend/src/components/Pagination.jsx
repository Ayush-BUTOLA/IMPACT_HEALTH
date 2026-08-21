import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between bg-white border border-[#5A67F2]/10 rounded-[20px] px-6 py-4 shadow-[0_8px_30px_rgba(29,42,114,0.02)] select-none">
      {/* Mobile view */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-xs font-bold rounded-[10px] border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-50 transition cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center px-4 py-2 text-xs font-bold rounded-[10px] border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-50 transition cursor-pointer"
        >
          Next
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400">
            Showing page <span className="text-[#1D2A72] font-extrabold">{currentPage}</span> of <span className="text-[#1D2A72] font-extrabold">{totalPages}</span> pages
          </p>
        </div>
        <div>
          <nav className="inline-flex gap-1.5" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-[10px] border border-slate-200 text-slate-500 hover:bg-[#F8FAFF] hover:text-[#1D2A72] disabled:opacity-50 disabled:hover:bg-transparent transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-[10px] border transition cursor-pointer ${
                  p === currentPage
                    ? 'bg-[#1D2A72] border-[#1D2A72] text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-[10px] border border-slate-200 text-slate-500 hover:bg-[#F8FAFF] hover:text-[#1D2A72] disabled:opacity-50 disabled:hover:bg-transparent transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
