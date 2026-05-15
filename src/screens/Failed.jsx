import { useState } from 'react'
import {
  LanguageSelector,
  LanguageBottomSheet,
  UnsupportedLangHint,
  useTtsDemo,
  ListenOverlay,
} from '../components/LanguagePicker'

/* ───────────────────────── Copy ───────────────────────── */

const COPY = {
  en: {
    badge: 'PAYMENT FAILED',
    headline: "Payment didn't go through",
    sub: 'to Truptesh Wagh',
    refundLine: 'Refund initiated · ₹1,999 returning to your HDFC account',

    timelineLabel: 'REFUND TIMELINE',
    timeline: [
      { state: 'done', label: 'Refund initiated', sub: 'Today, 1:19 PM' },
      { state: 'active', label: 'Bank processing', sub: 'Expected by Fri, 16 May' },
      { state: 'pending', label: 'Credited to your HDFC account', sub: 'By Wed, 21 May · usually sooner' },
    ],
    timelineFootnote: 'NPCI guarantees auto-refund within 5 working days. Most refunds clear in 1–2.',

    whyBadge: 'WHY THIS HAPPENED',
    whyHeadline: "Receiver's bank (Kotak) declined the transaction",
    whySub:
      "Rahul Ji, this usually happens when the receiver's bank is temporarily overloaded or under maintenance. It's not your fault, and nothing is wrong with your account.",

    refLabel: 'REFUND REFERENCE',
    refValue: 'NRZ250514091819AB',
    refNote: "Share this with your bank if the refund hasn't arrived by Wed, 21 May.",
    refCopied: 'Copied',

    notifyTitle: 'Notify me on WhatsApp',
    notifySub: 'When ₹1,999 is back · +91 98••• ••210',

    txDetailsLabel: 'TRANSACTION DETAILS',
    txTime: '14 May 2026 · 1:19 PM',
    txId: 'UPI ID: 81689436479012739',
    viewDetails: 'View full details',

    ctaPrimary: 'Try sending again',
    replay: 'Replay',
  },
  hi: {
    badge: 'पेमेंट फेल',
    headline: 'पेमेंट पूरा नहीं हो सका',
    sub: 'तृप्तेश वाघ को',
    refundLine: 'रिफंड शुरू · ₹1,999 आपके HDFC अकाउंट में वापस आ रहे हैं',

    timelineLabel: 'रिफंड का सफर',
    timeline: [
      { state: 'done', label: 'रिफंड शुरू हुआ', sub: 'आज, दोपहर 1:19' },
      { state: 'active', label: 'बैंक प्रोसेस कर रहा है', sub: 'शुक्र, 16 मई तक' },
      { state: 'pending', label: 'आपके HDFC अकाउंट में जमा', sub: 'बुध, 21 मई तक · आमतौर पर जल्दी' },
    ],
    timelineFootnote: 'NPCI के नियम के अनुसार 5 कार्य दिवसों में रिफंड पक्का। ज़्यादातर 1–2 दिन में आ जाते हैं।',

    whyBadge: 'ऐसा क्यों हुआ',
    whyHeadline: 'पाने वाले के बैंक (कोटक) ने लेन-देन मना कर दिया',
    whySub:
      'राहुल जी, ऐसा तब होता है जब पाने वाले का बैंक कुछ देर के लिए धीमा या मेंटेनेंस में होता है। यह आपकी गलती नहीं है, और आपके अकाउंट में कोई दिक्कत नहीं है।',

    refLabel: 'रिफंड रेफरेंस',
    refValue: 'NRZ250514091819AB',
    refNote: 'अगर बुध, 21 मई तक रिफंड नहीं मिले, तो यह नंबर अपने बैंक को दिखाएँ।',
    refCopied: 'कॉपी हो गया',

    notifyTitle: 'WhatsApp पर बताएँ',
    notifySub: 'जब ₹1,999 वापस आएँ · +91 98••• ••210',

    txDetailsLabel: 'लेन-देन की जानकारी',
    txTime: '14 मई 2026 · दोपहर 1:19',
    txId: 'UPI ID: 81689436479012739',
    viewDetails: 'पूरी जानकारी देखें',

    ctaPrimary: 'दोबारा भेजने की कोशिश करें',
    replay: 'फिर से चलाएँ',
  },
}

