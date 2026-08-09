import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, RefreshCw } from 'lucide-react';

export default function ImageUploader({ value, onChange, label = "Featured Image" }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Validate image format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert("Unsupported format. Please upload JPG, PNG, or WEBP.");
      return;
    }

    // Generate local blob URL for mock display
    const objectUrl = URL.createObjectURL(file);
    onChange(objectUrl);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72]">
        {label}
      </label>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/webp"
        className="hidden"
      />

      {value ? (
        // Preview State
        <div className="relative group border border-[#5A67F2]/10 rounded-[20px] overflow-hidden aspect-[16/9] bg-slate-50 flex items-center justify-center">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          {/* Overlay actions */}
          <div className="absolute inset-0 bg-[#030050]/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={triggerSelect}
              className="px-4 py-2 bg-white text-[#1D2A72] text-xs font-bold rounded-[10px] hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Replace
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-[10px] hover:bg-red-700 transition cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        // Upload Placeholder Zone
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerSelect}
          className={`border-2 border-dashed rounded-[20px] p-6 text-center cursor-pointer transition flex flex-col items-center justify-center aspect-[16/9] bg-white ${
            isDragOver 
              ? 'border-[#5A67F2] bg-[#5A67F2]/5' 
              : 'border-slate-200 hover:border-[#5A67F2]/50 hover:bg-[#F8FAFF]'
          }`}
        >
          <div className="w-12 h-12 rounded-[14px] bg-[#5A67F2]/10 flex items-center justify-center text-[#5A67F2] mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-[#1D2A72] mb-1">
            Drag & drop your image here, or <span className="text-[#5A67F2] hover:underline">browse</span>
          </p>
          <p className="text-xs text-slate-400 font-medium">
            Supports JPG, PNG, WEBP formats (Max 5MB)
          </p>
          <p className="text-[10px] text-slate-400 mt-2 bg-slate-50 px-2.5 py-1 rounded-[6px] border border-slate-100">
            Recommended: 1200 × 630 pixels (16:9 ratio)
          </p>
        </div>
      )}
    </div>
  );
}
