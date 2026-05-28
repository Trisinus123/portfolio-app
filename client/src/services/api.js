import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

// Projects
export const getProjects = () => API.get('/api/projects')
export const getProject = (id) => API.get(`/api/projects/${id}`)
export const createProject = (data) => API.post('/api/projects', data)
export const updateProject = (id, data) => API.put(`/api/projects/${id}`, data)
export const deleteProject = (id) => API.delete(`/api/projects/${id}`)

// Blog
export const getBlogPosts = () => API.get('/api/blog')
export const getAllBlogPosts = () => API.get('/api/blog/all')
export const createBlogPost = (data) => API.post('/api/blog', data)
export const deleteBlogPost = (id) => API.delete(`/api/blog/${id}`)

// Messages
export const getMessages = () => API.get('/api/messages')
export const sendMessage = (data) => API.post('/api/messages', data)