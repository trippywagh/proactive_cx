import { useState, useEffect } from 'react'

const TRANSCRIPT = {
  en: "Hi Rahul Ji. Your ₹1,999 to Truptesh is in progress. The receiver's bank — Kotak — is responding a bit slowly today. This is completely normal. Most transactions complete within 30 minutes. Your money is safe. We'll send a WhatsApp message the moment it's done.",
  hi: 'नमस्ते राहुल जी। आपके ₹1,999 तृप्तेश को भेजे जा रहे हैं। पाने वाले का बैंक — कोटक — अभी थोड़ा धीरे काम कर रहा है। यह बिल्कुल सामान्य है। आमतौर पर 30 मिनट में काम हो जाता है। आपके पैसे सुरक्षित हैं। होते ही WhatsApp पर बता देंगे।',
}

const COPY = {
  en: {
    connecting: 'Connecting…',
    connected: 'Connected',
    speakingIn: 'in',
    callEnded: 'Call ended',
    needAnythingElse: 'Need anything else?',
    callAgain: 'Call again',
    goBack: 'Go back',
    speaker: 'Speaker',
    mute: 'Mute',
    unmute: 'Unmute',
  },
  hi: {
    connecting: 'जुड़ रहे हैं…',
    connected: 'जुड़ गए',
    speakingIn: 'में',
    callEnded: 'कॉल समाप्त',
    needAnythingElse: 'और कुछ चाहिए?',
    callAgain: 'फिर से कॉल',
    goBack: 'वापस जाएँ',
    speaker: 'स्पीकर',
    mute: 'म्यूट',
    unmute: 'अनम्यूट',
  },
}

const LANG_NATIVE = { en: 'English', hi: 'हिन्दी' }

