import { useState, useEffect } from 'react'
import Failed from './Failed'
import {
  LanguageSelector,
  LanguageBottomSheet,
  SUPPORTED_LANGS,
  UnsupportedLangHint,
  useTtsDemo,
  ListenOverlay,
  ListenButton,
} from '../components/LanguagePicker'

/* ───────────────────────── Copy ───────────────────────── */

const COPY = {
  en: {
    pending: {
      badge: 'PAYMENT PENDING',
      badgeStyle: 'amber',
      headline: 'Almost there',
      sub: 'to Truptesh Wagh',
      moneySafe: 'Your money is safe',
      trackerStep2: 'Sending',
      statusBadge: 'STATUS',
      statusHeadline: 'Your transaction is in progress',
      statusSub:
        "Your payment is on its way. Don't worry — it's safe. Most clear in under 30 minutes.",
      clearsPill: 'Usually clears in under 30 min',
      cta: 'Go back',
    },
    success: {
      badge: 'PAYMENT SUCCESSFUL',
      badgeStyle: 'green',
      headline: 'Payment sent',
      sub: 'to Truptesh Wagh',
      moneySafe: 'Delivered to Truptesh',
      trackerStep2: 'Sent',
      statusBadge: 'COMPLETED',
      statusHeadline: "₹1,999 reached Truptesh's Kotak account",
      statusSub: 'Completed just now. Truptesh has been notified.',
      cta: 'Done',
    },
    failed: {
      badge: 'REFUNDED',
      badgeStyle: 'orange',
      headline: 'Your money is back',
      sub: "Receiver's bank declined the transaction",
      moneySafe: '₹1,999 back in your HDFC account',
      trackerStep2: 'Declined',
      statusBadge: 'REFUND PROCESSED',
      statusHeadline: "The transaction couldn't complete",
      statusSub:
        "Don't worry — ₹1,999 has already been returned to your HDFC account. You can try sending again.",
      ctaPrimary: 'Try again',
      ctaSecondary: 'Done',
    },
    trackerLabels: ['Your Bank', null, "Receiver's Bank"],
    trackerSub: ['HDFC', '', 'Kotak'],
    checkingIn: 'Checking again in',
    safetyHeadline: "Money debited? It's still safe.",
    safetySub:
      'If your bank shows the debit, the amount either reaches Truptesh or auto-refunds within 3–5 business days.',
    notifyTitle: 'Notify me on WhatsApp',
    notifySub: '+91 98••• ••210 · no need to keep checking',
    txDetailsLabel: 'TRANSACTION DETAILS',
    viewDetails: 'View details',
    replay: 'Replay',
  },
  hi: {
    pending: {
      badge: 'पेमेंट पेंडिंग',
      badgeStyle: 'amber',
      headline: 'बस थोड़ी देर और',
      sub: 'तृप्तेश वाघ को',
      moneySafe: 'आपके पैसे सुरक्षित हैं',
      trackerStep2: 'भेज रहे हैं',
      statusBadge: 'स्थिति',
      statusHeadline: 'आपका लेन-देन हो रहा है',
      statusSub:
        'आपका payment हो रहा है। चिंता न करें — आपके पैसे सुरक्षित हैं। आमतौर पर 30 मिनट से कम में पूरा हो जाता है।',
      clearsPill: 'आमतौर पर 30 मिनट से कम में पूरा',
      cta: 'वापस जाएँ',
    },
    success: {
      badge: 'पेमेंट सफल',
      badgeStyle: 'green',
      headline: 'पैसे भेज दिए',
      sub: 'तृप्तेश वाघ को',
      moneySafe: 'तृप्तेश तक पहुँच गए',
      trackerStep2: 'भेज दिया',
      statusBadge: 'पूरा हुआ',
      statusHeadline: '₹1,999 तृप्तेश के कोटक अकाउंट में पहुँच गए',
      statusSub: 'अभी पूरा हुआ। तृप्तेश को सूचना भेज दी गई है।',
      cta: 'हो गया',
    },
    failed: {
      badge: 'रिफंड',
      badgeStyle: 'orange',
      headline: 'आपके पैसे वापस आ गए',
      sub: 'पाने वाले के बैंक ने मना कर दिया',
      moneySafe: '₹1,999 आपके HDFC अकाउंट में वापस',
      trackerStep2: 'मना किया',
      statusBadge: 'रिफंड हो गया',
      statusHeadline: 'लेन-देन पूरा नहीं हो सका',
      statusSub:
        'चिंता न करें — ₹1,999 आपके HDFC अकाउंट में वापस आ चुके हैं। आप दोबारा भेज सकते हैं।',
      ctaPrimary: 'दोबारा कोशिश करें',
      ctaSecondary: 'हो गया',
    },
    trackerLabels: ['आपका बैंक', null, 'पाने वाले का बैंक'],
    trackerSub: ['HDFC', '', 'Kotak'],
    checkingIn: 'अगला अपडेट',
    safetyHeadline: 'पैसे कट गए? वो भी सुरक्षित हैं।',
    safetySub:
      'अगर बैंक से पैसे कटे दिखें, तो वो या तो तृप्तेश को मिल जाएंगे, या 3–5 कार्य दिवस में अपने आप वापस आ जाएंगे।',
    notifyTitle: 'WhatsApp पर बताएँ',
    notifySub: '+91 98••• ••210 · बार-बार चेक करने की ज़रूरत नहीं',
    txDetailsLabel: 'लेन-देन की जानकारी',
    viewDetails: 'पूरी जानकारी देखें',
    replay: 'फिर से चलाएँ',
  },
}

