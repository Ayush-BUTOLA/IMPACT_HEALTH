import bloodTestHero from '../assets/drive/about/blood_test_at_home.jpg';

export const FALLBACK_CATEGORIES = [
  { id: 1, name: "Disease and Diagnosis", slug: "disease-and-diagnosis" },
];

export const HARDCODED_BLOGS = [
  {
    id: "complete-hemogram-cbc-test",
    title: "Complete Hemogram (CBC) Test",
    slug: "complete-hemogram-cbc-test",
    shortDescription: "A Complete Hemogram / Complete Blood Count (CBC) is a blood test used to evaluate your overall health and disease conditions that affect your blood cells such as anemia, infections, inflammations, leukemia, etc.",
    featuredImage: bloodTestHero,
    category: {
      id: 1,
      name: "Disease and Diagnosis",
      slug: "disease-and-diagnosis",
    },
    author: {
      id: 101,
      name: "Dr. Sapana v Patel",
      specialization: "MBBS, DNB · Consultant Pathologist",
      profileImage: null,
    },
    writtenBy: "anshumansahoo",
    medicallyReviewedBy: "Dr. Sapana v Patel",
    commentsCount: 2,
    publishedAt: "2021-09-15T09:30:00.000Z",
    status: "PUBLISHED",
    content: `
      <div class="space-y-6">
        <section class="space-y-3">
          <h2 class="text-2xl font-extrabold text-[#1D2A72]">What is the CBC Test?</h2>
          <p class="text-slate-600 leading-relaxed text-base">
            A <strong>Complete Hemogram / Complete Blood Count (CBC)</strong> is a blood test used to evaluate your overall health and disease conditions that affect your blood cells such as anemia, infections, inflammations, leukemia, etc..
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-2xl font-extrabold text-[#1D2A72]">When is it required?</h2>
          <p class="text-slate-600 leading-relaxed text-base">
            Your doctor may ask you to get tested if you have any signs and symptoms that may be related to a condition that affects blood cells. It is also a very common blood test and can be done as a part of routine health examination.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-2xl font-extrabold text-[#1D2A72]">Why is it done?</h2>
          <ul class="list-disc pl-5 space-y-2 text-slate-600 text-base">
            <li>Your doctor may order it to review your overall health for preventive care or early detection and diagnosis.</li>
            <li>Your doctor may also order CBC if you are experiencing fatigue, weakness, fever or bleeding. A complete blood test would help in diagnosing the cause of these symptoms.</li>
            <li>A complete Hemogram test could also be ordered by your doctor if you are taking any medication or treatment that affects the blood count.</li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-extrabold text-[#1D2A72]">What diseases can CBC detect?</h2>
          <p class="text-slate-600 leading-relaxed text-base">
            A Complete Hemogram can assist physicians in diagnosing and monitoring a wide variety of medical conditions, including:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Anemia
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Inflammation
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Autoimmune diseases
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Dehydration
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Bone marrow disorders
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Infections
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Hemoglobin abnormalities
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Leukemia
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Low platelets count
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Thalassemia
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Sickle sick disease
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Cancer
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Lymphoma
            </div>
            <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm">
              <span class="w-2 h-2 rounded-full bg-[#5A67F2]"></span> Nutritional deficiencies (such as iron, folate etc.)
            </div>
          </div>
        </section>

        <section class="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
          <h2 class="text-xl font-extrabold text-[#1D2A72]">How much does it cost?</h2>
          <p class="text-slate-700 font-medium text-base">
            The average cost of CBC is between the range of <span class="font-extrabold text-[#1D2A72] text-lg">INR 200 – 400</span>.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-amber-50/80 border border-amber-200/70 space-y-2">
          <h3 class="text-sm font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <svg class="w-4 h-4 text-amber-600 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Disclaimer
          </h3>
          <p class="text-xs text-amber-800 leading-relaxed">
            All images, graphics, information, and representations are for the purpose of general information and awareness; and the information has been medically verified by registered doctors. However, this information cannot be used to establish an end result of a certain medical condition. For understanding and accuracy of your medical concern contact your physician.
          </p>
        </section>
      </div>
    `,
  },
];

export function getFallbackBlogs({ category, search } = {}) {
  let list = HARDCODED_BLOGS;

  if (category) {
    const catLower = category.toLowerCase().trim();
    list = list.filter(
      (b) =>
        b.category?.slug?.toLowerCase() === catLower ||
        b.category?.name?.toLowerCase() === catLower
    );
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.shortDescription?.toLowerCase().includes(q) ||
        b.content?.toLowerCase().includes(q)
    );
  }

  return list;
}

export function getFallbackBlogBySlug(slug) {
  if (!slug) return null;
  const s = slug.toLowerCase().trim();
  return HARDCODED_BLOGS.find((b) => b.slug.toLowerCase() === s) || null;
}
