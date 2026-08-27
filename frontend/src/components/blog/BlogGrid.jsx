import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { calcReadingTime } from '../../hooks/useBlogData';

/**
 * Loading skeleton for article cards.
 */
function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-7 border border-[#DDE0F5]/60 shadow-ambient animate-pulse">
      <div className="space-y-4">
        <div className="w-24 h-5 bg-surface-container-high rounded-full"></div>
        <div className="space-y-2">
          <div className="h-5 bg-surface-container-high rounded-lg w-full"></div>
          <div className="h-5 bg-surface-container-high rounded-lg w-3/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3.5 bg-surface-container rounded-lg w-full"></div>
          <div className="h-3.5 bg-surface-container rounded-lg w-5/6"></div>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <div className="h-3.5 bg-surface-container rounded-lg w-20"></div>
          <div className="h-3.5 bg-surface-container rounded-lg w-20"></div>
          <div className="h-3.5 bg-surface-container rounded-lg w-16"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Single Article Card (text-first, no images).
 */
function ArticleCard({ article }) {
  const readingTime = article.readingTime || calcReadingTime(article.content);

  return (
    <Link
      to={`/blogs/${article.slug}`}
      className="block group bg-white rounded-2xl p-7 border border-[#DDE0F5]/60 shadow-ambient cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgba(3,0,80,0.08),0_10px_10px_-6px_rgba(3,0,80,0.06)] hover:border-primary/20 relative overflow-hidden text-left"
      role="article"
      aria-label={article.title}
    >
      {/* Hover accent bar */}
      <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-primary to-surface-tint rounded-tl-2xl group-hover:h-full transition-all duration-500 ease-out"></div>

      <div className="space-y-4">
        {/* Category badge */}
        <span className="inline-flex items-center bg-[#ECECFE]/60 text-primary px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider font-sans">
          {article.category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-display font-bold text-primary leading-snug group-hover:text-surface-tint transition-colors duration-300">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-text-secondary leading-relaxed font-sans line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-3 border-t border-[#DDE0F5]/40 text-xs text-outline font-sans">
          {article.author && (
            <span className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span className="font-medium text-text-secondary">{article.author}</span>
            </span>
          )}
          {article.publishDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{readingTime}</span>
          </span>
        </div>

        {/* Read more indicator */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/0 group-hover:text-primary font-sans transition-all duration-300 translate-x-0 group-hover:translate-x-1">
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

/**
 * Blog Articles Grid
 *
 * Props:
 *  - articles:   Article[]
 *  - isLoading:  boolean
 */
export default function BlogGrid({ articles, isLoading }) {
  // Loading state
  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // No articles to display (empty state is handled separately)
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[11px] font-bold tracking-[0.15em] text-text-secondary/60 uppercase font-sans">
            Latest Articles
          </span>
          <div className="flex-1 h-px bg-[#DDE0F5]/60"></div>
          <span className="text-xs text-outline font-sans font-medium">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
