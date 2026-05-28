const express = require('express')
const router = express.Router()
const prisma = require('../db')

// GET semua blog posts (published only - untuk publik)
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data blog' })
  }
})

// GET semua blog posts (untuk admin)
router.get('/all', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data blog' })
  }
})

// POST buat post baru
router.post('/', async (req, res) => {
  try {
    const { title, content, slug, published } = req.body
    const post = await prisma.blogPost.create({
      data: { title, content, slug, published }
    })
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat post' })
  }
})

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } })
    res.json({ message: 'Post berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus post' })
  }
})

module.exports = router