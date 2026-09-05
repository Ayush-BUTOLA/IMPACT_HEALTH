import React, { createContext, useContext, useState } from 'react';
import { dummyBlogs } from '../data/dummyBlogs';

const AdminStateContext = createContext(null);

export const ADMIN_CREDENTIALS = {
  email: "admin001@admin.co.in",
  password: "admin111"
};

export const useAdminState = () => {
  const context = useContext(AdminStateContext);
  if (!context) {
    throw new Error('useAdminState must be used within an AdminStateProvider');
  }
  return context;
};

export const AdminStateProvider = ({ children }) => {
  // Admin authentication state (synced with localStorage for session persistence)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem("ih_admin_auth") === "true";
    } catch {
      return false;
    }
  });

  // Main blogs state (includes published, draft, archived)
  const [blogs, setBlogs] = useState(dummyBlogs);
  
  // Categories state
  const [categories, setCategories] = useState([
    "Disease & Diagnosis",
    "Management",
    "Nutrition",
    "Mental Health",
    "Research",
    "Wellness"
  ]);

  // Media Library state
  const [mediaLibrary, setMediaLibrary] = useState([
    {
      id: "media-1",
      url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80",
      name: "cardiovascular-disease.jpg",
      size: "245 KB",
      date: "2026-06-15",
      type: "image/jpeg"
    },
    {
      id: "media-2",
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      name: "glucose-monitoring.jpg",
      size: "185 KB",
      date: "2026-06-20",
      type: "image/jpeg"
    },
    {
      id: "media-3",
      url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
      name: "anti-inflammatory-food.jpg",
      size: "312 KB",
      date: "2026-06-25",
      type: "image/jpeg"
    },
    {
      id: "media-4",
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      name: "stress-meditation.jpg",
      size: "128 KB",
      date: "2026-06-28",
      type: "image/jpeg"
    },
    {
      id: "media-5",
      url: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80",
      name: "immunotherapy-research.jpg",
      size: "420 KB",
      date: "2026-07-01",
      type: "image/jpeg"
    },
    {
      id: "media-6",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      name: "geriatric-exercise.jpg",
      size: "295 KB",
      date: "2026-07-02",
      type: "image/jpeg"
    },
    {
      id: "media-7",
      url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
      name: "thyroid-testing.jpg",
      size: "210 KB",
      date: "2026-07-03",
      type: "image/jpeg"
    },
    {
      id: "media-8",
      url: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80",
      name: "telemedicine-setup.jpg",
      size: "165 KB",
      date: "2026-07-02",
      type: "image/jpeg"
    }
  ]);

  // Settings state
  const [settings, setSettings] = useState({
    defaultAuthor: "Dr. Elena Rostova",
    defaultCategory: "Disease & Diagnosis",
    blogBanner: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    newsletterToggle: true,
    commentsToggle: false,
    socialSharingToggle: true,
    themePreference: "light"
  });

  // Edit buffer state
  const [blogToEdit, setBlogToEdit] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Toast actions
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Blog CRUD actions
  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: `blog-${Date.now()}`,
      views: 0,
      publishedDate: blog.status === 'published' ? new Date().toISOString().split('T')[0] : '',
      lastEdited: new Date().toISOString().split('T')[0]
    };
    setBlogs(prev => [newBlog, ...prev]);
    triggerToast("Blog created successfully!");
    return newBlog;
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(prev => prev.map(b => b.id === updatedBlog.id ? {
      ...updatedBlog,
      lastEdited: new Date().toISOString().split('T')[0],
      publishedDate: (updatedBlog.status === 'published' && !b.publishedDate) 
        ? new Date().toISOString().split('T')[0] 
        : b.publishedDate
    } : b));
    triggerToast("Blog updated successfully!");
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    triggerToast("Blog deleted successfully!", "warning");
  };

  const duplicateBlog = (id) => {
    const sourceBlog = blogs.find(b => b.id === id);
    if (!sourceBlog) return;

    const duplicated = {
      ...sourceBlog,
      id: `blog-${Date.now()}`,
      title: `${sourceBlog.title} (Copy)`,
      slug: `${sourceBlog.slug}-copy`,
      views: 0,
      status: "draft",
      publishedDate: "",
      lastEdited: new Date().toISOString().split('T')[0]
    };

    setBlogs(prev => [duplicated, ...prev]);
    triggerToast("Blog duplicated as draft!");
  };

  // Category Actions
  const addCategory = (categoryName) => {
    if (!categoryName.trim()) return;
    if (categories.includes(categoryName)) {
      triggerToast("Category already exists!", "error");
      return;
    }
    setCategories(prev => [...prev, categoryName.trim()]);
    triggerToast("Category added successfully!");
  };

  const deleteCategory = (categoryName) => {
    setCategories(prev => prev.filter(c => c !== categoryName));
    triggerToast("Category deleted successfully!", "warning");
  };

  // Media Actions
  const addMediaItem = (item) => {
    const newItem = {
      ...item,
      id: `media-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setMediaLibrary(prev => [newItem, ...prev]);
    triggerToast("Media uploaded successfully!");
    return newItem;
  };

  const deleteMediaItem = (id) => {
    setMediaLibrary(prev => prev.filter(m => m.id !== id));
    triggerToast("Media removed successfully!", "warning");
  };

  // Settings Actions
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    triggerToast("Settings saved successfully!");
  };

  // Admin Auth Actions
  const loginAdmin = (email, password) => {
    if (
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem("ih_admin_auth", "true");
      } catch (e) {
        console.error(e);
      }
      triggerToast("Welcome! Admin access granted.", "success");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem("ih_admin_auth");
    } catch (e) {
      console.error(e);
    }
    triggerToast("Logged out of Admin Portal", "info");
  };

  return (
    <AdminStateContext.Provider value={{
      blogs,
      categories,
      mediaLibrary,
      settings,
      blogToEdit,
      setBlogToEdit,
      toasts,
      triggerToast,
      removeToast,
      addBlog,
      updateBlog,
      deleteBlog,
      duplicateBlog,
      addCategory,
      deleteCategory,
      addMediaItem,
      deleteMediaItem,
      updateSettings,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      ADMIN_CREDENTIALS
    }}>
      {children}
    </AdminStateContext.Provider>
  );
};
