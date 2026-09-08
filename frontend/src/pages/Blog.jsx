import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  ArrowRight
} from "lucide-react";
import apiService from "../api/apiService";
import { FALLBACK_CATEGORIES, getFallbackBlogs } from "../data/blogsData";

function getDoctorInitials(name) {
  if (!name) return 'MD';
  const cleaned = name.replace(/^Dr\.?\s+/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase() || 'MD';
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    let isMounted = true;
    apiService.getPublicCategories()
      .then(cats => {
        if (isMounted) {
          if (Array.isArray(cats) && cats.length > 0) {
            setCategories(cats);
          } else {
            setCategories(FALLBACK_CATEGORIES);
          }
        }
      })
      .catch(() => {
        if (isMounted) setCategories(FALLBACK_CATEGORIES);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    apiService.getPublicBlogs({
      category: selectedCategory || undefined,
      search: search.trim() || undefined,
      size: 12
    })
      .then(res => {
        if (isMounted) {
          if (res?.content && res.content.length > 0) {
            setBlogs(res.content);
          } else {
            setBlogs(getFallbackBlogs({ category: selectedCategory, search }));
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setBlogs(getFallbackBlogs({ category: selectedCategory, search }));
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [selectedCategory, search]);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-[#1D2A72] text-xs font-extrabold uppercase tracking-wider">
            Verified Physician Publications
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1D2A72] tracking-tight">
            Impact Health Insights & Research
          </h1>
          <p className="text-base text-slate-600">
            Authoritative healthcare articles, clinical guidelines, and wellness strategies published by licensed medical doctors.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search articles by medical topic or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A67F2]"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === '' ? 'bg-[#1D2A72] text-white shadow-md shadow-[#1D2A72]/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Articles
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat.slug ? 'bg-[#1D2A72] text-white shadow-md shadow-[#1D2A72]/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="py-24 text-center text-slate-400 font-semibold text-sm">Loading published articles...</div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#1D2A72]">No Published Articles Found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">There are no published articles matching your criteria at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Featured Header Image */}
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    {blog.featuredImage ? (
                      <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">Impact Health</div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1D2A72]/90 backdrop-blur-md text-white font-extrabold text-[10px] uppercase tracking-wider">
                      {blog.category?.name}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-extrabold text-[#1D2A72] text-lg leading-snug hover:text-[#5A67F2] transition line-clamp-2">
                      <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {blog.shortDescription}
                    </p>

                    {/* Author Doctor Meta */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#EDF3FC] border border-[#D4E2F5] text-[#030050] flex items-center justify-center font-bold text-[10px] select-none shrink-0 overflow-hidden">
                          {blog.author?.profileImage ? (
                            <img src={blog.author.profileImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span>{getDoctorInitials(blog.author?.name)}</span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-[#1D2A72]">{blog.author?.name}</span>
                      </div>

                      <span className="text-[11px] text-slate-400 font-medium">
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Recently'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Read More Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-[#1D2A72] font-bold text-xs hover:bg-[#1D2A72] hover:text-white transition text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
