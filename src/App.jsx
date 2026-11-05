
import React, { useState } from 'react'
import {
  Activity, ArrowUpRight, ArrowDownRight, Bell, BriefcaseBusiness,
  CalendarDays, CheckCircle2, ChevronDown, CircleDollarSign,
  Download, FileText, LayoutDashboard, LogOut,
  Menu, Plus, Search, ShieldAlert, Truck, Users, X, Zap
} from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from 'recharts'

const ADMIN = {
  id: 1,
  name: 'Demo Administrator',
  email: 'admin@controlhub.demo',
  password: 'Admin123!',
  role: 'Admin',
  status: 'Approved'
}

const ROLES = ['Project Manager', 'Project Controller', 'Finance', 'Viewer']

const ACCESS = {
  Admin: ['Overview', 'Projects', 'WBS & Schedule', 'Cost Control', 'Resources', 'PO & Billing', 'Risks & Issues', 'Reports', 'User Management'],
  'Project Manager': ['Overview', 'Projects', 'WBS & Schedule', 'Resources', 'Risks & Issues', 'Reports'],
  'Project Controller': ['Overview', 'Projects', 'WBS & Schedule', 'Cost Control', 'Resources', 'PO & Billing', 'Risks & Issues', 'Reports'],
  Finance: ['Overview', 'Projects', 'Cost Control', 'PO & Billing', 'Reports'],
  Viewer: ['Overview', 'Projects', 'Reports']
}

const initialProjects = [
  { id: 'PRJ-001', name: 'Jakarta Metro 5G Rollout', client: 'Metro Digital Indonesia', manager: 'Andi Pratama', status: 'On Track', progress: 72, budget: 2450000000, actual: 1685000000, start: '2025-08-01', end: '2025-12-20', region: 'Jakarta' },
  { id: 'PRJ-002', name: 'West Java Fiber Expansion', client: 'Nusantara Connect', manager: 'Dewi Lestari', status: 'At Risk', progress: 48, budget: 1800000000, actual: 1120000000, start: '2025-07-15', end: '2025-11-30', region: 'West Java' },
  { id: 'PRJ-003', name: 'Central Java Network Upgrade', client: 'Jaringan Raya', manager: 'Bima Saputra', status: 'On Track', progress: 86, budget: 1250000000, actual: 940000000, start: '2025-06-01', end: '2025-10-30', region: 'Central Java' },
  { id: 'PRJ-004', name: 'Bandung BTS Modernization', client: 'Metro Digital Indonesia', manager: 'Rina Putri', status: 'Delayed', progress: 31, budget: 980000000, actual: 510000000, start: '2025-08-20', end: '2026-01-15', region: 'West Java' }
]

const initialTasks = [
  { id: 'TSK-001', project: 'PRJ-001', wbs: '1.1', task: 'Site survey & feasibility', owner: 'Survey Team', start: '2025-08-01', end: '2025-08-20', progress: 100, status: 'Completed' },
  { id: 'TSK-002', project: 'PRJ-001', wbs: '1.2', task: 'Permits & site preparation', owner: 'Deployment Team', start: '2025-08-21', end: '2025-09-15', progress: 100, status: 'Completed' },
  { id: 'TSK-003', project: 'PRJ-001', wbs: '1.3', task: 'Equipment procurement', owner: 'Procurement', start: '2025-09-01', end: '2025-10-10', progress: 80, status: 'In Progress' },
  { id: 'TSK-004', project: 'PRJ-001', wbs: '1.4', task: 'Installation & integration', owner: 'Network Team', start: '2025-10-01', end: '2025-11-25', progress: 55, status: 'In Progress' },
  { id: 'TSK-005', project: 'PRJ-002', wbs: '2.1', task: 'Route assessment', owner: 'Survey Team', start: '2025-07-15', end: '2025-08-15', progress: 100, status: 'Completed' },
  { id: 'TSK-006', project: 'PRJ-002', wbs: '2.2', task: 'Fiber optic deployment', owner: 'Field Team A', start: '2025-08-16', end: '2025-11-10', progress: 42, status: 'At Risk' }
]

const initialPO = [
  { id: 'PO-2025-014', vendor: 'PT Infrastruktur Teknologi', project: 'PRJ-001', value: 485000000, release: '2025-09-02', status: 'Released', billing: 'Partially Billed' },
  { id: 'PO-2025-018', vendor: 'Nusantara Fiber Supply', project: 'PRJ-002', value: 320000000, release: '2025-09-18', status: 'Pending Approval', billing: 'Not Billed' },
  { id: 'PO-2025-021', vendor: 'PT Menara Solusi', project: 'PRJ-003', value: 175000000, release: '2025-08-11', status: 'Released', billing: 'Billed' }
]

