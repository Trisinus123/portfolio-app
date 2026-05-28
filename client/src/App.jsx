import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Dashboard from './pages/admin/Dashboard'
import ManageProjects from './pages/admin/ManageProjects'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/projects" element={<ManageProjects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App