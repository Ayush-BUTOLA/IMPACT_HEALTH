import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BookOpen,
  Microscope,
  ClipboardList,
  HeartPulse,
  FileBarChart,
  Search,
  Star,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Mail,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import useBlogData from "../hooks/useBlogData";

const CATEGORY_MAP = {
  "Research": { desc: "Insights on clinical trials & epidemiological trends.", icon: Microscope },
  "Diagnostics": { desc: "Modern testing models & early disease mapping.", icon: ClipboardList },
  "Management": { desc: "Medication adherence protocols & guides.", icon: BookOpen },
  "Patient Care": { desc: "Last-mile care coordination & support ops.", icon: HeartPulse },
  "Clinical Insights": { desc: "Authoritative reports for partner organizations.", icon: FileBarChart }
};

export default function Blog() {
  const { slug } = useParams();
  const {
    articles,
    featured,
    categories,
    isLoading,
    activeCategory,
    setActiveCategory,
    handleSearch,
    allArticles,
    searchQuery,
  } = useBlogData();

  // Find the selected article if slug is provided
  const article = allArticles ? allArticles.find((a) => a.slug === slug) : null;

  // Manage SEO document titles and meta tags
  useEffect(() => {
    if (article) {
      document.title = `${article.seoTitle || article.title} | Impact Health`;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', article.seoDescription || article.excerpt);
    } else {
      document.title = "Trusted Healthcare Knowledge & Insights | Impact Health";
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article]);

  // Determine if we should show the empty state
  const showEmpty = !isLoading && articles.length === 0 && !featured;

  // Render article detail view
  if (slug) {
    if (isLoading) {
      return (
        <div className="w-full bg-white py-24 min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-6 max-w-3xl w-full px-6">
            <div className="h-4 bg-slate-100 w-24 rounded"></div>
            <div className="h-10 bg-slate-100 w-3/4 rounded"></div>
            <div className="h-6 bg-slate-100 w-full rounded"></div>
            <div className="h-64 bg-slate-100 w-full rounded-2xl"></div>
          </div>
        </div>
      );
    }

    if (!article) {
      return (
        <div className="w-full bg-white py-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl font-display font-bold text-navy mb-4">Article Not Found</h2>
          <p className="text-[#6b7280] font-sans mb-8">The article you are looking for does not exist or has been removed.</p>
          <Link to="/blogs" className="inline-flex items-center gap-2 bg-navy text-white font-sans font-bold text-sm px-6 py-3.5 rounded-lg hover:opacity-90 transition shadow-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      );
    }

    return (
      <div className="w-full bg-white relative overflow-hidden">
        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-6 md:px-12 py-16 lg:py-24 text-left">
          
          {/* Back button */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-violet transition-colors group mb-8 font-sans"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center bg-violet-soft text-navy px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-navy leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-8 border-b border-[#e6e7f2] text-sm text-[#6b7280] font-sans mb-10">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium text-navy/80">{article.author}</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime}</span>
            </span>
            <span className="flex items-center gap-2 text-[#107C10]">
              <ShieldCheck className="w-4 h-4" />
              <span>Medically Reviewed</span>
            </span>
          </div>

          {/* Article Body Content */}
          <div className="text-navy/80 leading-relaxed font-sans text-base space-y-8">
            <p className="text-lg text-navy/80 leading-relaxed">
              A Complete Blood Count (CBC), also known as a Complete Hemogram, is one of the most commonly prescribed blood tests. It helps doctors evaluate your overall health and detect a wide range of medical conditions affecting blood cells, including anemia, infections, inflammation, and blood disorders.
            </p>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-navy">What is a CBC Test?</h2>
              <p>
                A Complete Blood Count (CBC) is a laboratory blood test that measures different components of your blood, including:
              </p>
              <ul className="checkmark-list space-y-2">
                <li><strong>Red Blood Cells (RBCs):</strong> Carry oxygen from your lungs to the rest of your body.</li>
                <li><strong>White Blood Cells (WBCs):</strong> Part of your immune system, helping fight infections.</li>
                <li><strong>Hemoglobin:</strong> The oxygen-carrying protein in red blood cells.</li>
                <li><strong>Hematocrit:</strong> The proportion of red blood cells to the fluid component (plasma) in your blood.</li>
                <li><strong>Platelets:</strong> Help your blood clot and prevent excessive bleeding.</li>
              </ul>
              <p className="mt-2">
                These measurements provide important information about your body's health and can help identify potential medical conditions early.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-navy">When is a CBC Test Required?</h2>
              <p>Your doctor may recommend a CBC test if:</p>
              <ul className="checkmark-list space-y-2">
                <li>You are experiencing fatigue or weakness</li>
                <li>You have persistent fever</li>
                <li>You have signs of infection</li>
                <li>You experience unusual bleeding or bruising</li>
                <li>You are undergoing routine health screening</li>
                <li>You are receiving medications that may affect blood cell counts</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-navy">Why is a CBC Test Done?</h2>
              <p>A CBC test helps healthcare professionals:</p>
              <ul className="checkmark-list space-y-2">
                <li>Assess overall health status</li>
                <li>Detect medical conditions early</li>
                <li>Investigate symptoms such as fatigue, fever, or weakness</li>
                <li>Monitor ongoing treatments</li>
                <li>Evaluate medication side effects</li>
                <li>Track recovery from illness or infection</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-navy">What Diseases Can a CBC Detect?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-lav p-6 rounded-2xl border border-[#e6e7f2] text-left">
                  <h3 className="text-lg font-display font-bold text-navy mb-3">Blood Disorders</h3>
                  <ul className="checkmark-list space-y-2 text-sm text-navy/70">
                    <li><strong>Anemia:</strong> Low red blood cell count or hemoglobin.</li>
                    <li><strong>Thalassemia &amp; Sickle Cell:</strong> Genetic hemoglobin abnormalities.</li>
                  </ul>
                </div>

                <div className="bg-lav p-6 rounded-2xl border border-[#e6e7f2] text-left">
                  <h3 className="text-lg font-display font-bold text-navy mb-3">Infections &amp; Inflammation</h3>
                  <ul className="checkmark-list space-y-2 text-sm text-navy/70">
                    <li><strong>Bacterial/Viral Infections:</strong> Elevated or depressed white blood cell counts.</li>
                    <li><strong>Chronic Inflammation:</strong> Alterations in immune cell profiles.</li>
                  </ul>
                </div>

                <div className="bg-lav p-6 rounded-2xl border border-[#e6e7f2] text-left">
                  <h3 className="text-lg font-display font-bold text-navy mb-3">Immune &amp; Bone Marrow</h3>
                  <ul className="checkmark-list space-y-2 text-sm text-navy/70">
                    <li><strong>Autoimmune Diseases:</strong> Abnormal white blood cell activity or counts.</li>
                    <li><strong>Leukemia &amp; Lymphoma:</strong> Uncontrolled white blood cell production.</li>
                    <li><strong>Bone Marrow Issues:</strong> Low counts across multiple cell types.</li>
                  </ul>
                </div>

                <div className="bg-lav p-6 rounded-2xl border border-[#e6e7f2] text-left">
                  <h3 className="text-lg font-display font-bold text-navy mb-3">Other Conditions</h3>
                  <ul className="checkmark-list space-y-2 text-sm text-navy/70">
                    <li><strong>Dehydration:</strong> Elevated hematocrit levels.</li>
                    <li><strong>Thrombocytopenia:</strong> Low platelet count, indicating bleeding risk.</li>
                    <li><strong>Nutritional Deficiencies:</strong> Alterations in red blood cell size and shape.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-3 bg-[#107C10]/5 border border-[#107C10]/20 rounded-2xl p-6 text-left">
              <h2 className="text-xl font-display font-bold text-navy">Cost of a CBC Test</h2>
              <p className="text-body-md text-navy/80">
                The average Complete Blood Count (CBC) or Complete Hemogram test cost in India ranges between <strong className="text-navy font-semibold">₹200 and ₹400</strong>.
              </p>
            </section>

            <p className="text-xs text-[#6b7280] italic border-t border-[#e6e7f2] pt-6 text-left">
              Disclaimer: This article is intended for educational purposes only and should not replace professional medical advice. Always consult a qualified healthcare provider regarding medical concerns.
            </p>
          </div>

          {/* Author & Reviewer Info Cards */}
          <div className="mt-16 pt-8 border-t border-[#e6e7f2] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-lav p-5 rounded-2xl border border-[#e6e7f2] text-left" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-display font-bold shrink-0">
                AS
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280] mb-0.5">Written By</p>
                <h4 className="text-sm font-bold text-navy leading-tight">{article.author}</h4>
                <p className="text-xs text-[#6b7280] mt-0.5">Founder &amp; CEO, Strategic Advisor</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-violet-soft/30 p-5 rounded-2xl border border-[#e6e7f2] text-left" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="w-12 h-12 rounded-full bg-[#107C10]/10 flex items-center justify-center text-[#107C10] font-display font-bold shrink-0">
                SV
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280] mb-0.5">Medically Reviewed By</p>
                <h4 className="text-sm font-bold text-navy leading-tight">{article.reviewer}</h4>
                <p className="text-xs text-[#6b7280] mt-0.5">MD, Clinical Advisory Board Member</p>
              </div>
            </div>
          </div>

        </article>

        {/* Newsletter Subscription */}
        <section className="bg-dots-light border-y border-[#e6e7f2]">
          <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 bg-white border border-[#e6e7f2] rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-navy shadow-sm mb-5 font-sans">
              <Mail className="w-3.5 h-3.5 text-violet" strokeWidth={2} /> Newsletter
            </span>
            <h2 className="font-display font-extrabold text-navy tracking-tight text-[32px] mb-3">Stay at the Forefront</h2>
            <p className="text-[14.5px] text-[#1a1a2e]/60 max-w-[480px] mb-7 font-sans">
              Join healthcare professionals receiving the latest updates, research
              summaries, and industry insights delivered to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full max-w-[480px]">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={2} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white border border-[#e6e7f2] rounded-xl pl-10 pr-4 py-3 text-[13.5px] text-navy placeholder:text-[#6b7280] focus:outline-none focus:border-violet/50 font-sans"
                  required
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 bg-navy text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-navy-deep transition-colors font-sans cursor-pointer">
                Subscribe <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </form>
            <p className="text-[11.5px] text-[#6b7280] mt-3 font-sans">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>
    );
  }

  // Normal blog listing view
  return (
    <div id="blogs" className="w-full bg-white relative overflow-hidden">
      
      {/* HERO — soft dotted background */}
      <section className="bg-dots border-b border-[#e6e7f2]">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 flex flex-col items-center text-center anim-rise">
          <span className="inline-flex items-center gap-2 bg-white border border-[#e6e7f2] rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-navy shadow-sm mb-6 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Trusted Healthcare Knowledge
          </span>
          <h1 className="font-display font-extrabold text-navy tracking-tight text-[46px] lg:text-[52px] leading-[1.05] max-w-[760px]">
            Trusted Healthcare <span className="text-violet">Knowledge</span> & Insights
          </h1>
          <p className="text-[16px] leading-relaxed text-[#1a1a2e]/60 max-w-[560px] mt-5 font-sans">
            Stay informed with expert-reviewed articles, clinical research,
            diagnostics, and operational insights from the care coordination team at
            Impact Health.
          </p>
          <div className="text-[12px] font-semibold tracking-[0.08em] text-[#107C10] uppercase mt-7 mb-9 font-sans">
            Medical Advisory Board Reviewed · Clinical Accuracy Verified
          </div>

          {/* category cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
            {categories.filter(c => c !== "All").map((c) => {
              const info = CATEGORY_MAP[c] || { desc: "Insights & guides.", icon: BookOpen };
              const Icon = info.icon;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className="bg-white border border-[#e6e7f2] rounded-2xl p-5 flex flex-col gap-3 text-left hover:border-violet/40 transition-colors shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-soft flex items-center justify-center group-hover:bg-violet/10 transition-colors shrink-0">
                    <Icon className="w-[18px] h-[18px] text-violet" strokeWidth={2} />
                  </div>
                  <div className="font-display font-bold text-[13.5px] text-navy uppercase tracking-wide leading-tight">{c}</div>
                  <p className="text-[11.5px] leading-relaxed text-[#6b7280] font-sans">{info.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FILTER + SEARCH */}
      <section className="bg-white border-b border-[#e6e7f2] sticky top-[68px] z-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-5 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-2 flex-wrap text-left">
            <span className="text-[11px] font-bold tracking-[0.1em] text-[#6b7280] uppercase mr-1 font-sans">Filter</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={
                  "text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer " +
                  (activeCategory === c
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-[#1a1a2e]/70 border-[#e6e7f2] hover:border-navy/30")
                }
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative md:w-[320px]">
            <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={2} />
            <input
              defaultValue={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search articles by title or content..."
              className="w-full bg-lav border border-[#e6e7f2] rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-navy placeholder:text-[#6b7280] focus:outline-none focus:border-violet/50 font-sans"
            />
          </div>
        </div>
      </section>

      {/* ARTICLES LIST */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-14">
          {showEmpty ? (
            <div className="flex flex-col items-center text-center py-20 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-violet-soft flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-violet" strokeWidth={1.75} />
              </div>
              <div className="font-display font-bold text-[18px] text-navy">No articles found</div>
              <p className="text-[13.5px] text-[#6b7280] max-w-[340px] font-sans mx-auto">
                Try a different category or clear your search to see all insights.
              </p>
            </div>
          ) : (
            <>
              {/* Featured article (rendered at the top of listing if exists and loading complete) */}
              {!isLoading && featured && (
                <div className="text-left">
                  <div className="flex items-center gap-2 text-[12px] font-bold tracking-[0.12em] text-violet uppercase mb-4 font-sans">
                    <Star className="w-3.5 h-3.5 fill-violet text-violet" /> Featured Article
                  </div>
                  <Link
                    to={`/blogs/${featured.slug}`}
                    className="block bg-lav border border-[#e6e7f2] rounded-2xl p-8 mb-10 hover:border-violet/40 transition-colors" 
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-[11px] font-bold tracking-wide text-navy bg-violet-soft px-2.5 py-1 rounded-md uppercase font-sans">{featured.category}</span>
                      <span className="text-[11px] font-semibold text-violet border border-violet/30 px-2.5 py-1 rounded-md font-sans">★ Featured</span>
                    </div>
                    <h2 className="font-display font-extrabold text-navy tracking-tight text-[26px] leading-snug max-w-[720px] mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-[14.5px] leading-relaxed text-[#6b7280] max-w-[680px] mb-5 font-sans">{featured.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-5 text-[12.5px] text-[#6b7280] font-sans">
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" strokeWidth={2} /> {featured.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" strokeWidth={2} /> {new Date(featured.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" strokeWidth={2} /> {featured.readingTime}</span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Loader skeleton */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse bg-slate-50 border border-[#e6e7f2] rounded-2xl p-6 h-48"></div>
                  ))}
                </div>
              )}

              {/* Article Grid */}
              {!isLoading && articles.length > 0 && (
                <div className="grid md:grid-cols-2 gap-5 text-left">
                  {articles.map((a) => (
                    <Link
                      key={a.title}
                      to={`/blogs/${a.slug}`}
                      className="block bg-white border border-[#e6e7f2] rounded-2xl p-6 hover:border-violet/40 transition-colors"
                      style={{ boxShadow: "var(--shadow-card)" }}
                    >
                      <span className="text-[10.5px] font-bold tracking-wide text-navy bg-violet-soft px-2.5 py-1 rounded-md uppercase font-sans">{a.category}</span>
                      <h3 className="font-display font-bold text-navy text-[18px] leading-snug mt-3 mb-2">{a.title}</h3>
                      <p className="text-[13px] leading-relaxed text-[#6b7280] mb-4 font-sans">{a.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#6b7280] font-sans">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" strokeWidth={2} /> {a.author}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" strokeWidth={2} /> {a.readingTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-dots-light border-y border-[#e6e7f2]">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 bg-white border border-[#e6e7f2] rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-navy shadow-sm mb-5 font-sans">
            <Mail className="w-3.5 h-3.5 text-violet" strokeWidth={2} /> Newsletter
          </span>
          <h2 className="font-display font-extrabold text-navy tracking-tight text-[32px] mb-3">Stay at the Forefront</h2>
          <p className="text-[14.5px] text-[#1a1a2e]/60 max-w-[480px] mb-7 font-sans">
            Join healthcare professionals receiving the latest updates, research
            summaries, and industry insights delivered to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full max-w-[480px]">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={2} />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white border border-[#e6e7f2] rounded-xl pl-10 pr-4 py-3 text-[13.5px] text-navy placeholder:text-[#6b7280] focus:outline-none focus:border-violet/50 font-sans"
                required
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 bg-navy text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-navy-deep transition-colors font-sans cursor-pointer">
              Subscribe <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </form>
          <p className="text-[11.5px] text-[#6b7280] mt-3 font-sans">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

    </div>
  );
}
