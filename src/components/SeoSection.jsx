import React, { useState, useEffect } from 'react';
import { Search, Compass, Share2, Sparkles } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function SeoSection({ value = {}, onChange }) {
  const {
    metaTitle = "",
    metaDescription = "",
    focusKeyword = "",
    canonicalUrl = "",
    ogImage = ""
  } = value;

  const [seoScore, setSeoScore] = useState(0);

  // SEO Score Calculation Algorithm
  useEffect(() => {
    let score = 0;
    
    // Rule 1: Meta Title length check (ideal: 40-60 characters)
    if (metaTitle.length >= 40 && metaTitle.length <= 65) {
      score += 20;
    } else if (metaTitle.length > 0) {
      score += 10;
    }

    // Rule 2: Meta Description length check (ideal: 120-160 characters)
    if (metaDescription.length >= 110 && metaDescription.length <= 160) {
      score += 20;
    } else if (metaDescription.length > 0) {
      score += 10;
    }

    // Rule 3: Focus Keyword present
    if (focusKeyword.trim().length > 2) {
      score += 20;
      
      // Rule 4: Focus Keyword in Meta Title
      if (metaTitle.toLowerCase().includes(focusKeyword.toLowerCase())) {
        score += 20;
      }
      
      // Rule 5: Focus Keyword in Meta Description
      if (metaDescription.toLowerCase().includes(focusKeyword.toLowerCase())) {
        score += 20;
      }
    }

    setSeoScore(score);
  }, [metaTitle, metaDescription, focusKeyword]);

  const handleFieldChange = (field, fieldValue) => {
    onChange({
      ...value,
      [field]: fieldValue,
      seoScore: seoScore
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-[#35C76F]', bg: 'bg-[#35C76F]/10', border: 'border-[#35C76F]/20', msg: 'Excellent SEO Optimization' };
    if (score >= 50) return { text: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', msg: 'Moderate Optimization' };
    return { text: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100', msg: 'Needs Improvement' };
  };

  const currentTheme = getScoreColor(seoScore);

  return (
    <div className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-base text-[#1D2A72] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#5A67F2]" />
            Search Engine Optimization (SEO)
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Customize metadata configurations for Google indexation.</p>
        </div>
        
        {/* Dynamic SEO Score Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-[12px] border ${currentTheme.bg} ${currentTheme.border}`}>
          <Sparkles className={`w-4 h-4 ${currentTheme.text}`} />
          <div className="text-left">
            <div className="text-[9px] text-slate-400 font-bold uppercase leading-none">SEO Grade</div>
            <div className={`text-sm font-black ${currentTheme.text} leading-none mt-0.5`}>{seoScore}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: SEO Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
              Focus Keyword
            </label>
            <input
              type="text"
              placeholder="e.g. cardiovascular disease"
              value={focusKeyword}
              onChange={(e) => handleFieldChange('focusKeyword', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72]">
                Meta Title
              </label>
              <span className={`text-[10px] font-bold ${metaTitle.length >= 40 && metaTitle.length <= 65 ? 'text-[#35C76F]' : 'text-slate-400'}`}>
                {metaTitle.length} / 60 chars
              </span>
            </div>
            <input
              type="text"
              placeholder="Primary Heading in Search Engine Listings"
              value={metaTitle}
              onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72]">
                Meta Description
              </label>
              <span className={`text-[10px] font-bold ${metaDescription.length >= 110 && metaDescription.length <= 160 ? 'text-[#35C76F]' : 'text-slate-400'}`}>
                {metaDescription.length} / 155 chars
              </span>
            </div>
            <textarea
              placeholder="Short search results description snippet..."
              rows={3}
              value={metaDescription}
              onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
              Canonical URL
            </label>
            <input
              type="url"
              placeholder="https://impacthealth.com/blogs/example-post"
              value={canonicalUrl}
              onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold"
            />
          </div>
        </div>

        {/* Right: SEO Preview Panel & Open Graph Image */}
        <div className="space-y-6">
          {/* Google Snippet Live Preview */}
          <div className="border border-slate-100 rounded-[20px] p-5 bg-[#F8FAFF] space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              Google SERP Preview
            </span>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-semibold block truncate">
                {canonicalUrl || "https://impacthealth.com/blogs/..."}
              </span>
              <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-tight block truncate">
                {metaTitle || "Please specify a Meta Title..."}
              </h4>
              <p className="text-xs text-[#4d5156] leading-normal break-words">
                {metaDescription || "Please specify a Meta Description to see snippet content..."}
              </p>
            </div>
          </div>

          {/* OG Image Upload */}
          <div>
            <ImageUploader
              value={ogImage}
              onChange={(val) => handleFieldChange('ogImage', val)}
              label="Open Graph Image (Social Share Image)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
