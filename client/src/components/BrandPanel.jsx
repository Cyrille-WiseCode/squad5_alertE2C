export default function BrandPanel() {
  return (
    <aside className="brand-panel hidden md:flex flex-col justify-between p-12 text-white relative overflow-hidden h-full">
      <div className="brand-topline"><span>E2C<span className="brand-dot">.</span></span><span className="brand-kicker">ÉNERGIE ÉLECTRIQUE DU CONGO</span></div>
      <div className="brand-illustration" aria-hidden="true">
        <svg viewBox="0 0 360 360">
          <defs>
            <radialGradient id="brandHalo"><stop stopColor="#597cf1" stopOpacity=".34"/><stop offset="1" stopColor="#1B1F3B" stopOpacity="0"/></radialGradient>
            <filter id="brandGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <circle cx="180" cy="180" r="178" fill="url(#brandHalo)"/>
          <circle cx="180" cy="180" r="166"/><circle cx="180" cy="180" r="132"/><circle cx="180" cy="180" r="98"/><circle cx="180" cy="180" r="64"/>
          <circle cx="180" cy="180" r="48" className="brand-icon-ring"/>
          <path d="m190 142-42 56h31l-9 42 42-62h-31z" className="brand-bolt" filter="url(#brandGlow)"/>
        </svg>
      </div>
      <div className="brand-message">
        <p className="brand-eyebrow">UN SERVICE PUBLIC DE PROXIMITÉ</p>
        <h2>Un service plus proche.<br/><span>Une énergie mieux suivie.</span></h2>
        <p>Signaler, suivre, être informé en toute simplicité.</p>
      </div>
    </aside>
  )
}
