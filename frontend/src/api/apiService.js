const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {};

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    const error = new Error(errorData.message || 'API request failed');
    error.status = response.status;
    error.response = { data: errorData };
    throw error;
  }

  if (response.status === 240 || response.status === 204) {
    return null;
  }

  return await response.json();
}

export const apiService = {
  // Public Blog APIs
  getPublicBlogs: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.page !== undefined) query.append('page', params.page);
    if (params.size !== undefined) query.append('size', params.size);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return await request(`/public/blogs${queryString}`);
  },

  getPublicBlogBySlug: async (slug) => {
    return await request(`/public/blogs/${slug}`);
  },

  getPublicCategories: async () => {
    return await request('/public/categories');
  },

  // Doctor Blog APIs
  getDoctorBlogs: async (doctorId = null) => {
    const query = doctorId ? `?doctorId=${doctorId}` : '';
    return await request(`/blogs/my${query}`);
  },

  getBlogById: async (id) => {
    return await request(`/blogs/${id}`);
  },

  createBlog: async (blogData, doctorId = null) => {
    const query = doctorId ? `?doctorId=${doctorId}` : '';
    return await request(`/blogs${query}`, {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  },

  updateBlog: async (id, blogData, doctorId = null) => {
    const query = doctorId ? `?doctorId=${doctorId}` : '';
    return await request(`/blogs/${id}${query}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  },

  submitBlog: async (id, doctorId = null) => {
    const query = doctorId ? `?doctorId=${doctorId}` : '';
    return await request(`/blogs/${id}/submit${query}`, {
      method: 'POST',
    });
  },

  deleteBlog: async (id, doctorId = null) => {
    const query = doctorId ? `?doctorId=${doctorId}` : '';
    return await request(`/blogs/${id}${query}`, {
      method: 'DELETE',
    });
  },

  // Admin Blog APIs
  getAdminBlogs: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.categoryId) query.append('categoryId', params.categoryId);
    if (params.authorId) query.append('authorId', params.authorId);
    if (params.search) query.append('search', params.search);
    if (params.page !== undefined) query.append('page', params.page);
    if (params.size !== undefined) query.append('size', params.size);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return await request(`/admin/blogs${queryString}`);
  },

  getPendingBlogs: async () => {
    return await request('/admin/blogs/pending');
  },

  approveBlog: async (id) => {
    return await request(`/admin/blogs/${id}/approve`, {
      method: 'POST',
    });
  },

  rejectBlog: async (id, reason) => {
    return await request(`/admin/blogs/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  requestChanges: async (id, reason) => {
    return await request(`/admin/blogs/${id}/request-changes`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  deleteAdminBlog: async (id) => {
    return await request(`/admin/blogs/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin Category APIs
  createCategory: async (categoryData) => {
    return await request('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: async (id) => {
    return await request(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  },

  // Image Upload API
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await request('/uploads', {
      method: 'POST',
      body: formData,
    });
  },
};

export default apiService;
