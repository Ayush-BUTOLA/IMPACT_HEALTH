import { Star, Calendar, Clock, User } from 'lucide-react';
import { calcReadingTime } from '../../hooks/useBlogData';
import { Link } from 'react-router-dom';

/**
 * Featured Article Card
 * Only renders when a featured article is provided (CMS-driven).
 *
 * Props:
 *  - article: { title, excerpt, category, author, publishDate, content, isFeatured }
 */
export default function BlogFeatured({ article }) {
  if (!article) return null;

  const readingTime = article.readingTime || calcReadingTime(article.content);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-4 h-4 text-surface-tint" />
          <span className="text-[11px] font-bold tracking-[0.15em] text-surface-tint uppercase font-sans">
            Featured Article
          </span>
          <div className="flex-1 h-px bg-[#DDE0F5]/60"></div>
        </div>

        {/* Featured Card */}
        <Link
          to={`/blogs/${article.slug}`}
          className="block group bg-[#fcf8ff] rounded-2xl p-8 md:p-10 lg:p-12 border border-[#DDE0F5]/60 shadow-ambient shadow-ambient-hover cursor-pointer relative overflow-hidden text-left"
          role="article"
          aria-label={`Featured article: ${article.title}`}
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary via-surface-tint to-primary-container rounded-l-2xl"></div>

          <div className="pl-4 md:pl-6 space-y-5">
            {/* Category + Featured badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-primary/8 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-surface-tint/10 text-surface-tint px-3 py-1 rounded-full text-xs font-semibold font-sans">
                <Star className="w-3 h-3" />
                Featured
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary leading-tight group-hover:text-surface-tint transition-colors duration-300">
              {article.title}
            </h2>

            {/* Excerpt */}
            <p className="text-body-lg text-text-secondary leading-relaxed font-sans max-w-3xl">
              {article.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-outline font-sans">
              {article.author && (
                <span className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-medium text-text-secondary">{article.author}</span>
                </span>
              )}
              {article.publishDate && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </span>
              )}
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{readingTime}</span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
