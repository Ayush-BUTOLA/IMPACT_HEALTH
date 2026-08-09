import React, { useState } from 'react';
import { useAdminState } from '../../context/AdminStateContext';
import {
  Upload,
  Search,
  Grid,
  List,
  Eye,
  Trash2,
  Image as ImageIcon,
  Check,
  Loader2,
  FileText,
  Calendar,
  Layers,
  Copy
} from 'lucide-react';
import Modal from '../../components/Modal';
import ConfirmationDialog from '../../components/ConfirmationDialog';

export default function MediaLibrary() {
  const { mediaLibrary, addMediaItem, deleteMediaItem, triggerToast } = useAdminState();

  // State Variables
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isGridView, setIsGridView] = useState(true);
  
  // Simulated upload state
  const [uploadProgress, setUploadProgress] = useState(null); // null or percentage
  
  // Inspect Modal states
  const [inspectItem, setInspectItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // File Select Handler
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadFile(file);
    }
  };

  const uploadFile = (file) => {
    // Validate image format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      triggerToast("Unsupported format. Please select JPG, PNG, or WEBP.", "error");
      return;
    }

    // Simulate progress upload bar
    setUploadProgress(10);
    const intervals = [30, 55, 80, 100];
    
    intervals.forEach((prog, index) => {
      setTimeout(() => {
        setUploadProgress(prog);
        if (prog === 100) {
          setTimeout(() => {
            const objectUrl = URL.createObjectURL(file);
            const sizeKB = Math.round(file.size / 1024);
            addMediaItem({
              url: objectUrl,
              name: file.name,
              size: `${sizeKB > 1024 ? (sizeKB / 1024).toFixed(1) + ' MB' : sizeKB + ' KB'}`,
              type: file.type
            });
            setUploadProgress(null);
          }, 400);
        }
      }, (index + 1) * 400);
    });
  };

  // Actions
  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    triggerToast("Image source URL copied to clipboard!");
  };

  const handleDeleteConfirm = () => {
    if (deleteItemId) {
      deleteMediaItem(deleteItemId);
      if (inspectItem && inspectItem.id === deleteItemId) {
        setInspectItem(null);
      }
      setDeleteItemId(null);
    }
  };

  // Filter and Search logic
  const filteredMedia = mediaLibrary.filter((media) => {
    const matchesSearch = media.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || media.type.includes(filterType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 select-none animate-fade">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5A67F2]/10 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1D2A72]">Media Library</h2>
          <p className="text-xs text-slate-400 font-semibold">
            Upload and organize graphic assets for your article headers and inline blocks.
          </p>
        </div>

        {/* Upload Shortcut button */}
        <label className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1D2A72] text-white font-bold text-xs rounded-[14px] hover:opacity-90 active:scale-98 transition shadow-lg shadow-[#1D2A72]/15 cursor-pointer">
          <Upload className="w-4 h-4" />
          Upload Image
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />
        </label>
      </div>

      {/* Control panel (search, filter, view switcher) */}
      <div className="bg-white border border-[#5A67F2]/10 rounded-[20px] p-4 shadow-[0_8px_30px_rgba(29,42,114,0.02)] flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search media by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[14px] text-xs text-[#1D2A72] font-semibold outline-none focus:border-[#5A67F2] transition placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2.5">
          {/* Format filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2.5 bg-[#F8FAFF] border border-[#5A67F2]/10 rounded-[12px] text-xs font-semibold text-[#1D2A72] focus:outline-none focus:border-[#5A67F2] cursor-pointer"
          >
            <option value="all">All File Types</option>
            <option value="jpeg">JPG Images</option>
            <option value="png">PNG Images</option>
            <option value="webp">WEBP Images</option>
          </select>

          {/* Grid/List toggles */}
          <div className="flex items-center bg-[#F8FAFF] p-1 border border-[#5A67F2]/10 rounded-[10px]">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-1.5 rounded-[8px] transition cursor-pointer ${isGridView ? 'bg-[#1D2A72] text-white' : 'text-slate-400 hover:text-[#1D2A72]'}`}
              title="Grid Layout"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-1.5 rounded-[8px] transition cursor-pointer ${!isGridView ? 'bg-[#1D2A72] text-white' : 'text-slate-400 hover:text-[#1D2A72]'}`}
              title="List Layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Progress Bar (Visible when uploadProgress is not null) */}
      {uploadProgress !== null && (
        <div className="bg-white border border-[#5A67F2]/15 rounded-[18px] p-4 flex items-center gap-4 shadow-sm animate-pulse">
          <Loader2 className="w-5 h-5 text-[#5A67F2] animate-spin" />
          <div className="flex-1">
            <div className="flex justify-between items-center text-xs font-bold text-[#1D2A72] mb-1">
              <span>Uploading image file...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-[#5A67F2] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Media Grid / List */}
      {filteredMedia.length > 0 ? (
        isGridView ? (
          // Grid view
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredMedia.map((media) => (
              <div
                key={media.id}
                onClick={() => setInspectItem(media)}
                className="group bg-white border border-[#5A67F2]/10 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(29,42,114,0.01)] hover:shadow-md transition duration-200 cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-50 border-b border-slate-50 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={media.url}
                    alt={media.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-[#030050]/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectItem(media);
                      }}
                      className="p-2 bg-white rounded-xl text-[#1D2A72] shadow-sm hover:scale-105 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink(media.url);
                      }}
                      className="p-2 bg-white rounded-xl text-[#1D2A72] shadow-sm hover:scale-105 transition"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3.5 bg-white flex flex-col justify-between">
                  <p className="text-xs font-bold text-[#1D2A72] truncate">{media.name}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mt-1">
                    <span>{media.size}</span>
                    <span className="uppercase text-[8px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{media.type.split('/')[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List view
          <div className="bg-white border border-[#5A67F2]/10 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(29,42,114,0.02)]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-[#F8FAFF]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1D2A72] uppercase tracking-wider w-16">Preview</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1D2A72] uppercase tracking-wider">File Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1D2A72] uppercase tracking-wider">Format</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1D2A72] uppercase tracking-wider">Dimension</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1D2A72] uppercase tracking-wider">Size</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1D2A72] uppercase tracking-wider">Added Date</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-[#1D2A72] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-xs">
                  {filteredMedia.map((media) => (
                    <tr key={media.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => setInspectItem(media)}>
                      <td className="px-6 py-3">
                        <img src={media.url} alt="" className="w-12 h-9 object-cover rounded-[6px] border border-slate-100 shadow-sm" />
                      </td>
                      <td className="px-6 py-3 font-bold text-[#1D2A72]">{media.name}</td>
                      <td className="px-6 py-3 font-semibold text-slate-500 uppercase">{media.type.split('/')[1]}</td>
                      <td className="px-6 py-3 font-semibold text-slate-500">1200 × 630</td>
                      <td className="px-6 py-3 font-semibold text-slate-500">{media.size}</td>
                      <td className="px-6 py-3 font-bold text-slate-400">{media.date}</td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleCopyLink(media.url)}
                            className="p-1.5 rounded-[8px] text-slate-400 hover:text-[#1D2A72] hover:bg-slate-100 transition"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteItemId(media.id)}
                            className="p-1.5 rounded-[8px] text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <EmptyState
          title="No Media Assets Found"
          description="Try modifying your search text or upload some JPG/PNG/WEBP medical graphics."
        />
      )}

      {/* Inspect Item Details Modal */}
      <Modal
        isOpen={!!inspectItem}
        onClose={() => setInspectItem(null)}
        title="Asset Inspection"
        maxWidth="max-w-xl"
      >
        {inspectItem && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[4/3] bg-slate-50 border border-slate-100 rounded-[14px] overflow-hidden flex items-center justify-center">
              <img src={inspectItem.url} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">File Name</label>
                  <p className="text-xs font-bold text-[#1D2A72] truncate">{inspectItem.name}</p>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">File Type</label>
                  <p className="text-xs font-bold text-[#1D2A72] uppercase">{inspectItem.type}</p>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Storage Size</label>
                  <p className="text-xs font-bold text-[#1D2A72]">{inspectItem.size}</p>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Added Date</label>
                  <p className="text-xs font-bold text-slate-500">{inspectItem.date}</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleCopyLink(inspectItem.url)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold border border-[#5A67F2]/20 hover:bg-[#5A67F2]/5 rounded-[12px] text-[#5A67F2] transition cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  Copy Image Link
                </button>
                <button
                  onClick={() => setDeleteItemId(inspectItem.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 rounded-[12px] transition cursor-pointer border border-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Asset
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        isOpen={!!deleteItemId}
        onClose={() => setDeleteItemId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Media Asset"
        message="Are you sure you want to delete this asset? Any blogs currently referencing this URL will display a broken image placeholder."
      />
    </div>
  );
}
