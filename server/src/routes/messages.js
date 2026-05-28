const express = require('express')
const router = express.Router()
const prisma = require('../db')

// GET semua messages
router.get('/', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil messages' })
  }
})

// POST kirim message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body
    const newMessage = await prisma.message.create({
      data: { name, email, message }
    })
    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengirim message' })
  }
})

module.exports = router