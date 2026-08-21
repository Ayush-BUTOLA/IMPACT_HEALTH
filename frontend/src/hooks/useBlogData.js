import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * CMS-ready hook for fetching and managing blog data.
 *
 * Returns:
 *  - articles:    filtered list (by category + search)
 *  - featured:    single featured article or null
 *  - categories:  unique categories extracted from all articles
 *  - isLoading:   true while data is being fetched
 *  - error:       error message if fetch failed
 *  - activeCategory / setActiveCategory
 *  - searchQuery  / setSearchQuery
 *
 * To connect your CMS, replace the fetchArticles() stub with your API call.
 */

const CBC_ARTICLE = {
  id: 'complete-hemogram-cbc-test',
  slug: 'complete-hemogram-cbc-test',
  title: 'Complete Hemogram (CBC) Test: Purpose, Cost, and Conditions It Can Detect',
  excerpt: 'A Complete Blood Count (CBC), also known as a Complete Hemogram, is one of the most commonly prescribed blood tests. It helps doctors evaluate your overall health and detect a wide range of medical conditions affecting blood cells, including anemia, infections, inflammation, and blood disorders.',
  category: 'Disease and Diagnosis',
  author: 'Anshuman Sahoo',
  reviewer: 'Dr. Sapana V. Patel',
  publishDate: '2026-06-12',
  readingTime: '5 minutes',
  isFeatured: true,
  seoTitle: 'Complete Hemogram (CBC) Test: Purpose, Cost, and Conditions It Can Detect',
  seoDescription: 'Learn what a Complete Blood Count (CBC) test is, when it is required, what diseases it can detect, and its average cost in India.',
  content: `
A Complete Blood Count (CBC), also known as a Complete Hemogram, is one of the most commonly prescribed blood tests. It helps doctors evaluate your overall health and detect a wide range of medical conditions affecting blood cells, including anemia, infections, inflammation, and blood disorders.

### What is a CBC Test?

A Complete Blood Count (CBC) is a laboratory blood test that measures different components of your blood, including:

*   **Red Blood Cells (RBCs):** Carry oxygen from your lungs to the rest of your body.
*   **White Blood Cells (WBCs):** Part of your immune system, helping fight infections.
*   **Hemoglobin:** The oxygen-carrying protein in red blood cells.
*   **Hematocrit:** The proportion of red blood cells to the fluid component (plasma) in your blood.
*   **Platelets:** Help your blood clot and prevent excessive bleeding.

These measurements provide important information about your body's health and can help identify potential medical conditions early.

### When is a CBC Test Required?

Your doctor may recommend a CBC test if:

*   You are experiencing fatigue or weakness
*   You have persistent fever
*   You have signs of infection
*   You experience unusual bleeding or bruising
*   You are undergoing routine health screening
*   You are receiving medications that may affect blood cell counts

### Why is a CBC Test Done?

A CBC test helps healthcare professionals:

*   Assess overall health status
*   Detect medical conditions early
*   Investigate symptoms such as fatigue, fever, or weakness
*   Monitor ongoing treatments
*   Evaluate medication side effects
*   Track recovery from illness or infection

### What Diseases Can a CBC Detect?

#### Blood Disorders:
*   **Anemia:** Low red blood cell count or hemoglobin.
*   **Thalassemia & Sickle Cell Disease:** Genetic hemoglobin abnormalities.

#### Infections and Inflammation:
*   **Bacterial/Viral Infections:** Elevated or depressed white blood cell counts.
*   **Chronic Inflammation:** Alterations in immune cell profiles.

#### Immune System Conditions:
*   **Autoimmune Diseases:** Abnormal white blood cell activity or counts.

#### Bone Marrow Disorders:
*   **Leukemia & Lymphoma:** Uncontrolled white blood cell production.
*   **Bone Marrow Abnormalities:** Low counts across multiple cell types.

#### Other Conditions:
*   **Dehydration:** Elevated hematocrit levels.
*   **Thrombocytopenia:** Low platelet count, indicating bleeding risk.
*   **Nutritional Deficiencies:** Alterations in red blood cell size and shape.

### Cost

The average CBC test cost in India ranges between **₹200 and ₹400**.

---

*Disclaimer: This article is intended for educational purposes only and should not replace professional medical advice. Always consult a qualified healthcare provider regarding medical concerns.*
  `
};

