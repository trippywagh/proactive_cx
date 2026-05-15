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
  StatusIconPending,
  TypingIndicator,
  useChatSequence,
} from '../components/ChatUi'

const COPY = {
  en: {
    title: 'Help',
    time: '1:21 PM',
    greeting: 'Hi Rahul Ji 👋',
    status:
      "Your ₹1,999 to Truptesh is still being processed. Usually clears in 2–5 min — we'll WhatsApp you the moment it's done.",
    options: [
      { label: 'Track this transaction', sub: '₹1,999 to Truptesh · pending since 1:19 PM', status: 'pending' },
      { label: 'I have a different issue', variant: 'primary' },
    ],
    inputPlaceholder: 'Need help? Tell us more',
  },
  hi: {
    title: 'मदद',
    time: 'दोपहर 1:21',
    greeting: 'नमस्ते राहुल जी 👋',
    status:
      'आपका ₹1,999 तृप्तेश को अभी process हो रहा है। आमतौर पर 2–5 मिनट में पूरा हो जाता है — पूरा होते ही हम WhatsApp पर बताएँगे।',
    options: [
      { label: 'इस लेन-देन को ट्रैक करें', sub: '₹1,999 तृप्तेश को · 1:19 PM से पेंडिंग', status: 'pending' },
      { label: 'मेरी कोई और दिक्कत है', variant: 'primary' },
    ],
    inputPlaceholder: 'मदद चाहिए? लिखकर बताएँ',
  },
}

export default function HelpAssistantPending() {
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
                icon={opt.status === 'pending' ? <StatusIconPending /> : null}
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
