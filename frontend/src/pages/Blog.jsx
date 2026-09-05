import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  CheckCircle2,
  FolderOpen,
  ArrowUpRight
} from "lucide-react";
import apiService from "../api/apiService";
import BlogDetail from "./BlogDetail";
import Button from "../components/Button";

export default function Blog() {
  const { slug } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  if (slug) {
    return <BlogDetail />;
  }

  useEffect(() => {
    fetchPublicCategories();
  }, []);

  useEffect(() => {
    fetchPublicBlogs();
  }, [search, selectedCategory, page]);

  const fetchPublicCategories = async () => {
    try {
      const cats = await apiService.getPublicCategories();
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (err) {
      console.warn('Backend categories endpoint offline');
    }
  };

  const fetchPublicBlogs = async () => {
    setLoading(true);
    try {
      const res = await apiService.getPublicBlogs({
        category: selectedCategory || undefined,
        search: search.trim() || undefined,
        page,
        size: 9
      });
      setBlogs(res.content || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.warn('Backend public blogs endpoint offline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen font-sans text-[#0F172A]">
      <Helmet>
        <title>Health &amp; Wellness Blog | Expert Medical Articles by Physicians | Impact Health</title>
        <meta name="description" content="Read expert health articles, disease management guides &amp; wellness tips authored by licensed physicians at Impact Health. Covering nutrition, mental health, diagnostics &amp; more." />
        <meta property="og:title" content="Impact Health Blog | Physician-Authored Medical Guidance" />
        <meta property="og:description" content="Expert health articles from licensed doctors on disease management, nutrition, mental health &amp; preventive care." />
      </Helmet>
      
      {/* 1. Header Hero */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-semibold">
              <Stethoscope className="w-4 h-4 text-[#0066FF]" />
              <span className="font-mono uppercase tracking-wider">Physician Publications</span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#0B132B] tracking-[-0.03em] leading-tight">
              Medical Insights &amp; Clinical Research
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Authoritative healthcare guidance, disease management protocols, and wellness research authored by licensed medical physicians.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Bar */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search medical topics..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full text-[#0B132B] focus:bg-white focus:outline-none focus:border-[#0066FF] transition"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                onClick={() => { setSelectedCategory(''); setPage(0); }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer select-none ${
                  selectedCategory === ''
                    ? 'bg-[#0B132B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Articles
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.slug); setPage(0); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer select-none ${
                    selectedCategory === cat.slug
                      ? 'bg-[#0B132B] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. Articles Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 text-center text-slate-400 font-semibold text-xs font-mono">
              Fetching published clinical articles...
            </div>
          ) : blogs.length === 0 ? (
            <div className="bezel-outer max-w-lg mx-auto">
              <div className="bezel-inner p-12 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-display font-bold text-base text-[#0B132B]">No Articles Found</h3>
                <p className="text-xs text-slate-500">No published articles match the current filter or search criteria.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="bezel-outer group">
                  <div className="bezel-inner p-5 flex flex-col justify-between h-full space-y-5 text-left">
                    <div className="space-y-4">
                      
                      {/* Image Thumbnail */}
                      <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-900">
                        {blog.featuredImage ? (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
                            Impact Health Research
                          </div>
                        )}
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0B132B]/90 backdrop-blur-md text-white font-bold text-[10px] uppercase font-mono">
                          {blog.category?.name}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <div className="space-y-1.5">
                        <h3 className="font-display font-bold text-base text-[#0B132B] group-hover:text-[#0066FF] transition-colors leading-snug line-clamp-2">
                          <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {blog.shortDescription}
                        </p>
                      </div>

                    </div>

                    {/* Author Meta & Action */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#0B132B] text-white flex items-center justify-center font-bold text-[10px] overflow-hidden">
                          {blog.author?.profileImage ? (
                            <img src={blog.author.profileImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Stethoscope className="w-3 h-3" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-[#0B132B]">{blog.author?.name}</span>
                      </div>

                      <Link to={`/blogs/${blog.slug}`}>
                        <Button variant="ghost" size="sm" className="text-xs px-2.5 py-1" withArrow>
                          <span>Read</span>
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
