import { useEffect, useState } from 'react'
import { getProjects } from '../services/api'

const colors = [
  'linear-gradient(135deg,#1a0533,#2d1052)',
  'linear-gradient(135deg,#0a1f2e,#0c3a5a)',
  'linear-gradient(135deg,#0d2818,#0f4a2a)',
  'linear-gradient(135deg,#2e1a0a,#5a3010)',
  'linear-gradient(135deg,#1a0a2e,#351060)',
  'linear-gradient(135deg,#1a1a0a,#3a3a10)',
]

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <div style={{ fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>Portfolio</div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-1.5px' }}>Projects</h1>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{projects.length} projects</p>
      </div>

      {loading ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '4rem' }}>Loading...</p>
      ) : projects.length === 0 ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '4rem' }}>Belum ada project.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem' }}>
          {projects.map((p, i) => (
            <div key={p.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden', transition: 'all .3s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ height: '140px', background: colors[i % colors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🚀</div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {p.techStack.map(t => (
                    <span key={t} style={{ background: 'rgba(167,139,250,0.08)', color: 'var(--accent)', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', fontSize: '0.78rem', textDecoration: 'none' }}>Live →</a>}
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', fontSize: '0.78rem', textDecoration: 'none' }}>GitHub →</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects