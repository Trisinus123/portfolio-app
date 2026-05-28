const express = require('express')
const router = express.Router()
const prisma = require('../db')

// GET semua projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data projects' })
  }
})

// GET project by id
router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id }
    })
    if (!project) return res.status(404).json({ error: 'Project tidak ditemukan' })
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data project' })
  }
})

// POST buat project baru
router.post('/', async (req, res) => {
  try {
    const { title, description, techStack, imageUrl, liveUrl, githubUrl } = req.body
    const project = await prisma.project.create({
      data: { title, description, techStack, imageUrl, liveUrl, githubUrl }
    })
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat project' })
  }
})

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const { title, description, techStack, imageUrl, liveUrl, githubUrl } = req.body
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: { title, description, techStack, imageUrl, liveUrl, githubUrl }
    })
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: 'Gagal update project' })
  }
})

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } })
    res.json({ message: 'Project berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus project' })
  }
})

module.exports = router