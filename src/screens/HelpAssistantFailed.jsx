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
  StatusIconFailed,
  TypingIndicator,
  useChatSequence,
} from '../components/ChatUi'

const COPY = {
  en: {
    title: 'Help',
    time: '2:14 PM',
    greeting: 'Hi Rahul Ji 👋',
    status:
      "I see your ₹1,999 to Truptesh on 14 May didn't go through. The full ₹1,999 has been refunded to your HDFC account. Want to know what happened, or try sending again?",
    options: [
      { label: 'Tell me what happened', sub: '₹1,999 to Truptesh · 14 May', variant: 'primary', status: 'failed' },
      { label: 'Retry ₹1,999 to Truptesh', sub: 'Send the same amount again', variant: 'default' },
      { label: 'I have a different issue', variant: 'subtle' },
    ],
    inputPlaceholder: 'Need help? Tell us more',
  },
  hi: {
    title: 'मदद',
    time: 'दोपहर 2:14',
    greeting: 'नमस्ते राहुल जी 👋',
    status:
      'मुझे दिख रहा है कि 14 मई को आपका ₹1,999 तृप्तेश को नहीं पहुँचा। पूरे ₹1,999 आपके HDFC अकाउंट में वापस आ चुके हैं। बताएँ — क्या हुआ था जानना है, या दोबारा भेजने में मदद चाहिए?',
    options: [
      { label: 'मुझे बताएँ क्या हुआ था', sub: '₹1,999 तृप्तेश को · 14 मई', variant: 'primary', status: 'failed' },
      { label: 'दोबारा ₹1,999 तृप्तेश को भेजें', sub: 'वही राशि दोबारा भेजें', variant: 'default' },
      { label: 'मेरी कोई और दिक्कत है', variant: 'subtle' },
    ],
    inputPlaceholder: 'मदद चाहिए? लिखकर बताएँ',
  },
}

export default function HelpAssistantFailed() {
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
                icon={opt.status === 'failed' ? <StatusIconFailed /> : null}
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
