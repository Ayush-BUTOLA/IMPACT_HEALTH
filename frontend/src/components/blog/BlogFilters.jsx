import { useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Blog Category Filters + Search Bar
 *
 * Props:
 *  - categories:       string[]       — dynamic list from CMS data
 *  - activeCategory:   string
 *  - setActiveCategory: (cat) => void
 *  - onSearch:         (query) => void — debounced handler from useBlogData
 */
export default function BlogFilters({
  categories,
  activeCategory,
  setActiveCategory,
  onSearch,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <section className="py-10 bg-white border-b border-[#DDE0F5]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] font-bold tracking-[0.15em] text-text-secondary/60 uppercase font-sans mr-2 hidden sm:block">
            Filter:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium font-sans transition-all duration-200
                  cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
                  ${isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-text-secondary border border-border-subtle hover:bg-[#ECECFE]/30 hover:text-primary hover:border-primary/20'
                  }
                `}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-outline" />
          </div>
          <input
            id="blog-search"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search articles by title, content, or category..."
            className="w-full pl-14 pr-12 py-4 bg-surface-container-lowest border border-border-subtle rounded-xl text-sm font-sans text-on-surface placeholder:text-outline/60 transition-all duration-200 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-lg focus:shadow-primary/5"
            aria-label="Search articles"
          />
          {inputValue && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-outline hover:text-primary transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
