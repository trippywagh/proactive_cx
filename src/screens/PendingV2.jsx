import { useState, useEffect } from 'react'
import {
  LanguageSelector,
  LanguageBottomSheet,
  UnsupportedLangHint,
  useTtsDemo,
  ListenOverlay,
  ListenButton,
} from '../components/LanguagePicker'
import CallMeBottomSheet from '../components/CallMeBottomSheet'
import CallScreen from '../components/CallScreen'

/* ───────────────────────── Copy ───────────────────────── */

const COPY = {
  en: {
    pendingBadge: 'PAYMENT PENDING',
    headline: 'Almost there',
    sub: 'to Truptesh Wagh',
    moneySafe: 'Your money is safe',
    trackerLabels: ['Your Bank', 'Sending', "Receiver's Bank"],
    trackerSub: ['HDFC', '', 'Kotak'],
    checkingIn: 'Checking again in',
    statusBadge: 'STATUS',
    statusHeadline: 'Your transaction is in progress',
    statusSub:
      "Your payment is on its way. Don't worry — it's safe. Most clear in under 30 minutes.",
    clearsPill: 'Usually clears in under 30 min',
    safetyHeadline: "Money debited? It's still safe.",
    safetySub:
      'If your bank shows the debit, the amount either reaches Truptesh or auto-refunds within 3–5 business days.',
    notifyTitle: 'Notify me on WhatsApp',
    notifySub: '+91 98••• ••210 · no need to keep checking',
    txDetailsLabel: 'TRANSACTION DETAILS',
    viewDetails: 'View details',
    callCta: 'Get a call to explain',
    goBack: 'Go back',
  },
  hi: {
    pendingBadge: 'पेमेंट पेंडिंग',
    headline: 'बस थोड़ी देर और',
    sub: 'तृप्तेश वाघ को',
    moneySafe: 'आपके पैसे सुरक्षित हैं',
    trackerLabels: ['आपका बैंक', 'भेज रहे हैं', 'पाने वाले का बैंक'],
    trackerSub: ['HDFC', '', 'Kotak'],
    checkingIn: 'अगला अपडेट',
    statusBadge: 'स्थिति',
    statusHeadline: 'आपका लेन-देन हो रहा है',
    statusSub:
      'आपका payment हो रहा है। चिंता न करें — आपके पैसे सुरक्षित हैं। आमतौर पर 30 मिनट से कम में पूरा हो जाता है।',
    clearsPill: 'आमतौर पर 30 मिनट से कम में पूरा',
    safetyHeadline: 'पैसे कट गए? वो भी सुरक्षित हैं।',
    safetySub:
      'अगर बैंक से पैसे कटे दिखें, तो वो या तो तृप्तेश को मिल जाएंगे, या 3–5 कार्य दिवस में अपने आप वापस आ जाएंगे।',
    notifyTitle: 'WhatsApp पर बताएँ',
    notifySub: '+91 98••• ••210 · बार-बार चेक करने की ज़रूरत नहीं',
    txDetailsLabel: 'लेन-देन की जानकारी',
    viewDetails: 'पूरी जानकारी देखें',
    callCta: 'कॉल करके समझाएँ',
    goBack: 'वापस जाएँ',
  },
}

/* ───────────────────────── Root ───────────────────────── */

export default function PendingV2() {
  const [lang, setLang] = useState('en')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [callSheetOpen, setCallSheetOpen] = useState(false)
  const [callScreenOpen, setCallScreenOpen] = useState(false)
  const [notifyOn, setNotifyOn] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(14)
  const [speaking, toggleSpeaking] = useTtsDemo()

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 14 : s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const t = COPY[lang] || COPY.en

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB] relative">
      <div className="h-[54px] shrink-0" />

      <div className="flex-1 overflow-y-auto phone-scroll pb-3">
        <TopNav />
        <Hero t={t} />
        <StatusTracker t={t} />
        <StatusCard t={t} lang={lang} setLang={setLang} onMoreLang={() => setSheetOpen(true)} speaking={speaking} onSpeak={toggleSpeaking} />
        <NotifyToggleRow t={t} on={notifyOn} setOn={setNotifyOn} />
        <TxDetailsRow t={t} />
      </div>

      <Footer t={t} onCallMe={() => setCallSheetOpen(true)} />

      <CallMeBottomSheet
        open={callSheetOpen}
        onClose={() => setCallSheetOpen(false)}
        lang={lang}
        setLang={setLang}
        onStartCall={() => setCallScreenOpen(true)}
      />
      <CallScreen open={callScreenOpen} onClose={() => setCallScreenOpen(false)} lang={lang} />
      <LanguageBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        lang={lang}
        setLang={setLang}
      />
      <ListenOverlay
        open={speaking}
        onClose={toggleSpeaking}
        headline={t.statusHeadline}
        sub={t.statusSub}
        lang={lang}
      />
    </div>
  )
}

