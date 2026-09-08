import { useEffect, useMemo, useState } from 'react';
import { Shield, Mail, Phone, MapPin, Calendar } from 'lucide-react';

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
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Impact Health';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toc = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'information-we-collect', label: 'Information we collect' },
      { id: 'how-we-collect', label: 'How we collect information' },
      { id: 'use-of-information', label: 'Use of personal information' },
      { id: 'sharing-information', label: 'Sharing with third-parties' },
      { id: 'email-opt-out', label: 'Email Opt-Out' },
      { id: 'third-party-sites', label: 'Third party sites' },
      { id: 'grievance-officer', label: 'Grievance Officer' },
      { id: 'updates-to-policy', label: 'Updates to this policy' },
      { id: 'jurisdiction', label: 'Jurisdiction' }
    ],
    []
  );

  const activeId = useActiveSection(toc.map((t) => t.id));

  return (
    <div className="min-h-screen bg-[#FAFBFF] font-sans antialiased text-slate-700">
      {/* Top Header Banner */}
      <section className="pt-28 pb-14 bg-gradient-to-b from-[#ECECFE]/60 to-transparent border-b border-[#DDE0F5]/60">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDE0F5] shadow-xs text-xs font-semibold text-[#5A67F2] mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal &amp; Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#030050] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base font-semibold text-[#5A67F2] font-sans">
            This Privacy Policy applies to &lsquo;IMPACT HEALTH&rsquo;
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-sans">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Last updated on 17 .08. 2020</span>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sticky Navigation */}
      <section className="py-16 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="bg-white rounded-2xl p-6 border border-[#DDE0F5] shadow-sm">
              <h4 className="text-xs font-bold text-[#030050] uppercase tracking-wider mb-4 font-sans">
                Contents
              </h4>
              <nav className="flex flex-col gap-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block px-3 py-2 text-xs font-medium rounded-lg transition-colors font-sans ${
                      activeId === item.id
                        ? 'bg-[#ECECFE] text-[#030050] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-[#030050] hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Legal Document Content */}
          <main className="lg:col-span-8 space-y-12 bg-white p-8 sm:p-12 rounded-3xl border border-[#DDE0F5] shadow-xs">
            
            {/* Overview & Entity Info */}
            <article id="overview" className="space-y-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Impact Health recognizes the importance of maintaining your privacy. We value your privacy and appreciate your trust in us. This Policy describes how we treat user information we collect on <a href="http://www.impacthealth.co.in" className="text-[#5A67F2] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">http://www.impacthealth.co.in</a> and other offline sources. This Privacy Policy applies to current and former visitors to our website and to our online customers. By visiting and/or using our website, you agree to this Privacy Policy.
              </p>
              <div className="p-5 rounded-2xl bg-[#F8F9FF] border border-[#DDE0F5] text-sm text-slate-700 leading-relaxed font-sans">
                <span className="font-bold text-[#030050] block mb-1">Company Registration</span>
                Impact Health is a property of 3 PH Solutions LLP, an Indian Limited Liability Partnership firm registered under the section 12(1) of the Limited Liability Partnership Act, 2008 having its registered office at 473/B1/P, Kokila Lane 4, Pokhariput, Bhubaneswar, Khordha, Odisha – 751 020
              </div>
            </article>

            {/* Information We Collect */}
            <article id="information-we-collect" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                Information we collect
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">Contact information.</strong> We might collect your name, email, mobile number, phone number, street, city, state, pin code, country and IP address.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">Payment and billing information.</strong> We might collect your billing name, billing address and payment method when you purchase a service. We NEVER collect your credit card number or credit card expiry date or other details pertaining to your credit card on our website. Credit card information will be obtained and processed by our online payment partner CC Avenue.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">Information you post.</strong> We collect information you post in a public space on our website or on a third-party social media site belonging to &lsquo;www.impacthealth.co.in&rsquo; or &lsquo;Impact Health&rsquo;
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">Demographic information.</strong> We may collect demographic information about you, your reviews on portal, frequency of you consultations, other related services or any other information provided by you during the use of our website. We might collect this as a part of a survey also.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">Other information.</strong> If you use our website, we may collect information about your IP address and the browser you’re using. We might look at what site you came from, duration of time spent on our website, pages accessed or what site you visit when you leave us. We might also collect the type of mobile device you are using, or the version of the operating system your computer or device is running.
              </p>
            </article>

            {/* How We Collect Information */}
            <article id="how-we-collect" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                We collect information in different ways.
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We collect information directly from you.</strong> We collect information directly from you when you register or sign up for our services or when you subscribe to our newsletter. We also collect information if you post a comment on our websites or ask us a question through phone or email.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We collect information from you passively.</strong> We use tracking tools like Google Analytics, Google Webmaster, browser cookies and web beacons for collecting information about your usage of our website.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We get information about you from third parties.</strong> For example, if you use an integrated social media feature on our websites. The third-party social media site will give us certain information about you. This could include your name and email address.
              </p>
            </article>

            {/* Use of Your Personal Information */}
            <article id="use-of-information" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                Use of your personal information
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We use information to contact you:</strong> We might use the information you provide to contact you for confirmation of a purchase on our website or for other promotional purposes.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We use information to respond to your requests or questions.</strong> We might use your information to confirm your registration for a service or anything as such.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We use information to improve our products and services.</strong> We might use your information to customize your experience with us. This could include displaying content based upon your preferences.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We use information to look at site trends and customer interests.</strong> We may use your information to make our website and products &amp; service offerings better. We may combine information we get from you with information about you we get from third parties.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We use information for security purposes.</strong> We may use information to protect our company, our customers, or our websites.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We use information for marketing purposes.</strong> We might send you information about special promotions or offers. We might also tell you about new features or products. These might be our own offers or products, or third-party offers or products we think you might find interesting.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We use information to send you transactional communications.</strong> We might send you emails or SMS about your account or a service purchased.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We use information as otherwise permitted by law.</strong>
              </p>
            </article>

            {/* Sharing of Information with Third-Parties */}
            <article id="sharing-information" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                Sharing of information with third-parties
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We will share information with third parties who perform services on our behalf.</strong> We share information with vendors who help us manage our online registration process or payment processors or transactional message processors. Some vendors may be located outside of India.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We will share information with the Healthcare Service Providers.</strong> We share your information with the healthcare service providers and other parties responsible for fulfilling the purchased service obligation. The healthcare service providers and other parties may use the information we give them as described in their privacy policies.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <strong className="text-[#030050] font-semibold">We may share information if we think we have to in order to comply with the law or to protect ourselves.</strong> We will share information to respond to a court order or subpoena. We may also share it if a government agency or investigatory body requests. Or, we might also share information when we are investigating potential fraud.
              </p>
            </article>

            {/* Email Opt-Out */}
            <article id="email-opt-out" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                Email Opt-Out
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                You can opt out of receiving our marketing emails. To stop receiving our promotional emails, please email <a href="mailto:unsubscriber@impacthealth.co.in" className="text-[#5A67F2] font-semibold hover:underline">unsubscriber@impacthealth.co.in</a>. It may take about ten days to process your request. Even if you opt out of getting marketing messages, we will still be sending you transactional messages through email and SMS about your purchases.
              </p>
            </article>

            {/* Third Party Sites */}
            <article id="third-party-sites" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                Third party sites
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                If you click on one of the links to third party websites, you may be taken to websites we do not control. This policy does not apply to the privacy practices of those websites. Read the privacy policy of other websites carefully. We are not responsible for these third party sites.
              </p>
            </article>

            {/* Grievance Officer */}
            <article id="grievance-officer" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                Grievance Officer
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:
              </p>

              <div className="p-6 rounded-2xl bg-[#F8F9FF] border border-[#DDE0F5] space-y-3 font-sans text-sm text-slate-700">
                <p className="font-bold text-[#030050] text-base">Mr. Ashish Rawat</p>
                <div className="flex items-start gap-2.5 text-slate-600">
                  <MapPin className="w-4 h-4 text-[#5A67F2] shrink-0 mt-0.5" />
                  <div>
                    <p>Mayur Vihar, Phase 3, New Delhi</p>
                    <p>New Delhi- 110020</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 pt-1">
                  <Phone className="w-4 h-4 text-[#5A67F2] shrink-0" />
                  <a href="tel:+919650980089" className="hover:text-[#030050] font-medium transition-colors">
                    +91 9650980089
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Mail className="w-4 h-4 text-[#5A67F2] shrink-0" />
                  <a href="mailto:ashish.rawat@impacthealth.co.in" className="hover:text-[#030050] font-medium transition-colors">
                    ashish.rawat@impacthealth.co.in
                  </a>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                If you have any questions about this Policy or other privacy concerns, you can also email us at <a href="mailto:connect@impacthealth.co.in" className="text-[#5A67F2] font-semibold hover:underline">connect@impacthealth.co.in</a>
              </p>
            </article>

            {/* Updates to This Policy */}
            <article id="updates-to-policy" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                Updates to this policy
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                This Privacy Policy was last updated on 17 .08. 2020. From time to time we may change our privacy practices. We will notify you of any material changes to this policy as required by law. We will also post an updated copy on our website. Please check our site periodically for updates.
              </p>
            </article>

            {/* Jurisdiction */}
            <article id="jurisdiction" className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#030050]">
                Jurisdiction
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                If you choose to visit the website, your visit and any dispute over privacy is subject to this Policy and the website’s terms of use. In addition to the foregoing, any disputes arising under this Policy shall be governed by the laws of India.
              </p>
            </article>

          </main>
        </div>
      </section>
    </div>
  );
}