const initialRisks = [
  { id: 'RSK-01', title: 'Permit approval delay', project: 'PRJ-002', severity: 'High', owner: 'Project Manager', mitigation: 'Weekly follow-up with local authority', status: 'Open' },
  { id: 'RSK-02', title: 'Equipment delivery lead time', project: 'PRJ-004', severity: 'Medium', owner: 'Procurement Lead', mitigation: 'Confirm shipment and prepare alternate vendor', status: 'Mitigating' },
  { id: 'RSK-03', title: 'Weather disruption', project: 'PRJ-001', severity: 'Low', owner: 'Field Coordinator', mitigation: 'Adjust outdoor work sequence', status: 'Monitoring' }
]

const trend = [
  { month: 'Jun', planned: 18, actual: 16 },
  { month: 'Jul', planned: 28, actual: 25 },
  { month: 'Aug', planned: 39, actual: 35 },
  { month: 'Sep', planned: 52, actual: 47 },
  { month: 'Oct', planned: 66, actual: 58 },
  { month: 'Nov', planned: 82, actual: 72 },
  { month: 'Dec', planned: 100, actual: 91 }
]

const navItems = [
  ['Overview', LayoutDashboard],
  ['Projects', BriefcaseBusiness],
  ['WBS & Schedule', CalendarDays],
  ['Cost Control', CircleDollarSign],
  ['Resources', Users],
  ['PO & Billing', Truck],
  ['Risks & Issues', ShieldAlert],
  ['Reports', FileText],
  ['User Management', Users]
]

const money = value => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
}).format(value || 0)

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function Badge({ children, tone = 'gray' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Project Controller')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const submit = event => {
    event.preventDefault()
    setError('')
    setMessage('')

    const users = readStorage('tpc_users', [ADMIN])

    if (mode === 'register') {
      if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        setError('Email is already registered.')
        return
      }

      const newUser = {
        id: Date.now(),
        name,
        email: email.toLowerCase(),
        password,
        role,
        status: 'Pending'
      }

      localStorage.setItem('tpc_users', JSON.stringify([...users, newUser]))
      setMessage('Registration submitted. Please wait for administrator approval.')
      setName('')
      setEmail('')
      setPassword('')
      return
    }

    const user = users.find(item =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
    )

    if (!user) {
      setError('Email or password is incorrect.')
      return
    }

    if (user.status !== 'Approved') {
      setError('Your account is awaiting administrator approval.')
      return
    }

    onLogin(user)
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="brand-mark"><Zap size={23} fill="currentColor" /></div>
        <div><b>Control<span>Hub</span></b><small>PROJECT OPERATIONS</small></div>
      </div>

      <div className="auth-card">
        <div className="auth-heading">
          <div className="eyebrow">TELECOM PROJECT CONTROL</div>
          <h1>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h1>
          <p>{mode === 'login' ? 'Sign in to access your project workspace.' : 'Register to request access to ControlHub.'}</p>
        </div>

        <div className="auth-tabs">
          <button className={mode === 'login' ? 'selected' : ''} onClick={() => { setMode('login'); setError(''); setMessage('') }}>Login</button>
          <button className={mode === 'register' ? 'selected' : ''} onClick={() => { setMode('register'); setError(''); setMessage('') }}>Register</button>
        </div>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <label>Full name
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
            </label>
          )}
          <label>Email address
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" />
          </label>
          <label>Password
            <input required minLength={6} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
          </label>
          {mode === 'register' && (
            <label>Requested role
              <select value={role} onChange={e => setRole(e.target.value)}>
                {ROLES.map(item => <option key={item}>{item}</option>)}
              </select>
            </label>
          )}

          {error && <div className="auth-alert error">{error}</div>}
          {message && <div className="auth-alert success">{message}</div>}

          <button className="btn primary auth-submit" type="submit">
            {mode === 'login' ? 'Sign in' : 'Submit registration'}
          </button>
        </form>

        {mode === 'login' && (
          <div className="demo-credentials">
            <b>Demo administrator account</b>
            <span>Email: admin@controlhub.demo</span>
            <span>Password: Admin123!</span>
          </div>
        )}
        <p className="auth-footnote">Personal portfolio project · Demonstration environment</p>
      </div>
    </div>
  )
}

