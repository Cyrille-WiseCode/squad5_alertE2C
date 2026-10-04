export default function AgentBrandPanel() {
  return (
    <aside className="agent-brand-panel hidden h-full flex-col justify-between overflow-hidden p-10 text-white md:flex lg:p-12">
      <div className="brand-topline"><span>E2C<span className="brand-dot">.</span></span><span className="brand-kicker">ESPACE PROFESSIONNEL</span></div>
      <div className="brand-illustration" aria-hidden="true">
        <svg viewBox="0 0 360 360">
          <defs>
            <radialGradient id="agentBrandHalo"><stop stopColor="#597cf1" stopOpacity=".38"/><stop offset="1" stopColor="#1B1F3B" stopOpacity="0"/></radialGradient>
            <filter id="agentBrandGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <circle cx="180" cy="180" r="178" fill="url(#agentBrandHalo)"/>
          <circle cx="180" cy="180" r="166"/><circle cx="180" cy="180" r="132"/><circle cx="180" cy="180" r="98"/><circle cx="180" cy="180" r="64"/>
          <circle cx="180" cy="180" r="48" className="brand-icon-ring"/>
          <path d="m190 142-42 56h31l-9 42 42-62h-31z" className="brand-bolt" filter="url(#agentBrandGlow)"/>
        </svg>
      </div>
      <div className="brand-message">
        <p className="brand-eyebrow">ACCÈS PROFESSIONNEL</p>
        <h2>Espace Agent <span>- Gestion &amp; Interventions</span></h2>
        <p>Superviser les signalements et intervenir en temps réel.</p>
      </div>
    </aside>
  )
}