/* ───────────────────────── Top Nav ───────────────────────── */

function TopNav() {
  return (
    <div className="px-3 pt-2 pb-1 flex items-center justify-between">
      <button aria-label="Back" className="p-2 text-slate-700">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex items-center gap-1 text-slate-700">
        <button aria-label="Share" className="p-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
        <button aria-label="Help" className="p-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero({ t }) {
  return (
    <div className="text-center px-6 pt-2 pb-3">
      <div className="flex justify-center mb-3">
        <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-amber-200 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {t.pendingBadge}
        </span>
      </div>
      <p className="text-slate-700 text-[14px] font-semibold mt-0.5">{t.sub}</p>
      <p className="text-slate-400 text-[12px] mt-0.5">truptesh@superyes</p>
      <h2 className="text-[30px] font-extrabold text-slate-900 mt-2 tracking-tight">₹1,999</h2>
    </div>
  )
}

/* ───────────────────────── Status Tracker ───────────────────────── */

function StatusTracker({ t }) {
  return (
    <section className="bg-white mx-4 mt-3 rounded-2xl border border-gray-100 px-3 py-3 shadow-sm">
      <div className="flex items-start justify-between">
        <Step state="done" label={t.trackerLabels[0]} sub={t.trackerSub[0]} />
        <Line state="done" />
        <Step state="active" label={t.trackerLabels[1]} sub={t.trackerSub[1]} />
        <Line state="pending" />
        <Step state="pending" label={t.trackerLabels[2]} sub={t.trackerSub[2]} />
      </div>
    </section>
  )
}

function Step({ state, label, sub }) {
  return (
    <div className="flex flex-col items-center shrink-0" style={{ width: 86 }}>
      {state === 'done' && (
        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      {state === 'active' && (
        <div className="relative w-7 h-7 flex items-center justify-center">
          <svg className="absolute inset-0 w-7 h-7 animate-spin" viewBox="0 0 36 36" fill="none" style={{ animationDuration: '1.5s' }}>
            <circle cx="18" cy="18" r="16" stroke="#E0E7FF" strokeWidth="3" />
            <circle cx="18" cy="18" r="16" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 100" />
          </svg>
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
        </div>
      )}
      {state === 'pending' && (
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10l9-6 9 6" />
            <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
            <path d="M3 20h18" />
          </svg>
        </div>
      )}
      <span
        className={`text-[10.5px] font-semibold mt-1 text-center leading-tight whitespace-nowrap ${
          state === 'done' ? 'text-slate-700' : state === 'active' ? 'text-indigo-700' : 'text-gray-400'
        }`}
      >
        {label}
      </span>
      {sub && <span className="text-[9.5px] text-gray-400 mt-px">{sub}</span>}
    </div>
  )
}

function Line({ state }) {
  return <div className={`flex-1 h-[2px] rounded-full mx-1 mt-[14px] ${state === 'done' ? 'bg-green-500' : 'bg-gray-200'}`} />
}

/* ───────────────────────── Countdown ───────────────────────── */

function CheckingCountdown({ seconds, t }) {
  return (
    <div className="text-center mt-2 mb-0.5 text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
      {t.checkingIn} 0:{String(Math.max(seconds, 0)).padStart(2, '0')}
    </div>
  )
}

/* ───────────────────────── Status card ───────────────────────── */

function StatusCard({ t, lang, setLang, onMoreLang, speaking, onSpeak }) {
  return (
    <section
      className="mx-4 mt-3 rounded-2xl border border-indigo-100 p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #EEF2FF 0%, #F5F3FF 100%)' }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-indigo-700">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-bold text-[10.5px] ml-1.5 uppercase tracking-wider">{t.statusBadge}</span>
        </div>
        <LanguageSelector
          lang={lang}
          setLang={setLang}
          onMore={onMoreLang}
          variant="indigo"
          showSpeaker={false}
        />
      </div>
      <p className="text-[14px] font-bold text-slate-800 leading-snug">{t.statusHeadline}</p>
      <p className="text-[12.5px] text-slate-600 mt-1 leading-relaxed">{t.statusSub}</p>
      <UnsupportedLangHint lang={lang} />
      <div className="mt-3 flex items-center justify-between">
        <span className="inline-block bg-yellow-300 text-slate-800 px-2.5 py-1 rounded-full text-[10.5px] font-bold shadow-sm">
          {t.clearsPill}
        </span>
        <ListenButton speaking={speaking} onSpeak={onSpeak} variant="indigo" lang={lang} />
      </div>
    </section>
  )
}

/* ───────────────────────── Safety card ───────────────────────── */

function SafetyCard({ t }) {
  return (
    <section className="mx-4 mt-3 bg-white rounded-2xl border border-gray-100 p-3.5 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-green-500" />
      <div className="flex items-start gap-2.5">
        <div className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-green-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div>
          <p className="text-[13.5px] font-bold text-slate-800 leading-tight">{t.safetyHeadline}</p>
          <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">{t.safetySub}</p>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Notify toggle ───────────────────────── */

function NotifyToggleRow({ t, on, setOn }) {
  return (
    <section className="mx-4 mt-3 bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between border border-slate-100">
      <div className="pr-3 flex items-start gap-2.5">
        <div className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        </div>
        <div>
          <p className="text-slate-800 font-bold text-[13.5px] leading-tight">{t.notifyTitle}</p>
          <p className="text-slate-500 text-[11.5px] mt-0.5 leading-snug">{t.notifySub}</p>
        </div>
      </div>
      <button
        aria-label="Toggle notifications"
        onClick={() => setOn((v) => !v)}
        className={`relative w-12 h-7 rounded-full transition shrink-0 ${on ? 'bg-indigo-600' : 'bg-gray-300'}`}
      >
        <div
          className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all ${
            on ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </section>
  )
}

/* ───────────────────────── Tx details ───────────────────────── */

function TxDetailsRow({ t }) {
  return (
    <div className="text-center mt-5 mb-2 px-4">
      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t.txDetailsLabel}</p>
      <div className="flex items-center justify-center gap-1.5 mt-1.5 text-gray-600 text-[12px]">
        <span>UPI ID: 81689436479012739</span>
        <button aria-label="Copy" className="text-gray-400">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        </button>
      </div>
      <p className="text-[11.5px] text-gray-400 mt-0.5">26 Sept 2023 · 01:19 PM</p>
      <button className="mt-2 text-indigo-600 text-[12.5px] font-bold border-b border-indigo-600/30 pb-0.5">
        {t.viewDetails}
      </button>
    </div>
  )
}

/* ───────────────────────── Footer (with new call CTA) ───────────────────────── */

function Footer({ t, onCallMe }) {
  return (
    <div className="shrink-0 bg-white border-t border-gray-100 px-4 pt-3 pb-2.5 relative">
      <button
        onClick={onCallMe}
        className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3.5 rounded-2xl shadow-sm transition text-[14.5px] flex items-center justify-center gap-2 mb-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
        {t.callCta}
      </button>
      <button className="w-full bg-[#B6F082] hover:bg-lime-300 active:bg-lime-400 text-slate-900 font-bold py-3.5 rounded-2xl shadow-sm transition text-[14.5px]">
        {t.goBack}
      </button>
      <div className="flex items-center justify-center gap-2.5 mt-2.5 opacity-70">
        <span className="text-[9px] text-gray-400 font-medium">Powered by</span>
        <span className="text-[10px] font-extrabold text-indigo-700 tracking-tight">UPI</span>
        <div className="h-3 w-[1px] bg-gray-300" />
        <span className="text-[10px] font-extrabold text-slate-700 tracking-tight">YES BANK</span>
        <div className="h-3 w-[1px] bg-gray-300" />
        <span className="text-[10px] font-extrabold text-slate-900">super.money</span>
      </div>
      <div className="flex justify-center mt-2">
        <div className="w-[120px] h-[5px] bg-slate-900 rounded-full" />
      </div>
    </div>
  )
}
