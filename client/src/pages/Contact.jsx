import { useState } from 'react'
import { sendMessage } from '../services/api'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return alert('Semua field wajib diisi!')
    try {
      await sendMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2.5rem' }}>
      <div style={{ fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>Kontak</div>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-1.5px', marginBottom: '3rem' }}>Mari Berkolaborasi</h1>

      {status === 'success' && (
        <div style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', color: 'var(--accent3)', textAlign: 'center' }}>
          Pesan berhasil dikirim! 🎉
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '1rem' }}>Ada project menarik? Let's talk!</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '2rem' }}>
            Aku terbuka untuk proyek freelance, full-time opportunities, atau sekadar ngobrol soal teknologi. Jangan ragu menghubungi!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['📧', 'Email', 'trisinusgulo6@gmail.com'],
              ['📱', 'WhatsApp', '081235487842'],
              ['🐙', 'GitHub', 'github.com/Trisinus123'],
              ['💼', 'LinkedIn', 'linkedin.com/in/trisinus-gulo'],
              ['📍', 'Lokasi', 'Tangerang, Indonesia'],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem 1.2rem' }}>
                <div style={{ width: 36, height: 36, background: 'var(--card2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '0.1rem' }}>{label}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[['text', 'Nama kamu', 'name'], ['email', 'Email kamu', 'email']].map(([type, placeholder, field]) => (
            <input key={field} type={type} placeholder={placeholder} value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.9rem 1.2rem', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: '0.9rem', outline: 'none', width: '100%' }} />
          ))}
          <textarea placeholder="Ceritakan projectmu..." value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.9rem 1.2rem', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: '0.9rem', outline: 'none', height: '130px', resize: 'none', width: '100%' }} />
          <button onClick={handleSubmit}
            style={{ background: 'linear-gradient(135deg,#a78bfa,#f472b6)', color: '#fff', fontFamily: 'Syne', fontWeight: 600, fontSize: '0.9rem', padding: '0.9rem 2rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Kirim Pesan →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact