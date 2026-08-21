import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Stethoscope, Share2, CheckCircle2 } from 'lucide-react';
import apiService from '../api/apiService';

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
    return <div className="py-32 text-center text-slate-400 font-semibold text-sm">Loading medical article...</div>;
  }

  if (!blog) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#1D2A72]">Article Not Found</h2>
        <p className="text-sm text-slate-500">The requested article is either unpublished or does not exist.</p>
        <Link to="/blogs" className="text-[#5A67F2] font-bold text-sm underline inline-block">Return to Blog Articles</Link>
      </div>
    );
  }

  return (
    <article className="py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1D2A72] transition">
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </Link>

        {/* Article Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {blog.featuredImage && (
            <div className="relative h-96 bg-slate-900">
              <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-[#5A67F2] text-white font-bold text-xs uppercase tracking-wider">
                  {blog.category?.name}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
                  {blog.title}
                </h1>
              </div>
            </div>
          )}

          <div className="p-8 md:p-12 space-y-8">
            {!blog.featuredImage && (
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <span className="px-3.5 py-1 rounded-full bg-slate-100 text-[#1D2A72] font-bold text-xs uppercase tracking-wider">
                  {blog.category?.name}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D2A72] tracking-tight">
                  {blog.title}
                </h1>
              </div>
            )}

            {/* Doctor Info Banner */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1D2A72] text-white flex items-center justify-center font-bold overflow-hidden shadow-sm">
                  {blog.author?.profileImage ? (
                    <img src={blog.author.profileImage} alt={blog.author.name} className="w-full h-full object-cover" />
                  ) : (
                    <Stethoscope className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-[#1D2A72] text-base">{blog.author?.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{blog.author?.specialization || 'Medical Specialist'}</p>
                </div>
              </div>

              <div className="text-right text-xs text-slate-400 font-medium space-y-1">
                <div className="flex items-center gap-1.5 justify-end text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Published: {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Recently'}</span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-[#1D2A72] text-base font-medium italic leading-relaxed">
              "{blog.shortDescription}"
            </div>

            {/* Main Content */}
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-4">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Additional Images Gallery */}
            {blog.images && blog.images.length > 0 && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Article Media Gallery</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {blog.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.imagePath}
                      alt=""
                      className="w-full h-40 object-cover rounded-xl border border-slate-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
