import { useState, useEffect } from 'react'
import { LanguageSelector } from './LanguagePicker'

const FADE_IN_STYLE = { animation: 'statusFadeIn 350ms ease-out' }

/* Sequence hook — advances through chat reveal steps with timed delays */
export function useChatSequence() {
  const [step, setStep] = useState(0)
  // 0 = nothing, 1 = greeting, 2 = typing, 3 = status, 4 = options

  useEffect(() => {
    const sequence = [
      { delay: 450, step: 1 },
      { delay: 700, step: 2 },
      { delay: 1400, step: 3 },
      { delay: 500, step: 4 },
    ]
    let cumulative = 0
    let cancelled = false
    const timers = []
    for (const item of sequence) {
      cumulative += item.delay
      const id = setTimeout(() => {
        if (!cancelled) setStep(item.step)
      }, cumulative)
      timers.push(id)
    }
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  return step
}

/* Animated 3-dot typing indicator inside a bot bubble */
export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mt-3 px-3" style={FADE_IN_STYLE}>
      <div className="w-7 shrink-0" />
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" style={{ animation: 'typingDot 1.2s ease-in-out infinite', animationDelay: '0s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" style={{ animation: 'typingDot 1.2s ease-in-out infinite', animationDelay: '0.18s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" style={{ animation: 'typingDot 1.2s ease-in-out infinite', animationDelay: '0.36s' }} />
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Header ───────────────────────── */

export function ChatHeader({ title = 'Help', lang, setLang, onMoreLang }) {
  return (
    <div className="shrink-0 px-3 py-2.5 flex items-center justify-between border-b border-gray-100 bg-white">
      <div className="flex items-center gap-1.5">
        <button aria-label="Back" className="p-2 -m-2 text-slate-700">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-extrabold text-[16px] text-slate-900 ml-1">{title}</span>
      </div>
      <LanguageSelector lang={lang} setLang={setLang} onMore={onMoreLang} variant="indigo" showSpeaker={false} />
    </div>
  )
}

/* ───────────────────────── Bot avatar + message ───────────────────────── */

export function BotAvatar() {
  return (
    <div className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-sm">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    </div>
  )
}

export function BotMessage({ children, time, showAvatar = true, hasSpeaker = false, speaking = false, onSpeak }) {
  return (
    <div className="flex items-end gap-2 mt-3 px-3" style={FADE_IN_STYLE}>
      <div className="w-7 shrink-0">{showAvatar && <BotAvatar />}</div>
      <div className="flex flex-col items-start max-w-[260px]">
        <div className="relative bg-white border border-gray-100 rounded-2xl rounded-bl-md px-3.5 py-2.5 shadow-sm">
          {hasSpeaker && (
            <button
              onClick={onSpeak}
              aria-label={speaking ? 'Stop listening' : 'Listen to this'}
              className={`absolute -top-2 -right-2 rounded-full w-7 h-7 flex items-center justify-center border shadow-sm transition ${
                speaking ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-indigo-100 text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              {speaking ? <EqualizerBars /> : <SpeakerIcon />}
            </button>
          )}
          <div className="text-[13.5px] text-slate-800 leading-relaxed">{children}</div>
        </div>
        {time && <span className="text-[10px] text-gray-400 mt-1 ml-1.5">{time}</span>}
      </div>
    </div>
  )
}

function SpeakerIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  )
}

function EqualizerBars() {
  const delays = ['0s', '0.12s', '0.24s', '0.36s']
  return (
    <div className="flex items-end gap-[1.5px]" style={{ height: 12, width: 12 }}>
      {delays.map((delay, i) => (
        <span
          key={i}
          className="w-[2px] bg-current rounded-full"
          style={{
            animation: 'equalizerBar 0.7s ease-in-out infinite',
            animationDelay: delay,
            height: '60%',
          }}
        />
      ))}
    </div>
  )
}

/* ───────────────────────── Option cards ───────────────────────── */

export function OptionGroup({ children }) {
  return <div className="mt-3 mx-3 ml-[44px] space-y-2" style={FADE_IN_STYLE}>{children}</div>
}

const OPTION_VARIANTS = {
  default: 'bg-white border-gray-100 hover:border-indigo-200 active:border-indigo-300 text-slate-800',
  primary: 'bg-indigo-50 border-indigo-200 hover:border-indigo-300 text-indigo-800',
  subtle: 'bg-transparent border-transparent text-slate-500 hover:text-slate-700',
}

export function OptionCard({ label, sub, onClick, variant = 'default', icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl px-3.5 py-3 border transition flex items-center gap-2.5 ${OPTION_VARIANTS[variant]}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-bold leading-tight ${variant === 'subtle' ? 'font-semibold' : ''}`}>{label}</p>
        {sub && <p className="text-[11.5px] text-slate-500 mt-0.5 font-normal">{sub}</p>}
      </div>
      {variant !== 'subtle' && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-300">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  )
}

/* Small status icons used inside option cards */

export function StatusIconSuccess() {
  return (
    <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

export function StatusIconPending() {
  return (
    <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    </span>
  )
}

export function StatusIconFailed() {
  return (
    <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </span>
  )
}

/* ───────────────────────── Input bar ───────────────────────── */

export function ChatInput({ placeholder }) {
  return (
    <div className="shrink-0 bg-white border-t border-gray-100 px-3 py-2.5 flex items-center gap-2">
      <input
        type="text"
        placeholder={placeholder}
        readOnly
        className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2.5 text-[12.5px] text-slate-700 placeholder-slate-400 focus:outline-none"
      />
      <button aria-label="Voice input" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-sm">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M19 10v2a7 7 0 01-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </button>
    </div>
  )
}