const FADE_IN_STYLE = { animation: 'statusFadeIn 350ms ease-out' }

/* ───────────────────────── Root ───────────────────────── */

export default function Failed({ onReplay }) {
  const [lang, setLang] = useState('en')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [notifyOn, setNotifyOn] = useState(true)
  const [copied, setCopied] = useState(false)
  const [speaking, toggleSpeaking] = useTtsDemo()
  const t = COPY[lang] || COPY.en

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB] relative" style={FADE_IN_STYLE}>
      <div className="h-[54px] shrink-0" />

      <div className="flex-1 overflow-y-auto phone-scroll pb-3">
        <TopNav onReplay={onReplay} replayLabel={t.replay} />
        <Hero t={t} />
        <RefundTimeline t={t} />
        <WhyCard
          t={t}
          lang={lang}
          setLang={setLang}
          onMoreLang={() => setSheetOpen(true)}
          speaking={speaking}
          onSpeak={toggleSpeaking}
        />
        <RefundReferenceCard t={t} copied={copied} onCopy={handleCopy} />
        <NotifyToggleRow t={t} on={notifyOn} setOn={setNotifyOn} />
        <TxDetailsRow t={t} />
      </div>

      <Footer t={t} />

      <LanguageBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        lang={lang}
        setLang={setLang}
      />

      <ListenOverlay
        open={speaking}
        onClose={toggleSpeaking}
        headline={t.whyHeadline}
        sub={t.whySub}
        lang={lang}
      />
    </div>
  )
}

/* ───────────────────────── Top nav ───────────────────────── */