const DIABETES_ARTICLE = {
  id: 'understanding-diabetes-management',
  slug: 'understanding-diabetes-management',
  title: 'Understanding Diabetes Management: Diet, Exercise, and Monitoring',
  excerpt: 'Managing diabetes effectively requires a combination of healthy eating, regular exercise, blood sugar monitoring, and proper medical support. Learn the key strategies to keep your blood glucose in check.',
  category: 'Management',
  author: 'Anshuman Sahoo',
  reviewer: 'Dr. Sapana V. Patel',
  publishDate: '2026-06-20',
  readingTime: '6 minutes',
  isFeatured: false,
  seoTitle: 'Understanding Diabetes Management: Diet, Exercise, and Monitoring',
  seoDescription: 'Explore essential strategies for diabetes management, including diet control, exercise regimens, and regular blood glucose tracking.',
  content: `
Diabetes is a chronic condition that affects how your body turns food into energy. Proper diabetes management is crucial to avoid complications.

### Key Strategies for Diabetes Management:

1. **Diet Control:** Focus on whole foods, fiber-rich vegetables, and complex carbohydrates while minimizing simple sugars.
2. **Regular Exercise:** Physical activity increases insulin sensitivity and helps manage weight.
3. **Continuous Monitoring:** Regularly check blood glucose levels to adjust diet and medical treatments accordingly.
4. **Professional Guidance:** Collaborate with your dedicated medical team for personalized insulin and medication plans.
  `
};

async function fetchArticles() {
  return [CBC_ARTICLE, DIABETES_ARTICLE];
}
// ────────────────────────────────────────────────────────────────────

/**
 * Calculate reading time from word count.
 * @param {string} content
 * @returns {string} e.g. "5 min read"
 */
export function calcReadingTime(content = '') {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

let savedSearchQuery = '';
let savedActiveCategory = 'All';

export default function useBlogData() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategoryState] = useState(savedActiveCategory);
  const [searchQuery, setSearchQueryState] = useState(savedSearchQuery);

  const setActiveCategory = useCallback((cat) => {
    savedActiveCategory = cat;
    setActiveCategoryState(cat);
  }, []);

  const setSearchQuery = useCallback((query) => {
    savedSearchQuery = query;
    setSearchQueryState(query);
  }, []);

  // Fetch articles on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchArticles();
        if (!cancelled) {
          setAllArticles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load articles');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // Extract unique categories from article data
  const categories = useMemo(() => {
    const cats = new Set();
    allArticles.forEach((a) => {
      if (a.category) cats.add(a.category);
    });
    return ['All', ...Array.from(cats).sort()];
  }, [allArticles]);

  // Featured article (first article explicitly marked)
  // Respects category and search query filters to ensure correct empty states
  const featured = useMemo(() => {
    const feat = allArticles.find((a) => a.isFeatured) || null;
    if (!feat) return null;

    const query = searchQuery.toLowerCase().trim();
    if (activeCategory !== 'All' && feat.category !== activeCategory) return null;
    if (query) {
      const haystack = [feat.title, feat.excerpt, feat.content, feat.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return null;
    }
    return feat;
  }, [allArticles, activeCategory, searchQuery]);

  // Filtered articles
  const articles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return allArticles.filter((a) => {
      // Exclude featured from main grid
      if (a.isFeatured) return false;

      // Category filter
      if (activeCategory !== 'All' && a.category !== activeCategory) return false;

      // Search filter
      if (query) {
        const haystack = [a.title, a.excerpt, a.content, a.category]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [allArticles, activeCategory, searchQuery]);

  // Debounced search setter
  const [debouncedSetter] = useState(() => {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => setSearchQuery(value), 300);
    };
  });

  const handleSearch = useCallback(
    (value) => debouncedSetter(value),
    [debouncedSetter],
  );

  return {
    articles,
    featured,
    categories,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    handleSearch,
    allArticles,
  };
}