const FADE_IN_STYLE = { animation: 'statusFadeIn 350ms ease-out' }

/* ───────────────────────── Root ───────────────────────── */

export default function Pending({ simulateOutcome = 'none' }) {
  const [status, setStatus] = useState('pending')
  const [lang, setLang] = useState('en')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [notifyOn, setNotifyOn] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(simulateOutcome === 'none' ? 14 : 5)
  const [speaking, toggleSpeaking] = useTtsDemo()

  useEffect(() => {
    setStatus('pending')
    setSecondsLeft(simulateOutcome === 'none' ? 14 : 5)
  }, [simulateOutcome])

  useEffect(() => {
    if (status !== 'pending') return
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 0) {
          if (simulateOutcome !== 'none') {
            setStatus(simulateOutcome)
            return 0
          }
          return 14
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [status, simulateOutcome])

  const handleReplay = () => {
    setStatus('pending')
    setSecondsLeft(5)
  }

  const t = COPY[lang] || COPY.en

  // When the morph resolves to failed, render the comprehensive Failed screen.
  // Pending → Failed and the standalone Failed screen show identical content.
  if (status === 'failed') {
    return <Failed onReplay={simulateOutcome !== 'none' ? handleReplay : undefined} />
  }

  const s = t[status]
  const showReplay = status !== 'pending' && simulateOutcome !== 'none'

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB] relative">
      <div className="h-[54px] shrink-0" />

      <div className="flex-1 overflow-y-auto phone-scroll pb-3">
        <TopNav showReplay={showReplay} onReplay={handleReplay} replayLabel={t.replay} />
        <Hero status={status} s={s} />
        <StatusTracker status={status} t={t} />
        <StatusCard
          status={status}
          s={s}
          lang={lang}
          setLang={setLang}
          onMoreLang={() => setSheetOpen(true)}
          speaking={speaking}
          onSpeak={toggleSpeaking}
        />
        {status === 'pending' && <NotifyToggleRow t={t} on={notifyOn} setOn={setNotifyOn} />}
        <TxDetailsRow t={t} />
      </div>

      <Footer status={status} s={s} />

      <LanguageBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        lang={lang}
        setLang={setLang}
      />

      <ListenOverlay
        open={speaking}
        onClose={toggleSpeaking}
        headline={s.statusHeadline}
        sub={s.statusSub}
        lang={lang}
      />
    </div>
  )
}