function Stat({ label, value, sub, icon: Icon, tone = 'blue', trendUp = true }) {
  return (
    <div className="stat-card">
      <div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={18} /></span></div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{sub}</div>
    </div>
  )
}

function ProjectTable({ projects }) {
  return (
    <div className="table-scroll">
      <table>
        <thead><tr><th>Project</th><th>Client</th><th>Manager</th><th>Progress</th><th>Budget</th><th>Status</th><th>Timeline</th></tr></thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td><b>{project.name}</b><small className="cell-sub">{project.id} · {project.region}</small></td>
              <td>{project.client}</td><td>{project.manager}</td>
              <td><div className="table-progress"><span>{project.progress}%</span><div className="progress-track"><i style={{ width: `${project.progress}%` }} /></div></div></td>
              <td>{money(project.budget)}</td>
              <td><Badge tone={project.status === 'On Track' ? 'green' : project.status === 'At Risk' ? 'orange' : 'red'}>{project.status}</Badge></td>
              <td>{project.start} → {project.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!projects.length && <div className="empty">No projects found.</div>}
    </div>
  )
}

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = readStorage('tpc_users', null)
    if (!saved) {
      localStorage.setItem('tpc_users', JSON.stringify([ADMIN]))
      return [ADMIN]
    }
    if (!saved.some(user => user.email === ADMIN.email)) {
      const updated = [...saved, ADMIN]
      localStorage.setItem('tpc_users', JSON.stringify(updated))
      return updated
    }
    return saved
  })

  const [currentUser, setCurrentUser] = useState(() => {
    const session = readStorage('tpc_session', null)
    if (!session) return null
    const allUsers = readStorage('tpc_users', [ADMIN])
    return allUsers.find(user => user.id === session.id && user.status === 'Approved') || null
  })

  const [page, setPage] = useState('Overview')
  const [query, setQuery] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState('')
  const [projects, setProjects] = useState(() => readStorage('tpc_projects', initialProjects))
  const [tasks] = useState(() => readStorage('tpc_tasks', initialTasks))
  const [pos] = useState(() => readStorage('tpc_pos', initialPO))
  const [risks] = useState(initialRisks)
  const [projectForm, setProjectForm] = useState({
    name: '', client: '', manager: '', budget: '',
    region: 'Jakarta', start: '2025-11-01', end: '2026-03-31'
  })

  const notify = text => {
    setToast(text)
    window.setTimeout(() => setToast(''), 2600)
  }

  const login = user => {
    setCurrentUser(user)
    sessionStorage.setItem('tpc_session', JSON.stringify({ id: user.id }))
    setPage('Overview')
  }

  const logout = () => {
    sessionStorage.removeItem('tpc_session')
    setCurrentUser(null)
    setPage('Overview')
  }

  const refreshUsers = () => setUsers(readStorage('tpc_users', [ADMIN]))

  const approveUser = id => {
    const updated = users.map(user => user.id === id ? { ...user, status: 'Approved' } : user)
    localStorage.setItem('tpc_users', JSON.stringify(updated))
    setUsers(updated)
    notify('User approved successfully')
  }

  const rejectUser = id => {
    const updated = users.map(user => user.id === id ? { ...user, status: 'Rejected' } : user)
    localStorage.setItem('tpc_users', JSON.stringify(updated))
    setUsers(updated)
    notify('Registration rejected')
  }

  const exportCSV = (rows, filename) => {
    const csv = [
      Object.keys(rows[0] || {}).join(','),
      ...rows.map(row => Object.values(row).map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','))
    ].join('\n')
    const link = document.createElement('a')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const addProject = event => {
    event.preventDefault()
    const project = {
      ...projectForm,
      id: `PRJ-${String(projects.length + 1).padStart(3, '0')}`,
      budget: Number(projectForm.budget) || 0,
      actual: 0,
      progress: 0,
      status: 'On Track'
    }
    const updated = [...projects, project]
    setProjects(updated)
    localStorage.setItem('tpc_projects', JSON.stringify(updated))
    setShowModal(false)
    setProjectForm({
      name: '', client: '', manager: '', budget: '',
      region: 'Jakarta', start: '2025-11-01', end: '2026-03-31'
    })
    notify('Project added successfully')
  }

  if (!currentUser) return <AuthScreen onLogin={login} />

  const allowedPages = ACCESS[currentUser.role] || ACCESS.Viewer
  const visibleNav = navItems.filter(([name]) => allowedPages.includes(name))
  const totalBudget = projects.reduce((sum, project) => sum + Number(project.budget), 0)
  const totalActual = projects.reduce((sum, project) => sum + Number(project.actual), 0)
  const overall = projects.length ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length) : 0
  const active = projects.filter(project => project.status !== 'Completed').length
  const filteredProjects = projects.filter(project => `${project.name} ${project.client} ${project.id}`.toLowerCase().includes(query.toLowerCase()))
  const filteredTasks = tasks.filter(task => `${task.task} ${task.owner} ${task.wbs}`.toLowerCase().includes(query.toLowerCase()))
  const title = page === 'Overview' ? 'Project overview' : page
  const canCreateProject = ['Admin', 'Project Manager'].includes(currentUser.role)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Zap size={21} fill="currentColor" /></div>
          <div><b>Control<span>Hub</span></b><small>PROJECT OPERATIONS</small></div>
          <button className="mobile-close" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace"><div className="workspace-avatar">TN</div><div><b>Telecom Network</b><small>Enterprise workspace</small></div><ChevronDown size={15} /></div>
        <div className="nav-label">MAIN MENU</div>

        <nav>
          {visibleNav.map(([name, Icon]) => (
            <button key={name} className={`nav-item ${page === name ? 'active' : ''}`} onClick={() => { setPage(name); setMobileNav(false) }}>
              <Icon size={18} /><span>{name}</span>
              {name === 'User Management' && <i className="nav-count">{users.filter(user => user.status === 'Pending').length}</i>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><Activity size={17} /></div><b>Project control workspace</b><p>Track delivery, cost, resources and project risks in one place.</p></div>
          <div className="profile">
            <div className="profile-avatar">{currentUser.name.slice(0, 1).toUpperCase()}</div>
            <div><b>{currentUser.name}</b><small>{currentUser.role}</small></div>
            <button className="logout-icon" title="Logout" onClick={logout}><LogOut size={17} /></button>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="hamburger" onClick={() => setMobileNav(true)}><Menu /></button>
          <div className="crumb">Workspace <span>/</span> <b>{title}</b></div>
          <div className="top-actions">
            <div className="searchbox"><Search size={16} /><input placeholder="Search projects, tasks..." value={query} onChange={event => setQuery(event.target.value)} /></div>
            <button className="icon-btn" onClick={() => notify('You are all caught up')}><Bell size={18} /></button>
            <div className="top-avatar">{currentUser.name.slice(0, 1).toUpperCase()}</div>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div><div className="eyebrow">TELECOM PROJECT CONTROL</div><h1>{title}</h1><p>Monitor project delivery, schedule performance and financial health.</p></div>
            <div className="heading-actions">
              {page === 'Projects' && <button className="btn secondary" onClick={() => exportCSV(projects, 'project-portfolio.csv')}><Download size={16} /> Export</button>}
              {page === 'Projects' && canCreateProject && <button className="btn primary" onClick={() => setShowModal(true)}><Plus size={17} /> New project</button>}
            </div>
          </div>

          {page === 'Overview' && (
            <>
              <div className="stat-grid">
                <Stat label="Total projects" value={projects.length} sub={`${active} active projects`} icon={BriefcaseBusiness} />
                <Stat label="Overall progress" value={`${overall}%`} sub="Average completion" icon={Activity} tone="purple" />
                <Stat label="Total budget" value={money(totalBudget)} sub="Approved project budget" icon={CircleDollarSign} tone="green" />
                <Stat label="Actual cost" value={money(totalActual)} sub={`${totalBudget ? Math.round(totalActual / totalBudget * 100) : 0}% of budget`} icon={ArrowUpRight} tone="orange" trendUp={false} />
              </div>

              <div className="dashboard-grid">
                <section className="panel">
                  <div className="panel-heading"><div><h3>Project progress</h3><p>Planned vs actual cumulative progress</p></div><Badge tone="blue">2025 plan</Badge></div>
                  <div className="chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trend}>
                        <defs>
                          <linearGradient id="planned" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8998f5" stopOpacity={0.3} /><stop offset="100%" stopColor="#8998f5" stopOpacity={0} /></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" /><YAxis tickFormatter={value => `${value}%`} />
                        <Tooltip formatter={value => `${value}%`} />
                        <Area type="monotone" dataKey="planned" stroke="#8998f5" fill="url(#planned)" />
                        <Area type="monotone" dataKey="actual" stroke="#16b8a6" fill="#16b8a622" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="legend"><span><i className="dot planned" /> Planned</span><span><i className="dot actual" /> Actual</span></div>
                </section>

                <section className="panel">
                  <div className="panel-heading"><div><h3>Project health</h3><p>Current delivery status</p></div></div>
                  {['On Track', 'At Risk', 'Delayed'].map((status, index) => {
                    const count = projects.filter(project => project.status === status).length
                    return <div className="health-row" key={status}><span>{status}</span><b>{count}</b><div className="health-track"><span style={{ width: `${projects.length ? count / projects.length * 100 : 0}%` }} /></div></div>
                  })}
                  <div className="status-note"><ShieldAlert size={17} />{projects.filter(project => project.status !== 'On Track').length} projects require attention and follow-up.</div>
                </section>
              </div>
              <section className="panel"><div className="panel-heading"><div><h3>Project portfolio</h3><p>Summary of telecommunications projects</p></div></div><ProjectTable projects={projects.slice(0, 4)} /></section>
            </>
          )}

          {page === 'Projects' && <section className="panel"><div className="panel-heading"><div><h3>Project portfolio</h3><p>Project status, budget, owner and delivery timeline</p></div></div><ProjectTable projects={filteredProjects} /></section>}

          {page === 'WBS & Schedule' && <section className="panel"><div className="panel-heading"><div><h3>Work breakdown structure</h3><p>Deliverables, ownership and schedule progress</p></div></div><div className="table-scroll"><table><thead><tr><th>WBS</th><th>Deliverable</th><th>Project</th><th>Owner</th><th>Start</th><th>Finish</th><th>Progress</th><th>Status</th></tr></thead><tbody>{filteredTasks.map(task => <tr key={task.id}><td>{task.wbs}</td><td><b>{task.task}</b><small className="cell-sub">{task.id}</small></td><td>{task.project}</td><td>{task.owner}</td><td>{task.start}</td><td>{task.end}</td><td>{task.progress}%</td><td><Badge tone={task.status === 'Completed' ? 'green' : 'blue'}>{task.status}</Badge></td></tr>)}</tbody></table></div></section>}

          {page === 'Cost Control' && <section className="panel"><div className="panel-heading"><div><h3>Budget vs actual cost</h3><p>Financial performance by project (IDR)</p></div><button className="btn secondary" onClick={() => exportCSV(projects.map(project => ({ project: project.name, budget: project.budget, actual: project.actual, variance: project.budget - project.actual })), 'cost-control.csv')}><Download size={15} /> Export</button></div><div className="table-scroll"><table><thead><tr><th>Project</th><th>Approved budget</th><th>Actual cost</th><th>Cost variance</th><th>Utilization</th></tr></thead><tbody>{projects.map(project => <tr key={project.id}><td><b>{project.name}</b></td><td>{money(project.budget)}</td><td>{money(project.actual)}</td><td>{money(project.budget - project.actual)}</td><td>{Math.round(project.actual / project.budget * 100)}%</td></tr>)}</tbody></table></div></section>}

          {page === 'Resources' && <section className="panel"><div className="panel-heading"><div><h3>Resource allocation</h3><p>Illustrative manpower loading by project team</p></div></div><div className="resource-grid">{[['Network Engineering', 12], ['Field Deployment', 18], ['Procurement', 6], ['Project Management', 5], ['Quality Assurance', 4], ['Site Survey', 8]].map(([name, count]) => <div className="resource-card" key={name}><Users size={19} /><div><b>{name}</b><small>Assigned project team</small></div><strong>{count} people</strong></div>)}</div></section>}

          {page === 'PO & Billing' && <section className="panel"><div className="panel-heading"><div><h3>Purchase order & billing tracker</h3><p>PO monitoring from release through billing</p></div><button className="btn secondary" onClick={() => exportCSV(pos, 'po-billing-tracker.csv')}><Download size={15} /> Export</button></div><div className="table-scroll"><table><thead><tr><th>PO number</th><th>Vendor</th><th>Project</th><th>PO value</th><th>Release date</th><th>PO status</th><th>Billing status</th></tr></thead><tbody>{pos.map(po => <tr key={po.id}><td>{po.id}</td><td>{po.vendor}</td><td>{po.project}</td><td>{money(po.value)}</td><td>{po.release}</td><td><Badge tone="green">{po.status}</Badge></td><td><Badge>{po.billing}</Badge></td></tr>)}</tbody></table></div></section>}

          {page === 'Risks & Issues' && <section className="panel"><div className="panel-heading"><div><h3>Risk & issue register</h3><p>Risk ownership and mitigation actions</p></div></div><div className="table-scroll"><table><thead><tr><th>Risk ID</th><th>Risk / issue</th><th>Project</th><th>Severity</th><th>Owner</th><th>Mitigation plan</th><th>Status</th></tr></thead><tbody>{risks.map(risk => <tr key={risk.id}><td>{risk.id}</td><td><b>{risk.title}</b></td><td>{risk.project}</td><td><Badge tone={risk.severity === 'High' ? 'red' : 'orange'}>{risk.severity}</Badge></td><td>{risk.owner}</td><td>{risk.mitigation}</td><td>{risk.status}</td></tr>)}</tbody></table></div></section>}

          {page === 'Reports' && <section className="panel"><div className="panel-heading"><div><h3>Project reporting center</h3><p>Export structured data for project reporting</p></div></div><div className="report-cards">{[['Project portfolio', projects, 'project-portfolio.csv'], ['WBS & schedule', tasks, 'wbs-schedule.csv'], ['PO & billing', pos, 'po-billing.csv']].map(([name, rows, filename]) => <div className="report-card" key={name}><FileText size={22} /><div><b>{name}</b><p>CSV export</p></div><button className="download-btn" onClick={() => exportCSV(rows, filename)}><Download size={16} /></button></div>)}</div></section>}

          {page === 'User Management' && currentUser.role === 'Admin' && (
            <section className="panel">
              <div className="panel-heading"><div><h3>User management</h3><p>Review registration requests and manage workspace access</p></div><button className="btn secondary" onClick={refreshUsers}>Refresh</button></div>
              <div className="table-scroll"><table><thead><tr><th>Name</th><th>Email</th><th>Requested role</th><th>Status</th><th>Action</th></tr></thead><tbody>
                {users.map(user => <tr key={user.id}><td><b>{user.name}</b></td><td>{user.email}</td><td>{user.role}</td><td><Badge tone={user.status === 'Approved' ? 'green' : user.status === 'Pending' ? 'orange' : 'red'}>{user.status}</Badge></td><td>{user.status === 'Pending' ? <div className="user-actions"><button className="approve-btn" onClick={() => approveUser(user.id)}>Approve</button><button className="reject-btn" onClick={() => rejectUser(user.id)}>Reject</button></div> : user.email === ADMIN.email ? 'System account' : '—'}</td></tr>)}
              </tbody></table></div>
            </section>
          )}
        </div>

        <footer>ControlHub · Telecom Project Control Simulation · Personal portfolio project</footer>
      </main>

      {showModal && (
        <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && setShowModal(false)}>
          <form className="modal" onSubmit={addProject}>
            <div className="modal-head"><div><h2>Create new project</h2><p>Add a project to the portfolio workspace.</p></div><button type="button" className="icon-btn" onClick={() => setShowModal(false)}><X size={18} /></button></div>
            <label>Project name<input required value={projectForm.name} onChange={event => setProjectForm({ ...projectForm, name: event.target.value })} /></label>
            <label>Client / customer<input required value={projectForm.client} onChange={event => setProjectForm({ ...projectForm, client: event.target.value })} /></label>
            <div className="form-row">
              <label>Project manager<input required value={projectForm.manager} onChange={event => setProjectForm({ ...projectForm, manager: event.target.value })} /></label>
              <label>Region<select value={projectForm.region} onChange={event => setProjectForm({ ...projectForm, region: event.target.value })}><option>Jakarta</option><option>West Java</option><option>Central Java</option><option>East Java</option><option>Other</option></select></label>
            </div>
            <label>Approved budget (IDR)<input required type="number" min="0" value={projectForm.budget} onChange={event => setProjectForm({ ...projectForm, budget: event.target.value })} /></label>
            <div className="form-row">
              <label>Start date<input type="date" value={projectForm.start} onChange={event => setProjectForm({ ...projectForm, start: event.target.value })} /></label>
              <label>Target finish<input type="date" value={projectForm.end} onChange={event => setProjectForm({ ...projectForm, end: event.target.value })} /></label>
            </div>
            <div className="modal-actions"><button type="button" className="btn secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn primary" type="submit"><Plus size={16} /> Create project</button></div>
          </form>
        </div>
      )}

      {toast && <div className="toast"><CheckCircle2 size={17} />{toast}</div>}
    </div>
  )
}