export default function CallScreen({ open, onClose, lang = 'en' }) {
  const [state, setState] = useState('connecting')
  const [muted, setMuted] = useState(false)
  const [speakerOn, setSpeakerOn] = useState(false)
  const [activeWord, setActiveWord] = useState(-1)

  const langKey = lang === 'hi' ? 'hi' : 'en'
  const t = COPY[langKey]
  const transcript = TRANSCRIPT[langKey]
  const words = transcript.split(/\s+/).filter(Boolean)
  const langNative = LANG_NATIVE[langKey]

  // Reset state on open
  useEffect(() => {
    if (open) {
      setState('connecting')
      setActiveWord(-1)
      setMuted(false)
      setSpeakerOn(false)
    }
  }, [open])

  // Brief "connecting" delay then connected
  useEffect(() => {
    if (state !== 'connecting') return
    const id = setTimeout(() => setState('connected'), 1100)
    return () => clearTimeout(id)
  }, [state])

  // Word-by-word transcript reveal during connected state
  useEffect(() => {
    if (state !== 'connected') return
    setActiveWord(0)
    let i = 0
    const id = setInterval(() => {
      i++
      if (i >= words.length) {
        clearInterval(id)
        return
      }
      setActiveWord(i)
    }, 300)
    return () => clearInterval(id)
  }, [state, words.length])

  const handleEnd = () => setState('ended')
  const handleRedial = () => {
    setState('connecting')
    setActiveWord(-1)
  }

  if (!open) return null

  return (
    <div className="absolute inset-0 z-[60]" style={{ animation: 'slideUp 320ms ease-out' }}>
      {/* Gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #4338CA 0%, #3730A3 40%, #1E1B4B 100%)' }}
      />

      <div className="relative h-full flex flex-col">
        {/* Status-bar spacer */}
        <div className="h-[54px] shrink-0" />

        {/* Top-left back button */}
        <div className="px-4 pt-2 pb-1">
          <button
            onClick={onClose}
            aria-label="Back"
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md text-slate-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Hero: avatar + rings */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-2">
          <div className="relative w-[200px] h-[200px] flex items-center justify-center">
            {state !== 'ended' && (
              <>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none">
                  <circle
                    cx="100"
                    cy="100"
                    r="92"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="3"
                    strokeDasharray="360 220"
                    strokeLinecap="round"
                    style={{ animation: 'spin 2.4s linear infinite', transformOrigin: '100px 100px' }}
                  />
                </svg>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none">
                  <circle
                    cx="100"
                    cy="100"
                    r="75"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="3"
                    strokeDasharray="220 250"
                    strokeLinecap="round"
                    style={{ animation: 'spin 1.7s linear infinite reverse', transformOrigin: '100px 100px' }}
                  />
                </svg>
              </>
            )}

            <div className="w-[110px] h-[110px] rounded-full bg-white shadow-2xl flex items-center justify-center font-extrabold text-[32px] text-indigo-900 tracking-tight">
              SM
            </div>
          </div>

          {/* State text */}
          <div className="mt-7 text-center">
            {state === 'connecting' && (
              <p className="text-white text-[18px] font-semibold">{t.connecting}</p>
            )}
            {state === 'connected' && (
              <>
                <p className="text-white/75 text-[13px] font-medium">
                  {t.connected} {t.speakingIn} {langNative}
                </p>
                <Waveform />
              </>
            )}
            {state === 'ended' && (
              <>
                <p className="text-white text-[22px] font-extrabold">{t.callEnded}</p>
                <p className="text-white/70 text-[14px] mt-1">{t.needAnythingElse}</p>
              </>
            )}
          </div>

          {/* Live transcript */}
          {state === 'connected' && (
            <div className="mt-5 max-h-[160px] overflow-y-auto px-1">
              <p className="text-white text-[13.5px] leading-relaxed text-center font-medium">
                {words.map((w, i) => (
                  <span
                    key={i}
                    className={`transition-opacity duration-200 ${i <= activeWord ? 'opacity-100' : 'opacity-30'}`}
                  >
                    {w}{' '}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="px-6 pb-8">
          {(state === 'connecting' || state === 'connected') && (
            <>
              <div className="flex justify-around items-center mb-7">
                <ControlButton
                  active={speakerOn}
                  onClick={() => setSpeakerOn((v) => !v)}
                  label={t.speaker}
                  icon={<SpeakerIcon />}
                />
                <ControlButton
                  active={muted}
                  onClick={() => setMuted((v) => !v)}
                  label={muted ? t.unmute : t.mute}
                  icon={<MicIcon muted={muted} />}
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleEnd}
                  aria-label="End call"
                  className="w-[68px] h-[68px] bg-red-500 hover:bg-red-600 active:bg-red-700 active:scale-95 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/95 transition"
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{ transform: 'rotate(135deg)' }}>
                    <path d="M21 15.46l-5.27-.61a1 1 0 00-.83.27l-2.32 2.32a15.94 15.94 0 01-7.02-7.02l2.32-2.32a1 1 0 00.27-.83L7.54 2.99A1 1 0 006.55 2H3.05a1 1 0 00-1 1.05A18 18 0 0019.95 21a1 1 0 001.05-1v-3.55a1 1 0 00-.99-.99z" />
                  </svg>
                </button>
              </div>
            </>
          )}

          {state === 'ended' && (
            <div className="space-y-3">
              <button
                onClick={handleRedial}
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-[14.5px] flex items-center justify-center gap-2 shadow-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 15.46l-5.27-.61a1 1 0 00-.83.27l-2.32 2.32a15.94 15.94 0 01-7.02-7.02l2.32-2.32a1 1 0 00.27-.83L7.54 2.99A1 1 0 006.55 2H3.05a1 1 0 00-1 1.05A18 18 0 0019.95 21a1 1 0 001.05-1v-3.55a1 1 0 00-.99-.99z" />
                </svg>
                {t.callAgain}
              </button>
              <button onClick={onClose} className="w-full text-white/80 font-semibold py-2 text-[14px]">
                {t.goBack}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Waveform() {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className="flex items-end justify-center gap-[3px] h-5 mt-2.5">
      {bars.map((i) => (
        <span
          key={i}
          className="w-[3px] bg-white/70 rounded-full"
          style={{
            animation: `equalizerBar ${0.55 + (i % 4) * 0.12}s ease-in-out infinite`,
            animationDelay: `${i * 0.07}s`,
            height: '70%',
          }}
        />
      ))}
    </div>
  )
}

function ControlButton({ active, onClick, label, icon }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center transition active:scale-95 ${
          active ? 'bg-white text-indigo-700' : 'bg-white/15 text-white hover:bg-white/25'
        }`}
      >
        {icon}
      </div>
      <span className="text-[11px] text-white/80 font-medium">{label}</span>
    </button>
  )
}

function SpeakerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3z" />
      <path
        d="M16 8.5a4 4 0 010 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 5.5a8 8 0 010 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

function MicIcon({ muted }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path d="M19 11a7 7 0 01-14 0M12 18v3" />
      {muted && <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" />}
    </svg>
  )
}
