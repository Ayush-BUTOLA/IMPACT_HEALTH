import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Stethoscope, Share2, CheckCircle2, ShieldCheck } from 'lucide-react';
import apiService from '../api/apiService';
import Button from '../components/Button';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicBlog();
  }, [slug]);

  const fetchPublicBlog = async () => {
    setLoading(true);
    try {
      const data = await apiService.getPublicBlogBySlug(slug);
      setBlog(data);
    } catch (err) {
      console.error('Error loading public blog:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-400 font-semibold text-xs font-mono">
        Loading medical publication...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto px-4">
        <h2 className="font-display font-bold text-xl text-[#0B132B]">Article Not Found</h2>
        <p className="text-xs text-slate-500">The requested publication is either unpublished or does not exist.</p>
        <Link to="/blogs">
          <Button variant="primary" size="sm">
            Return to Medical Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 bg-[#F8FAFC] min-h-screen font-sans text-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-left">
        
        {/* Back Link */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B132B] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Publications</span>
        </Link>

        {/* Main Article Container */}
        <div className="bezel-outer">
          <div className="bezel-inner overflow-hidden">
            
            {/* Featured Hero Header */}
            {blog.featuredImage && (
              <div className="relative h-80 sm:h-96 bg-slate-900 overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="px-3 py-1 rounded-full bg-[#0066FF] text-white font-bold text-[10px] uppercase tracking-wider font-mono">
                    {blog.category?.name}
                  </span>
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                    {blog.title}
                  </h1>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-10 lg:p-12 space-y-8">
              {!blog.featuredImage && (
                <div className="space-y-3 border-b border-slate-100 pb-6">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] font-bold text-[10px] uppercase tracking-wider font-mono">
                    {blog.category?.name}
                  </span>
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B132B] tracking-tight">
                    {blog.title}
                  </h1>
                </div>
              )}

              {/* Verified Physician Author Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B132B] text-white flex items-center justify-center font-bold overflow-hidden shrink-0">
                    {blog.author?.profileImage ? (
                      <img src={blog.author.profileImage} alt={blog.author.name} className="w-full h-full object-cover" />
                    ) : (
                      <Stethoscope className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#0B132B]">{blog.author?.name}</h4>
                    <p className="text-xs text-slate-500">{blog.author?.specialization || 'Medical Specialist'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#059669] font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Published: {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Recently'}</span>
                </div>
              </div>

              {/* Short Summary Lead */}
              {blog.shortDescription && (
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 text-slate-800 text-sm font-medium leading-relaxed italic">
                  &ldquo;{blog.shortDescription}&rdquo;
                </div>
              )}

              {/* Body HTML Content */}
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>

              {/* Media Gallery */}
              {blog.images && blog.images.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Clinical Media Gallery
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {blog.images.map((img) => (
                      <img
                        key={img.id}
                        src={img.imagePath}
                        alt=""
                        className="w-full h-36 object-cover rounded-xl border border-slate-200 shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
