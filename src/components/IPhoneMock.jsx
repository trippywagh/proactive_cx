export default function IPhoneMock({ children }) {
  return (
    <div className="relative" style={{ width: 402, height: 874 }}>
      {/* Outer frame */}
      <div className="absolute inset-0 rounded-[58px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]" />
      {/* Inner bezel */}
      <div className="absolute inset-[6px] rounded-[54px] bg-black" />

      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[120px] w-[3px] h-[28px] bg-slate-800 rounded-l-sm" />
      <div className="absolute -left-[3px] top-[180px] w-[3px] h-[55px] bg-slate-800 rounded-l-sm" />
      <div className="absolute -left-[3px] top-[250px] w-[3px] h-[55px] bg-slate-800 rounded-l-sm" />
      <div className="absolute -right-[3px] top-[180px] w-[3px] h-[90px] bg-slate-800 rounded-r-sm" />

      {/* Screen */}
      <div className="absolute inset-[14px] rounded-[46px] bg-white overflow-hidden">
        {/* Screen content (full bleed; screens manage their own top/bottom safe areas) */}
        <div className="absolute inset-0">{children}</div>

        {/* Dynamic Island */}
        <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-40" />

        {/* Status bar overlay */}
        <div className="absolute top-0 left-0 right-0 h-[54px] z-30 flex items-end justify-between px-8 pb-[6px] text-[15px] font-semibold text-slate-900 pointer-events-none">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="0.5" />
              <rect x="5" y="5" width="3" height="6" rx="0.5" />
              <rect x="10" y="2" width="3" height="9" rx="0.5" />
              <rect x="15" y="0" width="3" height="11" rx="0.5" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 11.5l-2.3-2.3a3.25 3.25 0 014.6 0L8 11.5z" />
              <path d="M8 7L4.5 3.5a4.95 4.95 0 017 0L8 7z" opacity="0.85" />
              <path d="M8 2.5L3 -2.5a7.07 7.07 0 0110 0L8 2.5z" opacity="0.6" transform="translate(0,2.5)" />
            </svg>
            <svg width="27" height="11" viewBox="0 0 27 11" fill="none">
              <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="19" height="7" rx="1" fill="currentColor" />
              <rect x="24" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
