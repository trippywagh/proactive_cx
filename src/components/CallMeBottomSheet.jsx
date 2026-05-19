import { useState } from 'react'
import { LANGUAGES, LanguageBottomSheet } from './LanguagePicker'

const COPY = {
  en: {
    title: 'Get a call to explain',
    subtitle: "Our AI assistant Priya will call you and walk through exactly what's happening.",
    langLabel: 'IN LANGUAGE',
    change: 'Change',
    startCall: 'Start call',
    notNow: 'Not now',
  },
  hi: {
    title: 'कॉल करके समझाएँ',
    subtitle: 'हमारी AI सहायक Priya आपको कॉल करके पूरी बात समझाएँगी।',
    langLabel: 'भाषा',
    change: 'बदलें',
    startCall: 'कॉल शुरू करें',
    notNow: 'अभी नहीं',
  },
}

export default function CallMeBottomSheet({ open, onClose, lang, setLang, onStartCall }) {
  const [langSheetOpen, setLangSheetOpen] = useState(false)

  if (!open) return null

  const langKey = lang === 'hi' ? 'hi' : 'en'
  const t = COPY[langKey]
  const langInfo = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  const handleStart = () => {
    onClose()
    onStartCall?.()
  }

  return (
    <div className="absolute inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'backdropFade 200ms ease-out' }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl px-5 pt-3 pb-6 shadow-2xl"
        style={{ animation: 'slideUp 280ms ease-out', maxHeight: '88%' }}
      >
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
            <PhoneIcon />
          </div>
        </div>

        <h3 className="font-extrabold text-slate-900 text-[18px] leading-tight text-center">{t.title}</h3>
        <p className="text-[12.5px] text-slate-500 mt-1.5 leading-relaxed text-center px-2">{t.subtitle}</p>

        <div className="mt-5">
          <InfoRow
            label={t.langLabel}
            value={langInfo.native}
            changeLabel={t.change}
            icon={<SmallGlobeIcon />}
            onChange={() => setLangSheetOpen(true)}
          />
        </div>

        <button
          onClick={handleStart}
          className="mt-5 w-full bg-[#B6F082] hover:bg-lime-300 active:bg-lime-400 text-slate-900 font-bold py-3.5 rounded-2xl shadow-sm text-[14.5px] transition"
        >
          {t.startCall}
        </button>
        <button onClick={onClose} className="w-full text-slate-500 font-semibold py-2 mt-1 text-[13px]">
          {t.notNow}
        </button>
      </div>

      <LanguageBottomSheet
        open={langSheetOpen}
        onClose={() => setLangSheetOpen(false)}
        lang={lang}
        setLang={setLang}
      />
    </div>
  )
}

function InfoRow({ label, value, changeLabel, icon, onChange }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100">
      <div className="flex items-center gap-2.5">
        <div className="text-slate-400">{icon}</div>
        <div>
          <p className="text-[9.5px] text-slate-500 uppercase tracking-wider font-bold">{label}</p>
          <p className="text-[14px] text-slate-900 font-semibold mt-0.5">{value}</p>
        </div>
      </div>
      <button onClick={onChange} className="text-indigo-600 text-[12px] font-bold">
        {changeLabel}
      </button>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function SmallGlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  )
}