function TopNav({ onReplay, replayLabel }) {
  return (
    <div className="px-3 pt-2 pb-1 flex items-center justify-between">
      <button aria-label="Back" className="p-2 text-slate-700">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {onReplay ? (
        <button
          onClick={onReplay}
          className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-[12px] font-bold border border-indigo-100"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
          </svg>
          {replayLabel}
        </button>
      ) : (
        <button aria-label="Help" className="p-2 text-slate-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
      )}
    </div>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero({ t }) {
  return (
    <div className="text-center px-6 pt-2 pb-3">
      <div className="flex justify-center mb-3">
        <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-rose-200 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          {t.badge}
        </span>
      </div>

      <h1 className="text-[20px] font-bold text-slate-800">{t.headline}</h1>
      <p className="text-slate-700 text-[14px] font-semibold mt-0.5">{t.sub}</p>
      <p className="text-slate-400 text-[12px] mt-0.5">truptesh@superyes</p>
      <h2 className="text-[30px] font-extrabold text-slate-900 mt-2 tracking-tight">₹1,999</h2>

      <div className="flex justify-center mt-2.5 mx-2">
        <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-green-200 shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" opacity="0.18" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11.5px] font-bold leading-tight">{t.refundLine}</span>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Refund timeline (vertical) ───────────────────────── */

function RefundTimeline({ t }) {
  return (
    <section className="bg-white mx-4 mt-3 rounded-2xl border border-gray-100 px-4 py-4 shadow-sm">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">{t.timelineLabel}</p>
      <div>
        {t.timeline.map((step, i) => (
          <TimelineRow key={i} state={step.state} label={step.label} sub={step.sub} isLast={i === t.timeline.length - 1} />
        ))}
      </div>
      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{t.timelineFootnote}</p>
    </section>
  )
}

function TimelineRow({ state, label, sub, isLast }) {
  const lineColor = state === 'done' ? 'bg-green-500' : state === 'active' ? 'bg-gradient-to-b from-green-500 to-gray-200' : 'bg-gray-200'
  return (
    <div className="flex gap-3 relative">
      <div className="flex flex-col items-center">
        <TimelineDot state={state} />
        {!isLast && <div className={`w-[2px] flex-1 ${lineColor}`} style={{ minHeight: 26 }} />}
      </div>
      <div className={`flex-1 ${isLast ? '' : 'pb-3'}`}>
        <p
          className={`text-[13.5px] font-bold leading-tight ${
            state === 'done' ? 'text-slate-800' : state === 'active' ? 'text-indigo-700' : 'text-slate-500'
          }`}
        >
          {label}
        </p>
        <p className="text-[11.5px] text-gray-500 mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

function TimelineDot({ state }) {
  if (state === 'done') {
    return (
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm shrink-0">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )
  }
  if (state === 'active') {
    return (
      <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
        <svg className="absolute inset-0 w-6 h-6 animate-spin" viewBox="0 0 36 36" fill="none" style={{ animationDuration: '1.8s' }}>
          <circle cx="18" cy="18" r="16" stroke="#E0E7FF" strokeWidth="3.5" />
          <circle cx="18" cy="18" r="16" stroke="#4F46E5" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="32 100" />
        </svg>
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
      </div>
    )
  }
  return (
    <div className="w-6 h-6 rounded-full border-2 border-gray-200 bg-white shrink-0" />
  )
}

/* ───────────────────────── Why card (with EN/HI toggle) ───────────────────────── */

function WhyCard({ t, lang, setLang, onMoreLang, speaking, onSpeak }) {
  return (
    <section className="mx-4 mt-3 rounded-2xl border border-rose-100 p-4 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFF1F2 0%, #FFF7F7 100%)' }}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-rose-700">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-bold text-[10.5px] ml-1.5 uppercase tracking-wider">{t.whyBadge}</span>
        </div>
        <LanguageSelector
          lang={lang}
          setLang={setLang}
          onMore={onMoreLang}
          variant="rose"
          speaking={speaking}
          onSpeak={onSpeak}
        />
      </div>
      <p className="text-[14px] font-bold text-slate-800 leading-snug">{t.whyHeadline}</p>
      <p className="text-[12.5px] text-slate-600 mt-1.5 leading-relaxed">{t.whySub}</p>
      <UnsupportedLangHint lang={lang} />
    </section>
  )
}

/* ───────────────────────── Refund reference number ───────────────────────── */

function RefundReferenceCard({ t, copied, onCopy }) {
  return (
    <section className="mx-4 mt-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t.refLabel}</p>
      <div className="flex items-center justify-between mt-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
        <span className="font-mono text-[13px] font-bold text-slate-800 tracking-wide">{t.refValue}</span>
        <button onClick={onCopy} className="flex items-center gap-1 text-indigo-600 text-[11.5px] font-bold">
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {t.refCopied}
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <p className="text-[11.5px] text-gray-500 mt-2 leading-relaxed">{t.refNote}</p>
    </section>
  )
}

/* ───────────────────────── Notify toggle ───────────────────────── */

function NotifyToggleRow({ t, on, setOn }) {
  return (
    <section className="mx-4 mt-3 bg-green-50/60 rounded-2xl p-3.5 flex items-center justify-between border border-green-100">
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
        className={`relative w-12 h-7 rounded-full transition shrink-0 ${on ? 'bg-[#25D366]' : 'bg-gray-300'}`}
      >
        <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </section>
  )
}

/* ───────────────────────── Transaction details ───────────────────────── */

function TxDetailsRow({ t }) {
  return (
    <div className="text-center mt-5 mb-2 px-4">
      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t.txDetailsLabel}</p>
      <p className="text-[11.5px] text-gray-500 mt-1.5">{t.txId}</p>
      <p className="text-[11.5px] text-gray-400 mt-0.5">{t.txTime}</p>
      <button className="mt-2 text-indigo-600 text-[12.5px] font-bold border-b border-indigo-600/30 pb-0.5">{t.viewDetails}</button>
    </div>
  )
}

/* ───────────────────────── Footer (sticky) ───────────────────────── */

function Footer({ t }) {
  return (
    <div className="shrink-0 bg-white border-t border-gray-100 px-4 pt-3 pb-2.5">
      <button className="w-full bg-[#B6F082] hover:bg-lime-300 active:bg-lime-400 text-slate-900 font-bold py-3.5 rounded-2xl shadow-sm transition text-[14.5px]">
        {t.ctaPrimary}
      </button>

      <div className="flex items-center justify-center gap-2.5 mt-2 opacity-70">
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
