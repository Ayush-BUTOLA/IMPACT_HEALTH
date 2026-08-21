import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function TagInput({ tags = [], onChange, placeholder = "Add tag and press Enter" }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',' || (e.key === ' ' && inputValue.trim() !== '')) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const cleanTag = inputValue.trim().replace(/,/g, '');
    if (cleanTag && !tags.includes(cleanTag)) {
      const updatedTags = [...tags, cleanTag];
      onChange(updatedTags);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(updatedTags);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 p-2 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] focus-within:border-[#5A67F2] transition min-h-[46px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[8px] bg-white border border-[#5A67F2]/10 text-xs font-semibold text-[#1D2A72] shadow-sm select-none"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-[#1D2A72] outline-none placeholder:text-slate-400 px-1 py-0.5"
        />
      </div>
      <p className="text-[10px] text-slate-400 font-medium pl-1">
        Press Enter, comma, or space to add a tag.
      </p>
    </div>
  );
}