/* ───────────────────────── Top Nav ───────────────────────── */

function TopNav({ showReplay, onReplay, replayLabel }) {
  return (
    <div className="px-3 pt-2 pb-1 flex items-center justify-between">
      <button aria-label="Back" className="p-2 text-slate-700">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex items-center gap-1 text-slate-700">
        {showReplay ? (
          <button
            onClick={onReplay}
            className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-[12px] font-bold border border-indigo-100"
            style={FADE_IN_STYLE}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
            </svg>
            {replayLabel}
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

const BADGE_STYLES = {
  amber: { box: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500', pulse: true },
  green: { box: 'bg-emerald-100 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500', pulse: false },
  orange: { box: 'bg-orange-100 text-orange-800 border-orange-200', dot: 'bg-orange-500', pulse: false },
}

function Hero({ status, s }) {
  const bs = BADGE_STYLES[s.badgeStyle]
  return (
    <div key={status} className="text-center px-6 pt-2 pb-3" style={FADE_IN_STYLE}>
      <div className="flex justify-center mb-3">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border flex items-center gap-1.5 ${bs.box}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${bs.dot} ${bs.pulse ? 'animate-pulse' : ''}`} />
          {s.badge}
        </span>
      </div>
      <p className="text-slate-700 text-[14px] font-semibold mt-0.5">{s.sub}</p>
      <p className="text-slate-400 text-[12px] mt-0.5">truptesh@superyes</p>
      <h2 className="text-[30px] font-extrabold text-slate-900 mt-2 tracking-tight">₹1,999</h2>
    </div>
  )
}

function MoneySafePill({ status, text }) {
  // Emphasize the pill on failed (refunded) — bigger, brighter
  const emphasize = status === 'failed'
  return (
    <div
      className={`text-green-700 rounded-full flex items-center gap-1 border shadow-sm ${
        emphasize
          ? 'bg-green-100 border-green-200 px-3 py-1.5'
          : 'bg-green-50 border-green-100 px-2.5 py-1'
      }`}
    >
      <svg width={emphasize ? 15 : 13} height={emphasize ? 15 : 13} viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" opacity="0.18" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-bold ${emphasize ? 'text-[11.5px]' : 'text-[10.5px]'}`}>{text}</span>
    </div>
  )
}

/* ───────────────────────── Status Tracker ───────────────────────── */

function StatusTracker({ status, t }) {
  const stepStates =
    status === 'pending'
      ? ['done', 'active', 'pending']
      : status === 'success'
      ? ['done', 'done', 'done']
      : ['done', 'failed', 'pending']

  const lineStates =
    status === 'pending' ? ['done', 'pending'] : status === 'success' ? ['done', 'done'] : ['done', 'reversal']

  const step2Label = t[status].trackerStep2

  return (
    <section className="bg-white mx-4 mt-3 rounded-2xl border border-gray-100 px-3 py-3 shadow-sm">
      <div className="flex items-start justify-between" key={status} style={FADE_IN_STYLE}>
        <Step state={stepStates[0]} label={t.trackerLabels[0]} sub={t.trackerSub[0]} />
        <Line state={lineStates[0]} />
        <Step state={stepStates[1]} label={step2Label} sub={t.trackerSub[1]} />
        <Line state={lineStates[1]} />
        <Step state={stepStates[2]} label={t.trackerLabels[2]} sub={t.trackerSub[2]} />
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

      {state === 'failed' && (
        <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-sm">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
      )}

      <span
        className={`text-[10.5px] font-semibold mt-1 text-center leading-tight whitespace-nowrap ${
          state === 'done'
            ? 'text-slate-700'
            : state === 'active'
            ? 'text-indigo-700'
            : state === 'failed'
            ? 'text-orange-700'
            : 'text-gray-400'
        }`}
      >
        {label}
      </span>
      {sub && <span className="text-[9.5px] text-gray-400 mt-px">{sub}</span>}
    </div>
  )
}

function Line({ state }) {
  if (state === 'reversal') {
    return (
      <svg className="flex-1 h-[3px] mt-[13px] mx-1" viewBox="0 0 100 3" preserveAspectRatio="none">
        <line x1="0" y1="1.5" x2="100" y2="1.5" stroke="#F97316" strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
      </svg>
    )
  }
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

const STATUS_CARD_STYLES = {
  pending: {
    bg: 'linear-gradient(180deg, #EEF2FF 0%, #F5F3FF 100%)',
    border: 'border-indigo-100',
    accent: 'text-indigo-700',
  },
  success: {
    bg: 'linear-gradient(180deg, #ECFDF5 0%, #F0FDF4 100%)',
    border: 'border-emerald-100',
    accent: 'text-emerald-700',
  },
  failed: {
    bg: 'linear-gradient(180deg, #FFF7ED 0%, #FFFBEB 100%)',
    border: 'border-orange-100',
    accent: 'text-orange-700',
  },
}

function StatusCard({ status, s, lang, setLang, onMoreLang, speaking, onSpeak }) {
  const cs = STATUS_CARD_STYLES[status]
  const variant = status === 'pending' ? 'indigo' : status === 'success' ? 'emerald' : 'indigo'

  return (
    <section
      key={status}
      className={`mx-4 mt-3 rounded-2xl border p-4 relative overflow-hidden ${cs.border}`}
      style={{ background: cs.bg, ...FADE_IN_STYLE }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className={`flex items-center ${cs.accent}`}>
          <StatusIcon status={status} />
          <span className="font-bold text-[10.5px] ml-1.5 uppercase tracking-wider">{s.statusBadge}</span>
        </div>
        <LanguageSelector
          lang={lang}
          setLang={setLang}
          onMore={onMoreLang}
          variant={variant}
          showSpeaker={false}
        />
      </div>
      <p className="text-[14px] font-bold text-slate-800 leading-snug">{s.statusHeadline}</p>
      <p className="text-[12.5px] text-slate-600 mt-1 leading-relaxed">{s.statusSub}</p>
      <UnsupportedLangHint lang={lang} />
      <div className={`mt-3 flex items-center ${status === 'pending' ? 'justify-between' : 'justify-end'}`}>
        {status === 'pending' && (
          <span className="inline-block bg-yellow-300 text-slate-800 px-2.5 py-1 rounded-full text-[10.5px] font-bold shadow-sm">
            {s.clearsPill}
          </span>
        )}
        <ListenButton speaking={speaking} onSpeak={onSpeak} variant={variant} lang={lang} />
      </div>
    </section>
  )
}

function StatusIcon({ status }) {
  if (status === 'success') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z" />
      </svg>
    )
  }
  if (status === 'failed') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 11a1 1 0 01-1-1V8a1 1 0 112 0v4a1 1 0 01-1 1zm0 4a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/* ───────────────────────── Safety card (pending only) ───────────────────────── */

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

/* ───────────────────────── Notify toggle (pending only) ───────────────────────── */

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

/* ───────────────────────── Footer (sticky) ───────────────────────── */

function Footer({ status, s }) {
  return (
    <div className="shrink-0 bg-white border-t border-gray-100 px-4 pt-3 pb-2.5 relative" key={status} style={FADE_IN_STYLE}>
      {status === 'failed' ? (
        <>
          <button className="w-full bg-[#B6F082] hover:bg-lime-300 active:bg-lime-400 text-slate-900 font-bold py-3.5 rounded-2xl shadow-sm transition text-[14.5px]">
            {s.ctaPrimary}
          </button>
          <button className="w-full text-slate-600 font-semibold py-2 mt-1 text-[13.5px]">{s.ctaSecondary}</button>
        </>
      ) : (
        <button className="w-full bg-[#B6F082] hover:bg-lime-300 active:bg-lime-400 text-slate-900 font-bold py-3.5 rounded-2xl shadow-sm transition text-[14.5px]">
          {s.cta}
        </button>
      )}
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
