import React from 'react';

export default function CategoryBadge({ category }) {
  let colorStyle = {
    bg: 'bg-[#1D2A72]/5',
    text: 'text-[#1D2A72]',
    border: 'border-[#1D2A72]/10'
  };

  switch (category) {
    case 'Disease & Diagnosis':
      colorStyle = { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' };
      break;
    case 'Management':
      colorStyle = { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' };
      break;
    case 'Nutrition':
      colorStyle = { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' };
      break;
    case 'Mental Health':
      colorStyle = { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100' };
      break;
    case 'Research':
      colorStyle = { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' };
      break;
    case 'Wellness':
      colorStyle = { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100' };
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md border ${colorStyle.bg} ${colorStyle.text} ${colorStyle.border}`}>
      {category}
    </span>
  );
}
