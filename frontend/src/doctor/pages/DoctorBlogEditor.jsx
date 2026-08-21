import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Upload,
  Save,
  Send,
  Plus,
  Trash2,
  AlertCircle,
  Stethoscope,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import apiService from '../../api/apiService';

export default function DoctorBlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [adminNote, setAdminNote] = useState('');

  // Validation state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchBlogForEdit();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const data = await apiService.getPublicCategories();
      setCategories(Array.isArray(data) ? data : []);
      if (data.length > 0 && !categoryId) {
        setCategoryId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogForEdit = async () => {
    setLoading(true);
    try {
      const blog = await apiService.getBlogById(id);
      setTitle(blog.title || '');
      setShortDescription(blog.shortDescription || '');
      setCategoryId(blog.category?.id || '');
      setContent(blog.content || '');
      setFeaturedImage(blog.featuredImage || '');
      setAdminNote(blog.rejectionReason || '');
      if (blog.images) {
        setAdditionalImages(blog.images.map(img => img.imagePath));
      }
    } catch (err) {
      alert('Failed to load blog for editing');
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturedUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingFeatured(true);
    try {
      const res = await apiService.uploadImage(file);
      setFeaturedImage(res.url);
    } catch (err) {
      alert('Failed to upload image: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploadingFeatured(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      const urls = [];
      for (const file of files) {
        const res = await apiService.uploadImage(file);
        urls.push(res.url);
      }
      setAdditionalImages(prev => [...prev, ...urls]);
    } catch (err) {
      alert('Failed to upload gallery image');
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (index) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!shortDescription.trim()) errs.shortDescription = 'Description is required';
    if (!content.trim()) errs.content = 'Content is required';
    if (!categoryId) errs.categoryId = 'Category is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (submitForApproval) => {
    if (!validateForm()) return;

    setSaving(true);
    const payload = {
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      content: content.trim(),
      categoryId: Number(categoryId),
      featuredImage: featuredImage || null,
      additionalImages: additionalImages,
      submitForApproval: submitForApproval
    };

    try {
      if (isEditing) {
        await apiService.updateBlog(id, payload);
      } else {
        await apiService.createBlog(payload);
      }

      alert(submitForApproval ? 'Blog submitted for Admin approval!' : 'Blog saved as draft!');
      navigate('/doctor/blogs');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.validationErrors?.title || err.message;
      alert('Error saving blog: ' + msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 font-semibold text-sm">Loading editor...</div>;
  }

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link to="/doctor/blogs" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1D2A72]">
          <ArrowLeft className="w-4 h-4" /> Back to My Blogs
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Physician Editor</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D2A72]">
            {isEditing ? 'Edit Medical Article' : 'Write New Medical Article'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">Compose research, healthcare advice, and patient guidelines.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-extrabold text-xs hover:bg-amber-600 transition shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Submit for Approval
          </button>
        </div>
      </div>

      {/* Admin Requested Changes Banner */}
      {adminNote && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-blue-900 space-y-2">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" /> Admin Feedback / Requested Adjustments
          </div>
          <p className="text-xs bg-white p-3.5 rounded-xl border border-blue-100 text-slate-700 font-mono leading-relaxed">
            {adminNote}
          </p>
        </div>
      )}

      {/* Main Form */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Blog Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Modern Preventive Strategies in Pediatric Cardiovascular Care"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5A67F2] ${
              errors.title ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
            }`}
          />
          {errors.title && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.title}</p>}
        </div>

        {/* Category & Author row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5A67F2]"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.categoryId}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Author
            </label>
            <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#1D2A72]" /> Dr. Elena Rostova
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Short Description / Abstract <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Brief overview summarizing key medical insights for patients and readers..."
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#5A67F2] ${
              errors.shortDescription ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
            }`}
          />
          {errors.shortDescription && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.shortDescription}</p>}
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Featured Header Image
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {featuredImage ? (
              <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden border border-slate-200">
                <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="absolute top-2 right-2 p-1 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-full sm:w-48 h-32 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-bold">No Featured Image</span>
              </div>
            )}

            <div className="flex-1 space-y-2">
              <label className="px-4 py-2.5 rounded-xl bg-[#1D2A72] text-white font-bold text-xs hover:bg-[#1D2A72]/90 transition inline-flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" /> {uploadingFeatured ? 'Uploading...' : 'Upload Header Image'}
                <input type="file" accept="image/*" onChange={handleFeaturedUpload} className="hidden" disabled={uploadingFeatured} />
              </label>
              <input
                type="text"
                placeholder="Or paste image URL directly..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Full Blog Article Content <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={12}
            placeholder="Type your medical article content here (HTML tags like <h3>, <p>, <ul>, <li> are fully supported)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#5A67F2] ${
              errors.content ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
            }`}
          />
          {errors.content && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.content}</p>}
        </div>

        {/* Additional Images Gallery */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Additional Article Gallery Images
            </label>
            <label className="px-3 py-1.5 rounded-xl bg-slate-100 text-[#1D2A72] font-bold text-xs hover:bg-slate-200 transition inline-flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Images
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" disabled={uploadingGallery} />
            </label>
          </div>

          {additionalImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {additionalImages.map((imgUrl, idx) => (
                <div key={idx} className="relative h-28 rounded-xl overflow-hidden border border-slate-200">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-md"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
