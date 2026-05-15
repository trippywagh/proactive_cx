import { useState, useEffect } from 'react'
import { LANGUAGES } from './LanguagePicker'

const DEMO_PHONE = '+91 98••• ••210'

const COPY = {
  en: {
    title: 'Get a call to explain',
    subtitle: "Our AI assistant Priya will call you and walk through exactly what's happening.",
    phoneLabel: 'WE’LL CALL ON',
    langLabel: 'IN LANGUAGE',
    change: 'Change',
    requestBtn: 'Request a call now',
    notNow: 'Not now',
    scheduledTitle: 'Priya is calling you',
    scheduledSub: 'AI assistant · super.money',
    inLabel: 'in',
    secondsLabel: 'seconds',
    callingOnLabel: 'Calling on',
    speakingInLabel: 'Speaking in',
    cancelCallBtn: 'Cancel call',
  },
  hi: {
    title: 'कॉल करके समझाएँ',
    subtitle: 'हमारी AI सहायक Priya आपको कॉल करके पूरी बात समझाएँगी।',
    phoneLabel: 'इस नंबर पर',
    langLabel: 'इस भाषा में',
    change: 'बदलें',
    requestBtn: 'अभी कॉल मँगवाएँ',
    notNow: 'अभी नहीं',
    scheduledTitle: 'Priya आपको कॉल कर रही हैं',
    scheduledSub: 'AI सहायक · super.money',
    inLabel: '',
    secondsLabel: 'सेकंड में',
    callingOnLabel: 'नंबर',
    speakingInLabel: 'भाषा',
    cancelCallBtn: 'कॉल रद्द करें',
  },
}

export default function CallMeBottomSheet({ open, onClose, lang }) {
  const [phase, setPhase] = useState('confirm')
  const [seconds, setSeconds] = useState(28)

  useEffect(() => {
    if (open) {
      setPhase('confirm')
      setSeconds(28)
    }
  }, [open])

  useEffect(() => {
    if (phase !== 'scheduled') return
    if (seconds <= 0) return
    const id = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [phase, seconds])

  if (!open) return null

  const t = COPY[lang === 'hi' ? 'hi' : 'en']
  const langInfo = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

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

        {phase === 'confirm' ? (
          <ConfirmState
            t={t}
            langInfo={langInfo}
            onRequest={() => {
              setPhase('scheduled')
              setSeconds(28)
            }}
            onClose={onClose}
          />
        ) : (
          <ScheduledState t={t} langInfo={langInfo} seconds={seconds} onCancel={onClose} />
        )}
      </div>
    </div>
  )
}

/* ─────────────── Confirm state ─────────────── */

function ConfirmState({ t, langInfo, onRequest, onClose }) {
  return (
    <>
      <div className="text-center px-2 mb-4">
        <div className="flex justify-center mb-3">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
            <PhoneIcon />
          </div>
        </div>
        <h3 className="font-extrabold text-slate-900 text-[18px] leading-tight">{t.title}</h3>
        <p className="text-[12.5px] text-slate-500 mt-1.5 leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="space-y-2 mb-4">
        <InfoRow label={t.phoneLabel} value={DEMO_PHONE} changeLabel={t.change} icon={<SmallPhoneIcon />} />
        <InfoRow label={t.langLabel} value={langInfo.native} changeLabel={t.change} icon={<SmallGlobeIcon />} />
      </div>

      <button
        onClick={onRequest}
        className="w-full bg-[#B6F082] hover:bg-lime-300 active:bg-lime-400 text-slate-900 font-bold py-3.5 rounded-2xl shadow-sm text-[14.5px] transition"
      >
        {t.requestBtn}
      </button>
      <button onClick={onClose} className="w-full text-slate-500 font-semibold py-2 mt-1 text-[13px]">
        {t.notNow}
      </button>
    </>
  )
}

/* ─────────────── Scheduled state ─────────────── */

function ScheduledState({ t, langInfo, seconds, onCancel }) {
  return (
    <>
      <div className="text-center px-2 mb-3">
        <div className="flex justify-center mb-3 relative h-20">
          <div className="absolute top-2 w-20 h-20 rounded-full bg-indigo-400 opacity-25 animate-ping" />
          <div className="relative w-16 h-16 mt-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-[26px] shadow-lg ring-4 ring-white">
            P
          </div>
        </div>
        <h3 className="font-extrabold text-slate-900 text-[18px] leading-tight">{t.scheduledTitle}</h3>
        <p className="text-[11.5px] text-slate-500 mt-1">{t.scheduledSub}</p>
      </div>

      <div className="text-center mb-4">
        {t.inLabel && <p className="text-[11px] text-slate-400">{t.inLabel}</p>}
        <p className="text-[44px] font-extrabold text-indigo-700 tracking-tight tabular-nums leading-none">
          0:{String(Math.max(seconds, 0)).padStart(2, '0')}
        </p>
        <p className="text-[11px] text-slate-400">{t.secondsLabel}</p>
      </div>

      <div className="bg-slate-50 rounded-xl p-3 space-y-2 mb-4 border border-slate-100">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-slate-500 flex items-center gap-1.5">
            <SmallPhoneIcon /> {t.callingOnLabel}
          </span>
          <span className="text-slate-900 font-semibold">{DEMO_PHONE}</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-slate-500 flex items-center gap-1.5">
            <SmallGlobeIcon /> {t.speakingInLabel}
          </span>
          <span className="text-slate-900 font-semibold">{langInfo.native}</span>
        </div>
      </div>

      <button
        onClick={onCancel}
        className="w-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold py-3 rounded-2xl text-[13.5px] transition"
      >
        {t.cancelCallBtn}
      </button>
    </>
  )
}

/* ─────────────── Helpers ─────────────── */

function InfoRow({ label, value, changeLabel, icon }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100">
      <div className="flex items-center gap-2.5">
        <div className="text-slate-400">{icon}</div>
        <div>
          <p className="text-[9.5px] text-slate-500 uppercase tracking-wider font-bold">{label}</p>
          <p className="text-[14px] text-slate-900 font-semibold mt-0.5">{value}</p>
        </div>
      </div>
      <button className="text-indigo-600 text-[12px] font-bold">{changeLabel}</button>
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

function SmallPhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function SmallGlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  )
}
