require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/projects', require('./src/routes/projects'))
app.use('/api/blog', require('./src/routes/blog'))
app.use('/api/messages', require('./src/routes/messages'))

app.get('/', (req, res) => {
  res.json({ message: 'Server jalan!' })
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (err) => {
  console.error('Server error:', err)
})

process.on('SIGINT', () => {
  console.log('Server stopped')
  process.exit(0)
})