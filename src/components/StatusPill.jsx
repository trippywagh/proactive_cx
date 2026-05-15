import { useState, useEffect } from 'react'

const COPY = {
  tracking: 'Tracking your ₹1,999 to Truptesh',
  compact: '₹1,999 pending',
  checkingIn: 'Next check in',
}

export default function StatusPill({ onTap }) {
  const [expanded, setExpanded] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const [seconds, setSeconds] = useState(14)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 14 : s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const handleToggle = (e) => {
    e.stopPropagation()
    setExpanded((v) => !v)
  }

  const handleDismiss = (e) => {
    e.stopPropagation()
    setDismissed(true)
  }

  const handleTap = () => {
    onTap?.()
  }

  if (dismissed) return null

  return (
    <div className="relative" style={{ maxWidth: expanded ? '100%' : 220, margin: expanded ? '0' : '0 auto' }}>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="absolute -top-1.5 -right-1.5 z-10 w-[18px] h-[18px] rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition"
      >
        <CloseIcon />
      </button>

      <div
        onClick={handleTap}
        role="button"
        tabIndex={0}
        className={`bg-white rounded-full border border-gray-100 flex items-center gap-2.5 transition-all cursor-pointer active:scale-[0.99] shadow-[0_8px_24px_-6px_rgba(15,23,42,0.18)] ${
          expanded ? 'px-3 py-2 w-full' : 'px-3 py-2'
        }`}
      >
        <HourglassIcon />

        <div className="flex-1 min-w-0 text-left">
          {expanded ? (
            <>
              <p className="text-[12.5px] font-bold text-slate-900 leading-tight truncate">{COPY.tracking}</p>
              <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                {COPY.checkingIn} 0:{String(Math.max(seconds, 0)).padStart(2, '0')}
              </p>
            </>
          ) : (
            <p className="text-[12px] font-bold text-slate-900 leading-tight whitespace-nowrap">{COPY.compact}</p>
          )}
        </div>

        <button
          onClick={handleToggle}
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          {expanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </button>
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function HourglassIcon() {
  return (
    <div className="relative shrink-0 w-9 h-9 flex items-center justify-center">
      {/* Rotating amber arc */}
      <svg
        className="absolute inset-0 w-9 h-9"
        viewBox="0 0 36 36"
        fill="none"
        style={{ animation: 'spin 3s linear infinite', transformOrigin: '18px 18px' }}
      >
        <circle cx="18" cy="18" r="15" stroke="#FEF3C7" strokeWidth="2.5" />
        <circle
          cx="18"
          cy="18"
          r="15"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="40 60"
        />
      </svg>
      {/* Static hourglass shape inside */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6 4h12M6 20h12" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M6 4c0 4 6 5 6 8s-6 4-6 8M18 4c0 4-6 5-6 8s6 4 6 8"
          stroke="#D97706"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M9 8h6M9 16h6" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 15l6-6 6 6" />
    </svg>
  )
}
