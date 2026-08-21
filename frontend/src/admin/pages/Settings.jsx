import React, { useState } from 'react';
import { useAdminState } from '../../context/AdminStateContext';
import { Settings as SettingsIcon, Shield, Layers, HelpCircle, Save } from 'lucide-react';
import ImageUploader from '../../components/ImageUploader';

export default function Settings() {
  const { settings, categories, updateSettings } = useAdminState();

  // Tab State: 'general' | 'features'
  const [activeTab, setActiveTab] = useState('general');

  // Form States
  const [author, setAuthor] = useState(settings.defaultAuthor);
  const [category, setCategory] = useState(settings.defaultCategory);
  const [banner, setBanner] = useState(settings.blogBanner);

  // Toggle States
  const [newsletter, setNewsletter] = useState(settings.newsletterToggle);
  const [comments, setComments] = useState(settings.commentsToggle);
  const [social, setSocial] = useState(settings.socialSharingToggle);
  const [theme, setTheme] = useState(settings.themePreference);

  // Submit Handler
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings({
      defaultAuthor: author,
      defaultCategory: category,
      blogBanner: banner,
      newsletterToggle: newsletter,
      commentsToggle: comments,
      socialSharingToggle: social,
      themePreference: theme
    });
  };

  const ToggleRow = ({ label, description, value, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-[#F8FAFF] rounded-[18px] border border-[#5A67F2]/5">
      <div className="space-y-0.5 pr-4">
        <span className="text-xs font-bold text-[#1D2A72] block">{label}</span>
        <span className="text-[10px] text-slate-400 font-semibold block leading-relaxed">{description}</span>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-11 h-6.5 rounded-full transition-colors relative focus:outline-none flex-shrink-0 cursor-pointer ${
          value ? 'bg-[#35C76F]' : 'bg-slate-200'
        }`}
      >
        <span
          className={`w-5 h-5 bg-white rounded-full absolute top-0.75 left-0.75 transition-transform ${
            value ? 'translate-x-4.5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 select-none animate-fade">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5A67F2]/10 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1D2A72] flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-[#5A67F2]" />
            System Preferences
          </h2>
          <p className="text-xs text-slate-400 font-semibold">
            Customize editorial defaults and configure portal toggles.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#1D2A72] text-white font-bold text-xs rounded-[14px] hover:opacity-90 active:scale-98 transition shadow-lg shadow-[#1D2A72]/15 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 bg-white border border-[#5A67F2]/10 rounded-[24px] p-4 shadow-[0_8px_30px_rgba(29,42,114,0.02)] space-y-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-4 py-3 rounded-[14px] text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'general'
                ? 'bg-gradient-to-r from-[#1D2A72] to-[#1D2A72]/90 text-white shadow-md'
                : 'text-slate-500 hover:bg-[#F8FAFF] hover:text-[#1D2A72]'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            General Editor
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`w-full text-left px-4 py-3 rounded-[14px] text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'features'
                ? 'bg-gradient-to-r from-[#1D2A72] to-[#1D2A72]/90 text-white shadow-md'
                : 'text-slate-500 hover:bg-[#F8FAFF] hover:text-[#1D2A72]'
            }`}
          >
            <Shield className="w-4 h-4" />
            Portal Features
          </button>
        </div>

        {/* Tab Forms */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSaveSettings} className="bg-white border border-[#5A67F2]/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(29,42,114,0.02)]">
            {activeTab === 'general' ? (
              // GENERAL SETTINGS TAB
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-[#1D2A72]">Editorial Defaults</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Pre-fill parameters automatically for new articles.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Default Author */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                      Default Author Signature
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] font-semibold outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Default Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2A72] mb-1.5">
                      Default Category Folder
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-sm text-[#1D2A72] font-semibold focus:outline-none focus:border-[#5A67F2] cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Default Banner Asset */}
                  <div className="md:col-span-2">
                    <ImageUploader
                      value={banner}
                      onChange={setBanner}
                      label="Fallback Article Banner Image"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // PORTAL FEATURES TAB
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-[#1D2A72]">Portal Features & Modules</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Configure client-side integrations and rendering widgets.</p>
                </div>

                <div className="space-y-4">
                  {/* Newsletter */}
                  <ToggleRow
                    label="Newsletter Signup Box"
                    description="Display the newsletter subscription band below published blogs."
                    value={newsletter}
                    onChange={setNewsletter}
                  />

                  {/* Comments */}
                  <ToggleRow
                    label="Enable Reader Comments"
                    description="Allow patients to comment and participate in discussions under articles."
                    value={comments}
                    onChange={setComments}
                  />

                  {/* Social sharing */}
                  <ToggleRow
                    label="Social Share Panel"
                    description="Render quick buttons to share articles on LinkedIn, Twitter, and email."
                    value={social}
                    onChange={setSocial}
                  />

                  {/* Theme preferences (UI mockup) */}
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFF] rounded-[18px] border border-[#5A67F2]/5">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-[#1D2A72] block">Default UI Skin</span>
                      <span className="text-[10px] text-slate-400 font-semibold block">Set dark / light UI accent modes (UI only).</span>
                    </div>
                    <div className="flex bg-slate-200 p-1 rounded-[10px] border border-slate-300">
                      {['light', 'dark'].map((skin) => (
                        <button
                          key={skin}
                          type="button"
                          onClick={() => setTheme(skin)}
                          className={`px-3 py-1.5 text-[10px] font-bold rounded-[8px] uppercase transition cursor-pointer ${
                            theme === skin
                              ? 'bg-[#1D2A72] text-white shadow-sm'
                              : 'text-slate-500 hover:text-[#1D2A72]'
                          }`}
                        >
                          {skin}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
