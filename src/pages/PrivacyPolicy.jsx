import { useEffect, useMemo, useRef, useState } from 'react';
import { Phone, Mail, Shield, CalendarDays } from 'lucide-react';

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
                'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive ? 'bg-[#ECECFE]/90 text-[#030050]' : 'text-text-secondary hover:text-[#030050] hover:bg-[#F8F9FF]'
            ].join(' ')}
            aria-current={isActive ? 'location' : undefined}
        >
            {label}
        </a>
    );
}

function Callout({ icon, title, children }) {
    return (
        <div className="rounded-2xl border border-[#DDE0F5]/70 bg-[#F8F9FF] p-5 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 w-10 h-10 rounded-xl bg-[#ECECFE]/90 flex items-center justify-center text-[#030050]">
                    {icon}
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm md:text-[15px] font-display font-bold text-[#030050]">
                        {title}
                    </h3>
                    <div className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
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

    const handleTocClick = (e) => {
        // Smooth scrolling handled by CSS; close mobile panel after click.
        if (window.innerWidth < 768) setMobileOpen(false);
        // Keep default anchor behavior.
    };

    const contactEmail = 'connect@impacthealth.co.in';
    const contactPhone = '+91 7008492909';
    const contactWebsite = 'www.impacthealth.co.in';

    const grievance = {
        name: 'Ashish Rawat',
        addressLines: ['Mayur Vihar Phase III', 'New Delhi – 110096, India'],
        phone: '+91 9650980089',
        email: 'ashish.rawat@impacthealth.co.in'
    };

    return (
        <div id="privacy-policy-page" className="w-full bg-white relative overflow-hidden">
            {/* HERO */}
            <section
                className="relative py-16 md:py-20 border-b border-[#DDE0F5]/50 overflow-hidden text-center min-h-[360px] flex items-center justify-center"
                aria-label="Privacy policy hero"
                style={{
                    backgroundImage:
                        'linear-gradient(to bottom, rgba(30,27,91,0.92), rgba(30,27,91,0.72)), url("https://images.unsplash.com/photo-1580281658628-4b7a7a3a1f3b?q=80&w=1600")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-5">
                    <div className="inline-flex items-center justify-center bg-white/10 border border-white/15 rounded-full px-6 py-2 shadow-sm">
                        <CalendarDays className="w-4 h-4 text-white/80" aria-hidden="true" />
                        <span className="ml-2 text-white/90 text-[11px] md:text-xs font-semibold font-sans">
                            Last Updated: {lastUpdated}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-[2.9rem] font-display font-bold text-white tracking-tight leading-tight">
                        Privacy Policy
                    </h1>

                    <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-2xl mx-auto font-sans">
                        Your privacy and data security are important to us.
                    </p>

                    <div className="pt-2 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-white/90 text-xs font-semibold font-sans">
                            <Shield className="w-4 h-4 text-white/80" aria-hidden="true" />
                            Trusted healthcare data practices
                        </span>
                    </div>
                </div>
            </section>

            {/* BODY */}
            <section className="py-14 md:py-18">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* TOC (desktop) */}
                        <aside className="lg:col-span-3 hidden lg:block">
                            <div className="sticky top-24">
                                <h2 className="text-xs font-bold tracking-[0.15em] text-[#030050]/80 uppercase font-sans mb-4">
                                    Table of Contents
                                </h2>
                                <nav ref={tocRef} aria-label="Privacy policy table of contents" className="space-y-2">
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
                                <div className="mt-6">
                                    <Callout
                                        icon={<span className="text-[#030050] font-black text-lg">i</span>}
                                        title="Important notice"
                                    >
                                        This page provides a high-level overview of how Impact Health handles your information.
                                    </Callout>
                                </div>
                            </div>
                        </aside>

                        {/* Content + mobile toc */}
                        <div className="lg:col-span-9">
                            {/* Content container */}
                            <div className="bg-white rounded-3xl border border-[#DDE0F5]/70 shadow-ambient p-6 md:p-8">
                                {/* Mobile TOC */}
                                <div className="lg:hidden mb-5">
                                    <button
                                        type="button"
                                        onClick={() => setMobileOpen((v) => !v)}
                                        aria-expanded={mobileOpen}
                                        aria-controls="privacy-toc-panel"
                                        className="w-full flex items-center justify-between rounded-2xl border border-[#DDE0F5]/70 bg-[#F8F9FF] px-4 py-3"
                                    >
                                        <span className="text-sm font-bold text-[#030050] font-display">Table of Contents</span>
                                        <span className="text-xs font-semibold text-text-secondary">
                                            {mobileOpen ? 'Close' : 'Open'}
                                        </span>
                                    </button>

                                    {mobileOpen && (
                                        <div
                                            id="privacy-toc-panel"
                                            className="mt-3 rounded-2xl border border-[#DDE0F5]/70 bg-white p-2 shadow-sm"
                                        >
                                            <nav aria-label="Privacy policy table of contents (mobile)" className="space-y-1">
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
                                        </div>
                                    )}
                                </div>

                                {/* About Us */}
                                <article>
                                    <header className="mb-7">
                                        <p className="text-xs font-bold text-[#7e82f4] uppercase tracking-widest font-sans">
                                            Impact Health
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-display font-bold text-[#030050]">
                                            Privacy Policy
                                        </h2>
                                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans mt-3">
                                            At Impact Health, we are committed to protecting your privacy and ensuring the security of your personal information.
                                        </p>
                                    </header>

                                    <div className="space-y-8">
                                        {/* Section helpers */}
                                        <section id="about-us" aria-labelledby="about-us-h2">
                                            <h3 id="about-us-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                About Us
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                Impact Health is a healthcare platform operated by 3 PH Solutions LLP, providing accessible and high-quality healthcare services and patient support solutions.
                                            </p>

                                            <div className="mt-4 rounded-2xl border border-[#DDE0F5]/70 bg-[#F8F9FF] p-4">
                                                <p className="text-xs font-bold text-[#030050] font-sans">Registered Office:</p>
                                                <p className="text-xs text-text-secondary leading-relaxed font-sans mt-1">
                                                    473/B1/P, Kokila Lane-4, Pokhariput, Bhubaneswar, Odisha – 751020, India
                                                </p>
                                            </div>
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="information-we-collect" aria-labelledby="info-h2">
                                            <h3 id="info-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Information We Collect
                                            </h3>

                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                We may collect the following categories of information:
                                            </p>

                                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="rounded-2xl border border-[#DDE0F5]/70 bg-white p-4">
                                                    <h4 className="text-sm font-display font-bold text-[#030050] mb-2">Personal Information</h4>
                                                    <ul className="text-xs text-text-secondary leading-relaxed font-sans space-y-1 list-disc pl-5">
                                                        <li>Full name</li>
                                                        <li>Email address</li>
                                                        <li>Phone number</li>
                                                        <li>Postal address</li>
                                                        <li>Date of birth</li>
                                                        <li>Emergency contact details</li>
                                                    </ul>
                                                </div>

                                                <div className="rounded-2xl border border-[#DDE0F5]/70 bg-white p-4">
                                                    <h4 className="text-sm font-display font-bold text-[#030050] mb-2">Healthcare Information</h4>
                                                    <ul className="text-xs text-text-secondary leading-relaxed font-sans space-y-1 list-disc pl-5">
                                                        <li>Health-related information voluntarily provided by you</li>
                                                        <li>Consultation history</li>
                                                        <li>Service requests</li>
                                                        <li>Medical records shared through our platform</li>
                                                    </ul>
                                                </div>

                                                <div className="rounded-2xl border border-[#DDE0F5]/70 bg-white p-4 md:col-span-2">
                                                    <h4 className="text-sm font-display font-bold text-[#030050] mb-2">Technical Information</h4>
                                                    <ul className="text-xs text-text-secondary leading-relaxed font-sans space-y-1 list-disc pl-5">
                                                        <li>IP address</li>
                                                        <li>Browser type and version</li>
                                                        <li>Device information</li>
                                                        <li>Operating system</li>
                                                        <li>Website usage statistics</li>
                                                        <li>Cookies and similar technologies</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="how-we-use" aria-labelledby="use-h2">
                                            <h3 id="use-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                How We Use Your Information
                                            </h3>
                                            <ul className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans space-y-2 list-disc pl-5">
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
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="cookies-and-analytics" aria-labelledby="cookies-h2">
                                            <h3 id="cookies-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Cookies and Analytics
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                Our website may use cookies and analytics tools to improve functionality and understand visitor behavior.
                                            </p>
                                            <ul className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans space-y-2 list-disc pl-5 mt-4">
                                                <li>Remember user preferences</li>
                                                <li>Analyze website traffic</li>
                                                <li>Improve website performance</li>
                                                <li>Enhance user experience</li>
                                            </ul>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans mt-4">
                                                You may disable cookies through your browser settings, although some website features may not function properly.
                                            </p>
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="sharing" aria-labelledby="sharing-h2">
                                            <h3 id="sharing-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Sharing of Information
                                            </h3>

                                            <Callout
                                                icon={<span className="font-black text-[#030050]">✓</span>}
                                                title="We don’t sell personal information"
                                            >
                                                We do not sell your personal information.
                                            </Callout>

                                            <div className="mt-5">
                                                <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                    We may share information with:
                                                </p>

                                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="rounded-2xl border border-[#DDE0F5]/70 bg-white p-4">
                                                        <h4 className="text-sm font-display font-bold text-[#030050] mb-2">Healthcare Service Providers</h4>
                                                        <p className="text-xs text-text-secondary leading-relaxed font-sans">
                                                            Information necessary to provide healthcare services may be shared with authorized healthcare professionals and service partners.
                                                        </p>
                                                    </div>

                                                    <div className="rounded-2xl border border-[#DDE0F5]/70 bg-white p-4">
                                                        <h4 className="text-sm font-display font-bold text-[#030050] mb-2">Service Providers</h4>
                                                        <p className="text-xs text-text-secondary leading-relaxed font-sans">
                                                            Trusted third-party vendors may assist with payment processing, website hosting, analytics, customer support, and communication services.
                                                        </p>
                                                    </div>

                                                    <div className="rounded-2xl border border-[#DDE0F5]/70 bg-white p-4 md:col-span-2">
                                                        <h4 className="text-sm font-display font-bold text-[#030050] mb-2">Legal Requirements</h4>
                                                        <p className="text-xs text-text-secondary leading-relaxed font-sans">
                                                            We may disclose information when required by law, court orders, government authorities, or to protect our legal rights and the safety of our users.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="data-security" aria-labelledby="security-h2">
                                            <h3 id="security-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Data Security
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                We implement reasonable administrative, technical, and organizational safeguards to protect your information against unauthorized access, loss, misuse, or disclosure.
                                            </p>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans mt-4">
                                                While we strive to protect your information, no method of internet transmission or electronic storage can be guaranteed as completely secure.
                                            </p>
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="data-retention" aria-labelledby="retention-h2">
                                            <h3 id="retention-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Data Retention
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                We retain personal information only for as long as necessary to:
                                            </p>
                                            <ul className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans space-y-2 list-disc pl-5 mt-4">
                                                <li>Provide our services</li>
                                                <li>Comply with legal obligations</li>
                                                <li>Resolve disputes</li>
                                                <li>Enforce our agreements</li>
                                            </ul>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans mt-4">
                                                When information is no longer required, it is securely deleted or anonymized.
                                            </p>
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="your-rights" aria-labelledby="rights-h2">
                                            <h3 id="rights-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Your Rights
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                Subject to applicable laws, you may have the right to:
                                            </p>
                                            <ul className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans space-y-2 list-disc pl-5 mt-4">
                                                <li>Access your personal information</li>
                                                <li>Request corrections to inaccurate information</li>
                                                <li>Request deletion of personal information</li>
                                                <li>Withdraw consent where applicable</li>
                                                <li>Object to certain processing activities</li>
                                            </ul>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans mt-4">
                                                To exercise these rights, please contact us using the details provided below.
                                            </p>
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="third-party-websites" aria-labelledby="third-h2">
                                            <h3 id="third-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Third-Party Websites
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                Our website may contain links to third-party websites. We are not responsible for the privacy practices, content, or policies of those websites. We encourage users to review the privacy policies of any third-party websites they visit.
                                            </p>
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="childrens-privacy" aria-labelledby="kids-h2">
                                            <h3 id="kids-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Children&apos;s Privacy
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                Our services are not intended for children without parental or guardian supervision. We do not knowingly collect personal information from minors in violation of applicable laws.
                                            </p>
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="grievance-officer" aria-labelledby="grievance-h2">
                                            <h3 id="grievance-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Grievance Officer
                                            </h3>

                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                For questions, concerns, or complaints regarding this Privacy Policy or your personal information, please contact:
                                            </p>

                                            <div className="mt-5 rounded-3xl border border-[#DDE0F5]/70 bg-white p-6 shadow-sm">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-[#ECECFE]/90 flex items-center justify-center text-[#030050]">
                                                        <Shield className="w-6 h-6" aria-hidden="true" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-display font-bold text-[#030050]">{grievance.name}</h4>
                                                        <p className="text-xs text-text-secondary leading-relaxed font-sans">
                                                            {grievance.addressLines.map((line, idx) => (
                                                                <span key={idx}>
                                                                    {line}
                                                                    <br />
                                                                </span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-[#F8F9FF] border border-[#DDE0F5]/70 flex items-center justify-center">
                                                            <Phone className="w-4 h-4 text-[#030050]" aria-hidden="true" />
                                                        </div>
                                                        <a className="text-xs font-sans font-medium text-text-secondary hover:text-primary transition-colors" href={`tel:${grievance.phone}`}>
                                                            {grievance.phone}
                                                        </a>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-[#F8F9FF] border border-[#DDE0F5]/70 flex items-center justify-center">
                                                            <Mail className="w-4 h-4 text-[#030050]" aria-hidden="true" />
                                                        </div>
                                                        <a className="text-xs font-sans font-medium text-text-secondary hover:text-primary transition-colors" href={`mailto:${grievance.email}`}>
                                                            {grievance.email}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="contact-us" aria-labelledby="contact-h2">
                                            <h3 id="contact-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Contact Us
                                            </h3>

                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                If you have any questions regarding this Privacy Policy, please contact us:
                                            </p>

                                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="rounded-3xl border border-[#DDE0F5]/70 bg-white p-5 shadow-sm">
                                                    <h4 className="text-sm font-display font-bold text-[#030050] mb-3">Email</h4>
                                                    <a
                                                        className="inline-flex items-center gap-2 text-xs font-sans font-medium text-text-secondary hover:text-primary transition-colors"
                                                        href={`mailto:${contactEmail}`}
                                                    >
                                                        <Mail className="w-4 h-4" aria-hidden="true" />
                                                        {contactEmail}
                                                    </a>
                                                </div>

                                                <div className="rounded-3xl border border-[#DDE0F5]/70 bg-white p-5 shadow-sm">
                                                    <h4 className="text-sm font-display font-bold text-[#030050] mb-3">Phone</h4>
                                                    <a
                                                        className="inline-flex items-center gap-2 text-xs font-sans font-medium text-text-secondary hover:text-primary transition-colors"
                                                        href={`tel:${contactPhone}`}
                                                    >
                                                        <Phone className="w-4 h-4" aria-hidden="true" />
                                                        {contactPhone}
                                                    </a>
                                                </div>

                                                <div className="rounded-3xl border border-[#DDE0F5]/70 bg-white p-5 shadow-sm md:col-span-2">
                                                    <h4 className="text-sm font-display font-bold text-[#030050] mb-3">Website</h4>
                                                    <a
                                                        className="text-xs font-sans font-medium text-text-secondary hover:text-primary transition-colors"
                                                        href={`https://${contactWebsite}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {contactWebsite}
                                                    </a>
                                                </div>
                                            </div>

                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="changes-to-policy" aria-labelledby="changes-h2">
                                            <h3 id="changes-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Changes to This Policy
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements.
                                            </p>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans mt-4">
                                                Any updates will be posted on this page with a revised "Last Updated" date. Continued use of our website after changes are posted constitutes acceptance of the updated Privacy Policy.
                                            </p>
                                            <hr className="border-[#DDE0F5] mt-8" />
                                        </section>

                                        <section id="governing-law" aria-labelledby="law-h2">
                                            <h3 id="law-h2" className="text-xl md:text-2xl font-display font-bold text-[#030050] mb-4">
                                                Governing Law
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                                                This Privacy Policy shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from this Policy shall be subject to the jurisdiction of the competent courts in India.
                                            </p>
                                        </section>
                                    </div>
                                </article>

                                {/* Footer divider space */}
                                <div className="mt-10">
                                    <div className="rounded-3xl bg-[#030050] p-6 md:p-8 text-left text-white shadow-ambient">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                            <div className="md:col-span-8 space-y-2">
                                                <p className="text-xs font-bold text-[#7e82f4] uppercase tracking-widest font-sans">
                                                    Questions About Your Privacy?
                                                </p>
                                                <h2 className="text-xl md:text-2xl font-display font-bold leading-tight">
                                                    Questions About Your Privacy?
                                                </h2>
                                                <p className="text-sm text-white/85 leading-relaxed font-sans">
                                                    Contact our team for assistance and privacy-related concerns.
                                                </p>
                                            </div>
                                            <div className="md:col-span-4 flex justify-start md:justify-end">
                                                <a
                                                    href="/contact"
                                                    className="inline-flex items-center justify-center rounded-full bg-[#E11D48] px-6 py-3 text-xs font-sans font-bold hover:bg-[#BE123C] transition-colors shadow-md"
                                                >
                                                    Contact
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* End container */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
