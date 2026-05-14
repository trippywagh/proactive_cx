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

export function LanguageSelector({ lang, setLang, onMore, variant = 'indigo' }) {
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
