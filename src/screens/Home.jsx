// Home screen — super.money UPI tab
// Layout: status-bar spacer → header → scan hero → cards grid → bottom tab bar

export default function Home() {
  return (
    <div className="h-full flex flex-col bg-[#F4F3F8]">
      {/* Status-bar spacer (status bar is rendered by IPhoneMock as an overlay) */}
      <div className="h-[54px] shrink-0" />

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto phone-scroll pb-3">
        <Header />
        <ScanHero />
        <CardsGrid />
      </div>

      {/* Sticky bottom tab bar */}
      <TabBar />
    </div>
  )
}

/* ───────────────────────── Header ───────────────────────── */

function Header() {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-2">
      <button
        aria-label="Profile"
        className="w-10 h-10 rounded-full bg-white border-[1.5px] border-slate-900 flex items-center justify-center text-slate-900"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="3.2" />
          <path d="M5.5 19c1.2-3 3.7-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
        </svg>
      </button>

      <button className="px-3.5 py-2 rounded-full text-white font-bold text-[13px] flex items-center gap-1.5 shadow-sm" style={{ background: 'linear-gradient(95deg, #E14ADB 0%, #8B5CF6 100%)' }}>
        <SparkleIcon />
        Earn ₹250
      </button>

      <button aria-label="Notifications" className="w-10 h-10 flex items-center justify-center text-slate-900">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22a2.2 2.2 0 002.2-2.2H9.8A2.2 2.2 0 0012 22zm7-6.3v-4.4c0-3.42-1.84-6.28-5-7.04V3.5a2 2 0 10-4 0v.76C6.83 5.02 5 7.88 5 11.3v4.4l-2 2v1h18v-1l-2-2z" />
        </svg>
      </button>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2z" />
      <circle cx="19" cy="4" r="1.2" />
      <circle cx="5" cy="18" r="1.2" />
    </svg>
  )
}

/* ───────────────────────── Scan Hero ───────────────────────── */

function ScanHero() {
  return (
    <div
      className="mx-4 mt-1 rounded-3xl p-3 pb-4 relative overflow-hidden"
      style={{ background: 'radial-gradient(120% 120% at 0% 0%, #6B5BF0 0%, #4B3EE0 55%, #3D32C7 100%)' }}
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/></svg>\")",
        }}
      />

      {/* Scan frame */}
      <div className="relative mx-auto" style={{ width: 192, height: 192 }}>
        {/* Green corner brackets */}
        <CornerBracket className="top-0 left-0" rotate={0} />
        <CornerBracket className="top-0 right-0" rotate={90} />
        <CornerBracket className="bottom-0 right-0" rotate={180} />
        <CornerBracket className="bottom-0 left-0" rotate={270} />

        {/* Stylized QR mark behind text */}
        <div className="absolute inset-5 opacity-60">
          <QRMark />
        </div>

        {/* Tap to scan label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-[15px] drop-shadow">Tap to scan</span>
        </div>
      </div>

      {/* Cashback line */}
      <div className="relative flex items-center justify-center gap-1.5 mt-3 text-white text-[12.5px] font-semibold">
        <LightningIcon />
        Get 5%* cashback on scan &amp; pay
      </div>

      {/* Action buttons */}
      <div className="relative grid grid-cols-2 gap-2.5 mt-3">
        <HeroActionButton icon={<SendIcon />} label="Send Money" />
        <HeroActionButton icon={<BankIcon />} label="Check Balance" />
      </div>
    </div>
  )
}

function CornerBracket({ className = '', rotate = 0 }) {
  return (
    <div className={`absolute ${className}`} style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'center' }}>
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M2 14V8a6 6 0 016-6h6" stroke="#C8F25D" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function QRMark() {
  // Decorative QR-style mark in the same indigo family — placeholder for super.money brand mark.
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="#3D32C7">
      {/* Top-left block */}
      <rect x="6" y="6" width="34" height="34" rx="6" />
      <rect x="14" y="14" width="18" height="18" rx="3" fill="#6B5BF0" />
      {/* Top-right block */}
      <rect x="60" y="6" width="34" height="34" rx="6" />
      <rect x="68" y="14" width="18" height="18" rx="3" fill="#6B5BF0" />
      {/* Bottom-left block */}
      <rect x="6" y="60" width="34" height="34" rx="6" />
      <rect x="14" y="68" width="18" height="18" rx="3" fill="#6B5BF0" />
      {/* Bottom-right scattered cells */}
      <rect x="60" y="60" width="14" height="14" rx="3" />
      <rect x="78" y="60" width="14" height="14" rx="3" />
      <rect x="60" y="78" width="14" height="14" rx="3" />
      <rect x="78" y="78" width="14" height="14" rx="3" />
    </svg>
  )
}

function LightningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#A3E635">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  )
}

function HeroActionButton({ icon, label }) {
  return (
    <button className="bg-white/15 hover:bg-white/20 active:bg-white/25 transition rounded-2xl py-2.5 flex items-center justify-center gap-1.5 text-white font-semibold text-[13px]">
      {icon}
      {label}
    </button>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <path d="M3 19c1-3 3.5-4.5 6-4.5s5 1.5 6 4.5" />
      <path d="M16 7l4-4m0 4V3h-4" />
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
      <path d="M3 20h18" />
    </svg>
  )
}

/* ───────────────────────── Cards Grid ───────────────────────── */

function CardsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 mt-3">
      {/* Left column */}
      <div className="flex flex-col gap-3">
        <SuperCardProCard />
        <SuperAccountCard />
      </div>
      {/* Right column */}
      <div className="flex flex-col gap-3">
        <PhoneBillsCard />
        <FlightsCard />
      </div>
    </div>
  )
}

function SuperCardProCard() {
  return (
    <div
      className="relative rounded-2xl p-4 pb-7 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFFFFF 0%, #F3EFFE 60%, #FCE7F3 100%)',
        minHeight: 260,
      }}
    >
      <h3 className="font-extrabold text-slate-900 text-[17px] leading-tight">superCard Pro</h3>
      <p className="text-slate-500 text-[12.5px] mt-1">FLAT 3% on every payment!</p>

      <div className="mt-2 flex items-center justify-center">
        <img src="./assets/supercard-pro.png" alt="superCard Pro" className="w-[150px] h-auto" />
      </div>

      {/* Floating badges */}
      <div className="absolute left-2 top-[125px] bg-white rounded-full px-2 py-1 shadow-md text-[10px] font-bold text-pink-600 flex items-center gap-1">
        <span className="text-pink-500">★</span> Flat 3%
        <span className="text-slate-400 font-normal ml-0.5">cashback</span>
      </div>
      <div className="absolute right-1 top-[180px] bg-white rounded-full px-2 py-1 shadow-md text-[10px] font-bold text-emerald-600 flex items-center gap-1">
        ₹6,000
        <span className="text-slate-400 font-normal ml-0.5">saving</span>
      </div>

      {/* LIFETIME FREE ribbon */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-extrabold tracking-wider text-emerald-600">
        LIFETIME FREE
      </div>
    </div>
  )
}

function SuperAccountCard() {
  return (
    <div className="rounded-2xl bg-white p-3 flex items-center justify-between" style={{ background: 'linear-gradient(120deg, #FFFFFF 0%, #FCE7F3 100%)' }}>
      <div>
        <h3 className="font-extrabold text-slate-900 text-[15px] leading-tight">superAccount</h3>
        <p className="text-slate-500 text-[11.5px] mt-0.5">Card + FD + Savings</p>
      </div>
      <img src="./assets/kotak-logo.png" alt="kotak" className="h-7 w-auto object-contain" />
    </div>
  )
}

function PhoneBillsCard() {
  return (
    <div className="rounded-2xl p-3 pb-3.5 flex-1" style={{ background: 'linear-gradient(160deg, #E8FBE9 0%, #C9F5CD 100%)' }}>
      <div className="h-[100px] flex items-center justify-center">
        <img src="./assets/phone-bills.png" alt="Phone bills" className="h-[100px] w-auto object-contain" />
      </div>
      <h3 className="font-extrabold text-slate-900 text-[15px] mt-2 leading-tight">Phone bills</h3>
      <p className="text-slate-500 text-[11.5px] mt-0.5">10% off on airtel</p>
    </div>
  )
}

function FlightsCard() {
  return (
    <div className="rounded-2xl p-3 pb-3.5 flex-1" style={{ background: 'linear-gradient(160deg, #DCEEFE 0%, #B6D9FB 100%)' }}>
      <div className="h-[100px] overflow-hidden rounded-lg">
        <img src="./assets/flights.png" alt="Flights" className="w-full h-full object-cover" />
      </div>
      <h3 className="font-extrabold text-slate-900 text-[15px] mt-2 leading-tight">Flights</h3>
      <p className="text-slate-500 text-[11.5px] mt-0.5">Flat 5% discount</p>
    </div>
  )
}

/* ───────────────────────── Bottom Tab Bar ───────────────────────── */

function TabBar() {
  return (
    <div className="shrink-0 bg-white border-t border-slate-200 relative">
      <div className="grid grid-cols-5 pt-2 pb-1.5">
        <TabItem icon={<UPIIcon active />} label="UPI" active />
        <TabItem icon={<CardTabIcon />} label="Card" />
        <TabItem icon={<FDIcon />} label="FD" badge="New" />
        <TabItem icon={<RewardsIcon />} label="Rewards" />
        <TabItem icon={<HistoryIcon />} label="History" />
      </div>
      {/* iOS home indicator */}
      <div className="flex justify-center pb-1.5">
        <div className="w-[120px] h-[5px] bg-slate-900 rounded-full" />
      </div>
    </div>
  )
}

function TabItem({ icon, label, active = false, badge }) {
  return (
    <button className="flex flex-col items-center gap-0.5 relative">
      <div className={active ? 'text-indigo-600' : 'text-slate-400'}>{icon}</div>
      <div className={`text-[11px] font-semibold ${active ? 'text-indigo-600' : 'text-slate-500'}`}>
        {label}
      </div>
      {badge && (
        <span className="absolute top-[-4px] right-[14px] bg-red-500 text-white text-[8.5px] font-bold px-1.5 py-[1px] rounded-md rounded-bl-none">
          {badge}
        </span>
      )}
    </button>
  )
}

function UPIIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#4F46E5' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M5 4h9l5 5v11a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
      <path d="M8 11l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CardTabIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="6" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19" />
    </svg>
  )
}

function FDIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l5-5 4 4 8-9" />
      <path d="M14 7h6v6" />
    </svg>
  )
}

function RewardsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8" />
      <path d="M12 8c-2-3-5-3-5-1s2 1 5 1zM12 8c2-3 5-3 5-1s-2 1-5 1z" />
    </svg>
  )
}

function HistoryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  )
}
