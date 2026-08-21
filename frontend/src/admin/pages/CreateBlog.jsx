import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminState } from '../../context/AdminStateContext';
import {
  FileText,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles
} from 'lucide-react';
import TagInput from '../../components/TagInput';
import ImageUploader from '../../components/ImageUploader';
import BlogEditor from '../../components/BlogEditor';
import SeoSection from '../../components/SeoSection';
import PublishPanel from '../../components/PublishPanel';
import CategoryBadge from '../../components/CategoryBadge';
import StatusBadge from '../../components/StatusBadge';

export default function CreateBlog() {
  const {
    blogToEdit,
    setBlogToEdit,
    addBlog,
    updateBlog,
    categories,
    settings,
    triggerToast
  } = useAdminState();

  const navigate = useNavigate();

  // Mode detection
  const isEditMode = !!blogToEdit;

  // Form State variables
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Disease & Diagnosis');
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState(settings.defaultAuthor || 'Dr. Elena Rostova');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState('draft');
  const [featuredImage, setFeaturedImage] = useState('');
  
  // Editor State
  const [content, setContent] = useState('');

  // SEO State
  const [seo, setSeo] = useState({
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    ogImage: '',
    seoScore: 0
  });

  // Preview viewport mode: 'desktop' | 'tablet' | 'mobile'
  const [viewportMode, setViewportMode] = useState('desktop');

  // Pre-populate fields if in Edit Mode
  useEffect(() => {
    if (isEditMode && blogToEdit) {
      setTitle(blogToEdit.title || '');
      setSlug(blogToEdit.slug || '');
      setShortDescription(blogToEdit.shortDescription || '');
      setCategory(blogToEdit.category || '');
      setTags(blogToEdit.tags || []);
      setAuthor(blogToEdit.author || '');
      setReadingTime(blogToEdit.readingTime || '5 min read');
      setFeatured(blogToEdit.featured || false);
      setStatus(blogToEdit.status || 'draft');
      setFeaturedImage(blogToEdit.featuredImage || '');
      setContent(blogToEdit.content || '');
      setSeo({
        metaTitle: blogToEdit.seo?.metaTitle || '',
        metaDescription: blogToEdit.seo?.metaDescription || '',
        focusKeyword: blogToEdit.seo?.focusKeyword || '',
        canonicalUrl: blogToEdit.seo?.canonicalUrl || '',
        ogImage: blogToEdit.seo?.ogImage || '',
        seoScore: blogToEdit.seo?.seoScore || 0
      });
    } else {
      // Default initial states for new posts
      setAuthor(settings.defaultAuthor || 'Dr. Elena Rostova');
      setCategory(settings.defaultCategory || categories[0] || 'Disease & Diagnosis');
      setFeaturedImage(settings.blogBanner || '');
    }
  }, [isEditMode, blogToEdit, settings, categories]);

  // Handle slug auto-generation preview
  useEffect(() => {
    if (!isEditMode && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  }, [title, isEditMode]);

  // Clean edit state on unmount
  useEffect(() => {
    return () => {
      setBlogToEdit(null);
    };
  }, [setBlogToEdit]);

  // Save / Publish Handler
  const handleSave = (targetStatus) => {
    if (!title.trim()) {
      triggerToast("Blog Title is required.", "error");
      return;
    }

    const payload = {
      title,
      slug,
      shortDescription,
      category,
      tags,
      author,
      readingTime,
      featured,
      status: targetStatus || status,
      featuredImage,
      content,
      seo
    };

    if (isEditMode && blogToEdit) {
      updateBlog({
        ...blogToEdit,
        ...payload
      });
      setBlogToEdit(null);
    } else {
      addBlog(payload);
    }

    // Navigate to respective lists
    if (targetStatus === 'draft') {
      navigate('/admin/drafts');
    } else {
      navigate('/admin/blogs');
    }
  };

  // Connect Navbar shortcuts
  useEffect(() => {
    const handleNavbarSaveEvent = (e) => {
      const { status: targetStatus } = e.detail;
      handleSave(targetStatus);
    };
    window.addEventListener('admin-blog-save', handleNavbarSaveEvent);
    return () => window.removeEventListener('admin-blog-save', handleNavbarSaveEvent);
  }, [title, slug, shortDescription, category, tags, author, readingTime, featured, status, featuredImage, content, seo]);

  return (
    <div className="space-y-8 select-none">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5A67F2]/10 pb-5">
        <div className="space-y-1">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#1D2A72] transition mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <h2 className="text-xl md:text-2xl font-black text-[#1D2A72]">
            {isEditMode ? 'Modify Clinical Article' : 'Draft New Health Post'}
          </h2>
          <p className="text-xs text-slate-400 font-semibold">
            {isEditMode ? `Editing ID: ${blogToEdit.id}` : 'Create search-optimized medical content for patients.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        {/* Left 3 columns: Form sections */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* SECTION 1: Basic Information */}
          <section className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] space-y-4">
            <h3 className="font-bold text-base text-[#1D2A72] border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#5A67F2]" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Blog Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                  Blog Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Continuous Glucose Monitoring in Diabetes Care"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold"
                />
              </div>

              {/* Slug Preview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                  Slug (Auto-generated)
                </label>
                <div className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-xs text-slate-500 font-bold select-all overflow-x-auto whitespace-nowrap">
                  https://impacthealth.com/blogs/{slug || "..."}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] font-semibold focus:outline-none focus:border-[#5A67F2] cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Short Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summarize the article briefly for lists and previews..."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold resize-none"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold"
                />
              </div>

              {/* Reading Time */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                  Reading Time Override (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 min read"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400 font-semibold"
                />
              </div>

              {/* Tags Input */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                  Keywords / Tags
                </label>
                <TagInput tags={tags} onChange={setTags} />
              </div>
            </div>
          </section>

          {/* SECTION 2: Featured Image */}
          <section className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] space-y-4">
            <h3 className="font-bold text-base text-[#1D2A72] border-b border-slate-100 pb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#5A67F2]" />
              Visual Asset
            </h3>
            <ImageUploader value={featuredImage} onChange={setFeaturedImage} />
          </section>

          {/* SECTION 3: Rich Text Editor (Tiptap) */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-[#1D2A72] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#5A67F2]" />
                Rich Text Editor
              </h3>
              <span className="text-[10px] font-bold text-[#5A67F2] bg-[#5A67F2]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" />
                Auto-Save Enabled
              </span>
            </div>
            <BlogEditor value={content} onChange={setContent} />
          </section>

          {/* SECTION 4: SEO metadata */}
          <SeoSection value={seo} onChange={setSeo} />

          {/* SECTION 5: Viewport Live Preview Card */}
          <section className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-base text-[#1D2A72] flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#5A67F2]" />
                  Live Viewport Preview
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Toggle device frames to test responsiveness.</p>
              </div>

              {/* Viewport controls */}
              <div className="flex items-center gap-1 bg-[#F8FAFF] p-1 border border-[#5A67F2]/10 rounded-[12px]">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`p-2 rounded-[8px] transition cursor-pointer ${viewportMode === 'desktop' ? 'bg-[#1D2A72] text-white' : 'text-slate-400 hover:text-[#1D2A72]'}`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`p-2 rounded-[8px] transition cursor-pointer ${viewportMode === 'tablet' ? 'bg-[#1D2A72] text-white' : 'text-slate-400 hover:text-[#1D2A72]'}`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`p-2 rounded-[8px] transition cursor-pointer ${viewportMode === 'mobile' ? 'bg-[#1D2A72] text-white' : 'text-slate-400 hover:text-[#1D2A72]'}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewport Frame */}
            <div className="w-full bg-slate-100 rounded-[20px] p-6 flex justify-center overflow-x-auto min-h-[400px]">
              <div
                className="transition-all duration-300 bg-[#F8FAFF] border border-slate-200 shadow-lg rounded-[16px] overflow-hidden"
                style={{
                  width: viewportMode === 'mobile' ? '375px' : viewportMode === 'tablet' ? '768px' : '100%',
                  minHeight: '500px'
                }}
              >
                {/* Simulated Article Header */}
                <div className="relative aspect-[16/7] bg-slate-200 overflow-hidden">
                  <img
                    src={featuredImage || "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <CategoryBadge category={category} />
                    <StatusBadge status={status} />
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5A67F2]">{readingTime} • By {author}</span>
                  <h1 className="text-xl md:text-2xl font-black text-[#1D2A72] leading-tight">
                    {title || "Untitled Healthcare Article"}
                  </h1>
                  <p className="text-xs text-slate-500 font-semibold italic border-l-2 border-[#5A67F2] pl-3 py-1">
                    {shortDescription || "No short summary specified."}
                  </p>
                  <div 
                    className="text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-4"
                    dangerouslySetInnerHTML={{ __html: content || "<p>Article text body goes here...</p>" }}
                  />
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                      {tags.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-[#5A67F2]/10 text-[9px] font-bold text-[#1D2A72] rounded-md shadow-sm">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right 1 column: Publishing desk panel */}
        <div className="xl:col-span-1">
          <PublishPanel
            content={content}
            status={status}
            featured={featured}
            onStatusChange={setStatus}
            onFeaturedChange={setFeatured}
            onSave={handleSave}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    </div>
  );
}
