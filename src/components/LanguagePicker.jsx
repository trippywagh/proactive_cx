import { useState, useEffect } from 'react'

export const LANGUAGES = [
  { code: 'en', native: 'English', roman: 'English' },
  { code: 'hi', native: 'हिन्दी', roman: 'Hindi' },
  { code: 'bn', native: 'বাংলা', roman: 'Bengali' },
  { code: 'ta', native: 'தமிழ்', roman: 'Tamil' },
  { code: 'te', native: 'తెలుగు', roman: 'Telugu' },
  { code: 'mr', native: 'मराठी', roman: 'Marathi' },
  { code: 'gu', native: 'ગુજરાતી', roman: 'Gujarati' },
  { code: 'kn', native: 'ಕನ್ನಡ', roman: 'Kannada' },
  { code: 'ml', native: 'മലയാളം', roman: 'Malayalam' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', roman: 'Punjabi' },
  { code: 'or', native: 'ଓଡ଼ିଆ', roman: 'Odia' },
  { code: 'ur', native: 'اردو', roman: 'Urdu' },
]

export const SUPPORTED_LANGS = ['en', 'hi']

/* Per-card colour variants for the inline selector */
const VARIANT_STYLES = {
  indigo: { bg: 'bg-indigo-100', active: 'text-indigo-700', idle: 'text-indigo-500' },
  emerald: { bg: 'bg-emerald-100', active: 'text-emerald-700', idle: 'text-emerald-500' },
  rose: { bg: 'bg-rose-100', active: 'text-rose-700', idle: 'text-rose-500' },
  orange: { bg: 'bg-orange-100', active: 'text-orange-700', idle: 'text-orange-500' },
}

/* Shared "speaking" demo state — 4.5s window, toggleable */
export function useTtsDemo(durationMs = 4500) {
  const [speaking, setSpeaking] = useState(false)
  useEffect(() => {
    if (!speaking) return
    const id = setTimeout(() => setSpeaking(false), durationMs)
    return () => clearTimeout(id)
  }, [speaking, durationMs])
  return [speaking, () => setSpeaking((s) => !s)]
}

export function LanguageSelector({ lang, setLang, onMore, variant = 'indigo', speaking = false, onSpeak }) {
  const v = VARIANT_STYLES[variant] || VARIANT_STYLES.indigo
  const isCustom = !['en', 'hi'].includes(lang)

  const btnClass = (active) =>
    `px-2 py-0.5 rounded-full transition flex items-center ${
      active ? `bg-white shadow-sm ${v.active}` : v.idle
    }`

  return (
    <div className={`flex ${v.bg} rounded-full p-0.5 text-[10px] font-bold`}>
      <button onClick={() => setLang('en')} className={btnClass(lang === 'en')}>
        EN
      </button>
      <button onClick={() => setLang('hi')} className={btnClass(lang === 'hi')}>
        हिं
      </button>
      <button onClick={onMore} aria-label="More languages" className={btnClass(isCustom)}>
        <GlobeIcon />
      </button>
      <button
        onClick={onSpeak}
        aria-label={speaking ? 'Stop listening' : 'Listen to this'}
        className={btnClass(speaking)}
      >
        {speaking ? <EqualizerBars /> : <SpeakerIcon />}
      </button>
    </div>
  )
}

function GlobeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
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

/* ─────────────── Premium Listen Overlay ─────────────── */

const OVERLAY_LABELS = {
  en: { speakingIn: 'Speaking in', stop: 'Stop' },
  hi: { speakingIn: 'सुना रहे हैं', stop: 'बंद करें' },
}

export function ListenOverlay({ open, onClose, headline, sub, lang }) {
  if (!open) return null

  const langInfo = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]
  const labels = OVERLAY_LABELS[lang === 'hi' ? 'hi' : 'en']

  return (
    <div className="absolute inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'backdropFade 250ms ease-out' }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-5 pointer-events-none">
        <div
          className="relative w-full max-w-[320px] bg-white rounded-3xl p-6 shadow-2xl overflow-hidden pointer-events-auto"
          style={{ animation: 'modalPop 320ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Glowing orb backdrop */}
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
              animation: 'orbPulse 2.4s ease-in-out infinite',
            }}
          />

          <WaveformVisualizer />

          <div className="relative flex justify-center mt-1 mb-4">
            <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-indigo-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              {labels.speakingIn} {langInfo.native}
            </span>
          </div>

          <p className="relative text-[17px] font-extrabold text-slate-900 leading-snug text-center">
            {headline}
          </p>
          <p className="relative text-[13.5px] text-slate-600 mt-2 leading-relaxed text-center">{sub}</p>

          <div className="relative flex justify-center mt-5">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-full font-bold text-[13px] flex items-center gap-1.5 transition"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="1.5" />
              </svg>
              {labels.stop}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function WaveformVisualizer() {
  const bars = [
    { delay: '0s', duration: '0.7s', baseHeight: '38%' },
    { delay: '0.08s', duration: '0.85s', baseHeight: '60%' },
    { delay: '0.16s', duration: '0.65s', baseHeight: '45%' },
    { delay: '0.04s', duration: '0.9s', baseHeight: '72%' },
    { delay: '0.12s', duration: '0.75s', baseHeight: '88%' },
    { delay: '0.20s', duration: '0.8s', baseHeight: '70%' },
    { delay: '0.06s', duration: '0.7s', baseHeight: '50%' },
    { delay: '0.14s', duration: '0.85s', baseHeight: '60%' },
    { delay: '0.18s', duration: '0.65s', baseHeight: '38%' },
  ]
  return (
    <div className="relative flex items-end justify-center gap-1.5 h-16 mb-2">
      {bars.map((c, i) => (
        <span
          key={i}
          className="w-[5px] rounded-full"
          style={{
            background: 'linear-gradient(to top, #4F46E5, #A5B4FC)',
            animation: `equalizerBar ${c.duration} ease-in-out infinite`,
            animationDelay: c.delay,
            height: c.baseHeight,
            minHeight: 8,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────── Bottom sheet ─────────────── */

export function LanguageBottomSheet({ open, onClose, lang, setLang }) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        style={{ animation: 'backdropFade 200ms ease-out' }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl px-4 pt-3 pb-5 shadow-2xl"
        style={{ animation: 'slideUp 280ms ease-out', maxHeight: '78%' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-[16px]">Choose your language</h3>
            <p className="text-[11.5px] text-slate-500 mt-0.5">Make super.money feel like home.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1.5 -m-1.5 text-slate-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 overflow-y-auto phone-scroll" style={{ maxHeight: 360 }}>
          {LANGUAGES.map((l) => {
            const isActive = lang === l.code
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code)
                  onClose()
                }}
                className={`text-left rounded-xl px-3 py-2.5 border transition relative ${
                  isActive
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <p className={`font-bold text-[14px] ${isActive ? 'text-indigo-900' : 'text-slate-900'}`}>
                  {l.native}
                </p>
                <p className="text-[10.5px] text-slate-500 mt-0.5">{l.roman}</p>
                {isActive && (
                  <svg className="absolute bottom-2 right-2 text-indigo-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* Hint shown under a card when a non-supported language is active */
export function UnsupportedLangHint({ lang }) {
  if (SUPPORTED_LANGS.includes(lang)) return null
  const l = LANGUAGES.find((x) => x.code === lang)
  if (!l) return null
  return (
    <p className="text-[10.5px] text-slate-400 italic mt-2">
      {l.native} translation coming soon · showing English.
    </p>
  )
}
