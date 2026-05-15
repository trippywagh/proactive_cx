import { useState } from 'react'
import {
  LanguageBottomSheet,
  UnsupportedLangHint,
  useTtsDemo,
  ListenOverlay,
} from '../components/LanguagePicker'
import {
  ChatHeader,
  BotMessage,
  OptionGroup,
  OptionCard,
  ChatInput,
  StatusIconSuccess,
  TypingIndicator,
  useChatSequence,
} from '../components/ChatUi'

const COPY = {
  en: {
    title: 'Help',
    time: '1:02 PM',
    greeting: 'Hi Rahul Ji 👋',
    status: 'Your last 3 payments went through smoothly. Anything I can help with?',
    options: [
      { label: '₹1,999 to Truptesh Wagh', sub: '14 May · Successful', status: 'success' },
      { label: '₹432 to Google Play', sub: '13 May · Recharge · Successful', status: 'success' },
      { label: 'I have a different issue', variant: 'primary' },
    ],
    inputPlaceholder: 'Need help? Tell us more',
  },
  hi: {
    title: 'मदद',
    time: 'दोपहर 1:02',
    greeting: 'नमस्ते राहुल जी 👋',
    status: 'आपके पिछले तीनों payments सफलतापूर्वक हो गए। बताइए, मैं क्या मदद कर सकता हूँ?',
    options: [
      { label: '₹1,999 तृप्तेश वाघ को', sub: '14 मई · सफल', status: 'success' },
      { label: '₹432 Google Play पर', sub: '13 मई · रिचार्ज · सफल', status: 'success' },
      { label: 'मेरी कोई और दिक्कत है', variant: 'primary' },
    ],
    inputPlaceholder: 'मदद चाहिए? लिखकर बताएँ',
  },
}

export default function HelpAssistantAllGood() {
  const [lang, setLang] = useState('en')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [speaking, toggleSpeaking] = useTtsDemo()
  const step = useChatSequence()
  const t = COPY[lang] || COPY.en

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB] relative">
      <div className="h-[54px] shrink-0" />

      <ChatHeader title={t.title} lang={lang} setLang={setLang} onMoreLang={() => setSheetOpen(true)} />

      <div className="flex-1 overflow-y-auto phone-scroll pt-2 pb-3">
        {step >= 1 && <BotMessage time={t.time}>{t.greeting}</BotMessage>}
        {step === 2 && <TypingIndicator />}
        {step >= 3 && (
          <BotMessage time={t.time} hasSpeaker speaking={speaking} onSpeak={toggleSpeaking}>
            {t.status}
          </BotMessage>
        )}

        {step >= 4 && (
          <OptionGroup>
            {t.options.map((opt, i) => (
              <OptionCard
                key={i}
                label={opt.label}
                sub={opt.sub}
                variant={opt.variant}
                icon={opt.status === 'success' ? <StatusIconSuccess /> : null}
              />
            ))}
          </OptionGroup>
        )}

        <div className="ml-[44px] mr-3">
          <UnsupportedLangHint lang={lang} />
        </div>
      </div>

      <ChatInput placeholder={t.inputPlaceholder} />

      <LanguageBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        lang={lang}
        setLang={setLang}
      />
      <ListenOverlay
        open={speaking}
        onClose={toggleSpeaking}
        headline={t.greeting}
        sub={t.status}
        lang={lang}
      />
    </div>
  )
}
