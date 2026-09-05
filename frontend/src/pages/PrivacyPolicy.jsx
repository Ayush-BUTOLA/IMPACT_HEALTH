import { useEffect, useMemo, useRef, useState } from 'react';
import { Phone, Mail, Shield, CalendarDays } from 'lucide-react';
import PageBackground from '../components/PageBackground';

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (!sectionIds.length) return;

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.1, 0.2, 0.35] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

function TocLink({ id, label, isActive, onClick }) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      className={[
        'block rounded-xl px-3 py-2 text-xs font-semibold transition-all select-none',
        isActive ? 'bg-[#0B132B] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B132B] hover:bg-slate-100'
      ].join(' ')}
      aria-current={isActive ? 'location' : undefined}
    >
      {label}
    </a>
  );
}

function Callout({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] font-bold shrink-0">
          {icon}
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-display font-bold text-[#0B132B]">
            {title}
          </h4>
          <div className="text-xs text-slate-600 leading-relaxed font-sans">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Impact Health';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const lastUpdated = 'June 2026';

  const toc = useMemo(
    () => [
      { id: 'about-us', label: 'About Us' },
      { id: 'information-we-collect', label: 'Information We Collect' },
      { id: 'how-we-use', label: 'How We Use Your Information' },
      { id: 'cookies-and-analytics', label: 'Cookies and Analytics' },
      { id: 'sharing', label: 'Sharing of Information' },
      { id: 'data-security', label: 'Data Security' },
      { id: 'data-retention', label: 'Data Retention' },
      { id: 'your-rights', label: 'Your Rights' },
      { id: 'third-party-websites', label: 'Third-Party Websites' },
      { id: 'childrens-privacy', label: "Children's Privacy" },
      { id: 'grievance-officer', label: 'Grievance Officer' },
      { id: 'contact-us', label: 'Contact Us' },
      { id: 'changes-to-policy', label: 'Changes to This Policy' },
      { id: 'governing-law', label: 'Governing Law' }
    ],
    []
  );

  const activeId = useActiveSection(toc.map((t) => t.id));
  const [mobileOpen, setMobileOpen] = useState(false);
  const tocRef = useRef(null);

  const handleTocClick = () => {
    if (window.innerWidth < 768) setMobileOpen(false);
  };

  const contactEmail = 'connect@impacthealth.co.in';
  const contactPhone = '+91 9667835909';
  const contactWebsite = 'www.impacthealth.co.in';

  const grievance = {
    name: 'Ashish Rawat',
    addressLines: ['Mayur Vihar Phase III', 'New Delhi - 110096, India'],
    phone: '+91 9667835909',
    email: 'ashish.rawat@impacthealth.co.in'
  };

  return (
    <div id="privacy-policy-page" className="w-full bg-[#F8FAFC] relative overflow-hidden font-sans text-[#0F172A]">
      <PageBackground variant="about" />

      {/* HERO */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#0066FF] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Last Updated: {lastUpdated}</span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#0B132B] tracking-[-0.03em] leading-tight">
              Privacy Policy
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
              Your privacy and data security are important to us.
            </p>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
            
            {/* TOC (desktop) */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <h2 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Table of Contents
                </h2>
                <nav ref={tocRef} aria-label="Privacy policy table of contents" className="space-y-1">
                  {toc.map((item) => (
                    <TocLink
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      isActive={activeId === item.id}
                      onClick={handleTocClick}
                    />
                  ))}
                </nav>
                <div className="pt-2">
                  <Callout icon="i" title="Important notice">
                    This page provides a high-level overview of how Impact Health handles your information.
                  </Callout>
                </div>
              </div>
            </aside>

            {/* Content + mobile toc */}
            <div className="lg:col-span-9">
              <div className="bezel-outer">
                <div className="bezel-inner p-6 sm:p-10 space-y-8">
                  
                  {/* Mobile TOC */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => setMobileOpen((v) => !v)}
                      aria-expanded={mobileOpen}
                      aria-controls="privacy-toc-panel"
                      className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-[#0B132B]"
                    >
                      <span>Table of Contents</span>
                      <span className="text-slate-500 font-normal">{mobileOpen ? 'Close' : 'Open'}</span>
                    </button>

                    {mobileOpen && (
                      <div id="privacy-toc-panel" className="mt-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm space-y-1">
                        {toc.map((item) => (
                          <TocLink
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            isActive={activeId === item.id}
                            onClick={handleTocClick}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <article className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    
                    <header className="space-y-2 border-b border-slate-100 pb-6">
                      <span className="text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider block">
                        Impact Health
                      </span>
                      <h2 className="text-2xl font-display font-bold text-[#0B132B]">
                        Privacy Policy
                      </h2>
                      <p className="text-slate-600">
                        At Impact Health, we are committed to protecting your privacy and ensuring the security of your personal information.
                      </p>
                    </header>

                    {/* 1. About Us */}
                    <section id="about-us" className="space-y-3">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">About Us</h3>
                      <p>
                        Impact Health is a healthcare platform operated by 3 PH Solutions LLP, providing accessible and high-quality healthcare services and patient support solutions.
                      </p>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <p className="font-bold text-[#0B132B]">Registered Office:</p>
                        <p className="text-slate-600">473/B1/P, Kokila Lane-4, Pokhariput, Bhubaneswar, Odisha - 751020, India</p>
                      </div>
                    </section>

                    {/* 2. Information We Collect */}
                    <section id="information-we-collect" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Information We Collect</h3>
                      <p>We may collect the following categories of information:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <h4 className="font-bold text-[#0B132B]">Personal Information</h4>
                          <ul className="list-disc pl-4 space-y-1 text-slate-600">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Postal address</li>
                            <li>Date of birth</li>
                            <li>Emergency contact details</li>
                          </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <h4 className="font-bold text-[#0B132B]">Healthcare Information</h4>
                          <ul className="list-disc pl-4 space-y-1 text-slate-600">
                            <li>Health-related information voluntarily provided by you</li>
                            <li>Consultation history</li>
                            <li>Service requests</li>
                            <li>Medical records shared through our platform</li>
                          </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2 space-y-2">
                          <h4 className="font-bold text-[#0B132B]">Technical Information</h4>
                          <ul className="list-disc pl-4 space-y-1 text-slate-600">
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>Operating system</li>
                            <li>Website usage statistics</li>
                            <li>Cookies and similar technologies</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* 3. How We Use Your Information */}
                    <section id="how-we-use" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">How We Use Your Information</h3>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                        <li>Provide healthcare and patient support services</li>
                        <li>Schedule consultations and appointments</li>
                        <li>Respond to inquiries and support requests</li>
                        <li>Improve our website and services</li>
                        <li>Personalize your user experience</li>
                        <li>Process transactions and payments</li>
                        <li>Send service-related notifications</li>
                        <li>Maintain security and prevent fraud</li>
                        <li>Comply with legal and regulatory obligations</li>
                      </ul>
                    </section>

                    {/* 4. Cookies and Analytics */}
                    <section id="cookies-and-analytics" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Cookies and Analytics</h3>
                      <p>
                        Our website may use cookies and analytics tools to improve functionality and understand visitor behavior.
                      </p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                        <li>Remember user preferences</li>
                        <li>Analyze website traffic</li>
                        <li>Improve website performance</li>
                        <li>Enhance user experience</li>
                      </ul>
                      <p className="text-slate-500 text-xs">
                        You may disable cookies through your browser settings, although some website features may not function properly.
                      </p>
                    </section>

                    {/* 5. Sharing of Information */}
                    <section id="sharing" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Sharing of Information</h3>
                      <Callout icon="✓" title="We don't sell personal information">
                        We do not sell your personal information.
                      </Callout>
                      <p className="pt-2">We may share information with:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <h4 className="font-bold text-[#0B132B]">Healthcare Service Providers</h4>
                          <p className="text-slate-600">Information necessary to provide healthcare services may be shared with authorized healthcare professionals and service partners.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <h4 className="font-bold text-[#0B132B]">Service Providers</h4>
                          <p className="text-slate-600">Trusted third-party vendors may assist with payment processing, website hosting, analytics, customer support, and communication services.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2 space-y-1">
                          <h4 className="font-bold text-[#0B132B]">Legal Requirements</h4>
                          <p className="text-slate-600">We may disclose information when required by law, court orders, government authorities, or to protect our legal rights and the safety of our users.</p>
                        </div>
                      </div>
                    </section>

                    {/* 6. Data Security */}
                    <section id="data-security" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Data Security</h3>
                      <p>
                        We implement reasonable administrative, technical, and organizational safeguards to protect your information against unauthorized access, loss, misuse, or disclosure.
                      </p>
                      <p>
                        While we strive to protect your information, no method of internet transmission or electronic storage can be guaranteed as completely secure.
                      </p>
                    </section>

                    {/* 7. Data Retention */}
                    <section id="data-retention" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Data Retention</h3>
                      <p>We retain personal information only for as long as necessary to:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                        <li>Provide our services</li>
                        <li>Comply with legal obligations</li>
                        <li>Resolve disputes</li>
                        <li>Enforce our agreements</li>
                      </ul>
                      <p>When information is no longer required, it is securely deleted or anonymized.</p>
                    </section>

                    {/* 8. Your Rights */}
                    <section id="your-rights" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Your Rights</h3>
                      <p>Subject to applicable laws, you may have the right to:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                        <li>Access your personal information</li>
                        <li>Request corrections to inaccurate information</li>
                        <li>Request deletion of personal information</li>
                        <li>Withdraw consent where applicable</li>
                        <li>Object to certain processing activities</li>
                      </ul>
                      <p>To exercise these rights, please contact us using the details provided below.</p>
                    </section>

                    {/* 9. Third-Party Websites */}
                    <section id="third-party-websites" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Third-Party Websites</h3>
                      <p>
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices, content, or policies of those websites. We encourage users to review the privacy policies of any third-party websites they visit.
                      </p>
                    </section>

                    {/* 10. Children's Privacy */}
                    <section id="childrens-privacy" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Children&apos;s Privacy</h3>
                      <p>
                        Our services for school health programs or minor patients are provided with appropriate consent from educational institutions, parents, or legal guardians in accordance with applicable laws.
                      </p>
                    </section>

                    {/* 11. Grievance Officer */}
                    <section id="grievance-officer" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Grievance Officer</h3>
                      <p>
                        In accordance with the Information Technology Act, 2000 and rules made thereunder, the contact details of the Grievance Officer are provided below:
                      </p>
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="font-bold text-[#0B132B]">{grievance.name}</p>
                        <p className="text-slate-600">{grievance.addressLines.join(', ')}</p>
                        <p className="text-slate-600 font-mono">Phone: {grievance.phone}</p>
                        <p className="text-slate-600">Email: <a href={`mailto:${grievance.email}`} className="text-[#0066FF] hover:underline">{grievance.email}</a></p>
                      </div>
                    </section>

                    {/* 12. Contact Us */}
                    <section id="contact-us" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Contact Us</h3>
                      <p>If you have any questions regarding this Privacy Policy, please contact us:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <p className="font-bold text-[#0B132B]">Email</p>
                          <a href={`mailto:${contactEmail}`} className="text-slate-600 hover:text-[#0066FF]">{contactEmail}</a>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <p className="font-bold text-[#0B132B]">Phone</p>
                          <a href={`tel:${contactPhone}`} className="text-slate-600 hover:text-[#0066FF] font-mono">{contactPhone}</a>
                        </div>
                      </div>
                    </section>

                    {/* 13. Changes to This Policy */}
                    <section id="changes-to-policy" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Changes to This Policy</h3>
                      <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. Any updates will be posted on this page with a revised &ldquo;Last Updated&rdquo; date. Continued use of our website after changes are posted constitutes acceptance of the updated Privacy Policy.
                      </p>
                    </section>

                    {/* 14. Governing Law */}
                    <section id="governing-law" className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-display font-bold text-[#0B132B]">Governing Law</h3>
                      <p>
                        This Privacy Policy shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from this Policy shall be subject to the jurisdiction of the competent courts in India.
                      </p>
                    </section>

                  </article>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
