import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import apiService from '../api/apiService';
import { getFallbackBlogBySlug } from '../data/blogsData';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    apiService.getPublicBlogBySlug(slug)
      .then((data) => {
        if (isMounted) {
          if (data) {
            setBlog(data);
          } else {
            setBlog(getFallbackBlogBySlug(slug));
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setBlog(getFallbackBlogBySlug(slug));
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

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

  const doctorInitials = blog.author?.name
    ? blog.author.name
        .replace(/^(Dr\.|Dr|Prof\.|Prof|Mr\.|Mr|Mrs\.|Mrs|Ms\.|Ms)\s+/i, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'MD';

  return (
    <article className="py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1D2A72] transition">
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </Link>

        {/* Article Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {blog.featuredImage && (
            <div className="relative h-72 sm:h-96 bg-slate-900">
              <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-[#5A67F2] text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                  {blog.category?.name}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
                  {blog.title}
                </h1>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10 md:p-12 space-y-8">
            {!blog.featuredImage && (
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <span className="px-3.5 py-1 rounded-full bg-slate-100 text-[#1D2A72] font-bold text-xs uppercase tracking-wider">
                  {blog.category?.name}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1D2A72] tracking-tight">
                  {blog.title}
                </h1>
              </div>
            )}

            {/* Article Metadata Bar: Comments / Category / Author */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-slate-500 font-medium pb-4 border-b border-slate-100">
              {blog.commentsCount !== undefined && (
                <span className="text-slate-600 font-semibold flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  {blog.commentsCount} Comments
                </span>
              )}
              {blog.category?.name && (
                <>
                  <span className="text-slate-300">/</span>
                  <Link to="/blogs" className="text-[#5A67F2] font-semibold hover:underline">
                    {blog.category.name}
                  </Link>
                </>
              )}
              {blog.writtenBy && (
                <>
                  <span className="text-slate-300">/</span>
                  <span>
                    By <strong className="text-slate-700 font-semibold">{blog.writtenBy}</strong>
                  </span>
                </>
              )}
            </div>

            {/* Publication & Medical Verification Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#EDF3FC] border-2 border-[#D4E2F5] text-[#030050] flex items-center justify-center font-bold text-base shadow-xs select-none shrink-0">
                  {blog.author?.profileImage ? (
                    <img src={blog.author.profileImage} alt={blog.author.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span>{doctorInitials}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-slate-500">Medically reviewed by</span>
                    <span className="font-extrabold text-[#1D2A72] text-sm sm:text-base">
                      {blog.medicallyReviewedBy || blog.author?.name}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60">
                      <ShieldCheck className="w-3 h-3" /> Verified Doctor
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium pt-0.5">
                    {blog.author?.specialization || 'Consultant Specialist'}
                    {blog.writtenBy && <span className="text-slate-400"> · Written by <strong className="text-slate-600">{blog.writtenBy}</strong></span>}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-xs text-slate-400 font-medium pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 gap-1.5">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently Published'}</span>
                </div>
                {blog.commentsCount !== undefined && (
                  <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <MessageSquare className="w-3 h-3" />
                    <span>{blog.commentsCount} Comments</span>
                  </div>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 text-[#1D2A72] text-base font-medium italic leading-relaxed">
              "{blog.shortDescription}"
            </div>

            {/* Main Content */}
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base">
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
