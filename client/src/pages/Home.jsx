import { useEffect, useRef, useState } from 'react'
import { getProjects } from '../services/api'
import profilePhoto from '../assets/foto.png'

function Home() {
  const sectionsRef = useRef([])
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionsRef.current.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoadingProjects(false))
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="bg-[#0a0a0f] text-white overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 15% 25%, rgba(167,139,250,0.1) 0%, transparent 60%), radial-gradient(circle at 85% 75%, rgba(244,114,182,0.07) 0%, transparent 60%)' }} />

      {/* ───── HERO ───── */}
      <section id="hero" className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-20 fade-up" ref={el => sectionsRef.current[0] = el}>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h1 className="text-7xl font-black leading-none tracking-tight mb-6">
              Trisinus<br />
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Gulo</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
              A results-driven Informatics Engineering graduate with hands-on experience as a Full Stack Developer across two
              national-scale internships. Skilled in building end-to-end web applications using Laravel, React.js, and MySQL, with a
              proven ability to deliver real-world solutions that improve operational efficiency and support data-driven decision
              making.
            </p>
            <div className="flex gap-4 flex-wrap mb-12">
              <button onClick={() => scrollTo('projects')}
                className="bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity">
                View Projects →
              </button>
              <button onClick={() => scrollTo('experience')}
                className="border border-white/10 text-white font-bold px-8 py-3.5 rounded-xl hover:border-violet-400 hover:text-violet-300 transition-all">
                Experience
              </button>
            </div>
            <div className="flex gap-10">
              {[['2+', 'Internships'], ['4+', 'Projects'], ['3.41', 'GPA']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-black text-violet-400">{n}</div>
                  <div className="text-xs text-gray-500 mt-1 tracking-wider uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-violet-500/25 blur-3xl scale-125" />
            <img src={profilePhoto} alt="Trisinus Gulo"
              className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-2 border-violet-500/30 shadow-2xl" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-white/[0.06] py-4 overflow-hidden bg-white/[0.01]">
        <div className="flex gap-10 whitespace-nowrap w-fit animate-marquee">
          {[...Array(2)].flatMap(() =>
            ['React.js','Laravel','Node.js','PostgreSQL','MySQL','Tailwind CSS','Figma','Git','Python','PHP','JavaScript','Express.js','Flutter','Google Cloud','MongoDB'].map((t, i) => (
              <span key={t+i} className="text-gray-600 text-xs tracking-widest uppercase font-medium">
                {t} <span className="text-violet-600 mx-1">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ───── PROJECTS ───── */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-8 py-24 fade-up" ref={el => sectionsRef.current[1] = el}>
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-violet-400 text-xs tracking-[4px] uppercase font-semibold">Portfolio</span>
            <h2 className="text-5xl font-black mt-2 tracking-tight">Featured Projects</h2>
          </div>
          <a href="/admin/projects" className="text-gray-600 text-xs hover:text-violet-400 transition-colors">
            + Add Project
          </a>
        </div>
        {loadingProjects ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl h-56 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">No projects yet.</p>
            <a href="/admin/projects" className="text-violet-400 text-sm hover:underline">Add projects in admin →</a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={p.id}
                className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-violet-500/40 hover:bg-white/[0.05] transition-all hover:-translate-y-1.5 cursor-default">

                {/* IMAGE */}
                {p.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img src={p.imageUrl} alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-4xl"
                    style={{ background: ['linear-gradient(135deg,#1a0533,#2d1052)','linear-gradient(135deg,#0a1f2e,#0c3a5a)','linear-gradient(135deg,#0d2818,#0f4a2a)','linear-gradient(135deg,#2e1a0a,#5a3010)','linear-gradient(135deg,#1a0a2e,#351060)','linear-gradient(135deg,#1a1a0a,#3a3a10)'][i % 6] }}>
                    {['🌐','✈️','📊','📦','🔐','🚀','💡','⚡'][i % 8]}
                  </div>
                )}

                {/* BODY */}
                <div className="p-7">
                  <h3 className="font-bold text-base mb-2 group-hover:text-violet-300 transition-colors">{p.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.techStack.map(t => (
                      <span key={t} className="bg-violet-500/10 text-violet-400 text-[10px] px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{p.description}</p>
                  <div className="flex gap-4 pt-2 border-t border-white/[0.05]">
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-violet-400 text-xs hover:underline">Live →</a>}
                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-gray-500 text-xs hover:text-white transition-colors">GitHub →</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ───── EXPERIENCE ───── */}
      <section id="experience" className="bg-white/[0.02] border-y border-white/[0.05] py-24 fade-up" ref={el => sectionsRef.current[2] = el}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="mb-14">
            <span className="text-violet-400 text-xs tracking-[4px] uppercase font-semibold">Internship Experience</span>
            <h2 className="text-5xl font-black mt-2 tracking-tight">Work Experience</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                role: 'IT Development',
                company: 'Airnav Indonesia',
                period: 'Oct 2025 – Apr 2026',
                color: 'from-blue-500/10 to-cyan-500/10',
                border: 'border-blue-500/20',
                tag: 'text-blue-400',
                points: [
                  'Designed UI/UX for NavEvent (internal event platform) using Figma.',
                  'Built aviation safety data reporting dashboard using React.js & Laravel with MySQL, actively used by stakeholders to monitor safety metrics.',
                  'Developed full-stack solution integrating raw Excel reports into interactive web interfaces, improving data accessibility.',
                  'Accelerated data processing workflow using advanced Excel functions and Pivot Tables for database integration.',
                  'Created Google Sheets integrated dashboard for real-time data visualization through charts, tables, and maps.',
                ]
              },
              {
                role: 'Web Developer',
                company: 'PT. PAL Indonesia',
                period: 'Aug – Dec 2024',
                color: 'from-violet-500/10 to-pink-500/10',
                border: 'border-violet-500/20',
                tag: 'text-violet-400',
                points: [
                  'Developed a web-based employee health information system, streamlining data recording and management.',
                  'Built an AES-based encryption & decryption application to strengthen security of confidential company documents.',
                  'Produced Sakti 4.0 animated video to support user adoption of the encryption application.',
                  'Provided daily IT support, resolving computer and system issues for internal staff.',
                ]
              }
            ].map(exp => (
              <div key={exp.company} className={`bg-gradient-to-br ${exp.color} border ${exp.border} rounded-2xl p-8 hover:scale-[1.01] transition-transform`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black">{exp.role}</h3>
                    <p className={`${exp.tag} text-sm font-semibold mt-1`}>{exp.company}</p>
                  </div>
                  <span className="bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full whitespace-nowrap">{exp.period}</span>
                </div>
                <ul className="space-y-3">
                  {exp.points.map((point, i) => (
                    <li key={i} className="text-gray-300 text-sm leading-relaxed flex gap-3">
                      <span className={`${exp.tag} mt-0.5 flex-shrink-0 font-bold`}>→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SKILLS ───── */}
      <section id="skills" className="max-w-6xl mx-auto px-8 py-24 fade-up" ref={el => sectionsRef.current[3] = el}>
        <div className="mb-14">
          <span className="text-violet-400 text-xs tracking-[4px] uppercase font-semibold">Tech Stack</span>
          <h2 className="text-5xl font-black mt-2 tracking-tight">Skills & Tools</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { cat: 'Languages', icon: '💻', items: ['Java', 'Python', 'PHP', 'JavaScript'] },
            { cat: 'Frontend', icon: '🎨', items: ['HTML', 'CSS', 'React.js', 'Bootstrap', 'Tailwind CSS'] },
            { cat: 'Backend', icon: '⚙️', items: ['Laravel', 'Node.js', 'Express.js'] },
            { cat: 'Database', icon: '🗄️', items: ['MySQL', 'PostgreSQL', 'SQLite', 'MariaDB', 'MongoDB'] },
            { cat: 'Tools', icon: '🛠️', items: ['Git', 'Figma', 'Postman', 'VS Code', 'XAMPP', 'Google Cloud'] },
            { cat: 'Mobile', icon: '📱', items: ['Flutter'] },
            { cat: 'Security', icon: '🔐', items: ['AES Encryption'] },
            { cat: 'Design', icon: '✏️', items: ['UI/UX Design', 'Wireframing', 'Balsamiq'] },
            { cat: 'Soft Skills', icon: '🤝', items: ['Communication', 'Problem Solving', 'Teamwork', 'Time Management'] },
          ].map(s => (
            <div key={s.cat} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all group">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{s.icon}</span>
                <h4 className="text-violet-400 text-xs font-black tracking-wider uppercase">{s.cat}</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map(item => (
                  <span key={item} className="text-gray-500 text-xs bg-white/[0.03] px-2 py-0.5 rounded group-hover:text-gray-300 transition-colors">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── EDUCATION ───── */}
      <section id="education" className="bg-white/[0.02] border-y border-white/[0.05] py-24 fade-up" ref={el => sectionsRef.current[4] = el}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="mb-14">
            <span className="text-violet-400 text-xs tracking-[4px] uppercase font-semibold">Education & Organization</span>
            <h2 className="text-5xl font-black mt-2 tracking-tight">Education</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-500/20 rounded-2xl p-8">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-xl font-black">Informatics Engineering</h3>
                  <p className="text-violet-400 text-sm font-semibold mt-1">Politeknik Negeri Malang</p>
                </div>
                <span className="bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">2021 – 2025</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-gray-500 text-sm">GPA</span>
                <span className="text-violet-400 font-black text-3xl">3.41</span>
                <span className="text-gray-600 text-sm">/ 4.00</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Web Programming', 'Database', 'Machine Learning', 'Information Systems', 'Cloud Computing', 'IoT', 'Computer Networks'].map(c => (
                  <span key={c} className="text-gray-500 text-xs bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-xl font-black">KDO Division Expert Staff</h3>
                  <p className="text-violet-400 text-sm font-semibold mt-1">Formation Polynema</p>
                </div>
                <span className="bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">2021 – 2023</span>
              </div>
              <ul className="space-y-3">
                {[
                  'Assisted division head in planning and executing work programs.',
                  'Contributed ideas and forwarded concepts to support divisional goals.',
                  'Mentored junior administrators in running organizational work programs.'
                ].map((p, i) => (
                  <li key={i} className="text-gray-400 text-sm flex gap-3">
                    <span className="text-violet-500 flex-shrink-0 font-bold mt-0.5">→</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8">
            <h3 className="text-lg font-black mb-6 text-gray-300">🏆 Certifications</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'AI Basics — Dicoding 2024',
                'JavaScript Programming Basics — Dicoding 2024',
                'Web Front-End Development — Dicoding 2024',
                'Web Programming — Dicoding 2024',
                'Guide to Learn Python with AI — DQLab 2023',
                'Data Analysis Python — DQLab 2023',
                'Web Developer Internship — PT. PAL 2024',
                'Table Top Exercise Cyber Incident — Airnav 2026',
              ].map(cert => (
                <span key={cert} className="bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-4 py-2 rounded-full hover:bg-violet-500/20 transition-colors cursor-default">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── CONTACT CTA ───── */}
      <section id="contact" className="py-32 text-center fade-up" ref={el => sectionsRef.current[5] = el}>
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-6xl font-black tracking-tight mb-6 leading-none">
            Ready to<br />
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">collaborate?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Open for full-time, freelance, or just a chat about tech!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold px-10 py-4 rounded-xl hover:opacity-90 transition-opacity text-base">
              Get In Touch →
            </a>
            <a href="mailto:trisinusgulo6@gmail.com" className="border border-white/10 text-white font-bold px-10 py-4 rounded-xl hover:border-violet-400 transition-colors text-base">
              trisinusgulo6@gmail.com
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>
    </div>
  )
}

export default Home