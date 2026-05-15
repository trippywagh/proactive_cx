import { useState } from 'react'
import IPhoneMock from './components/IPhoneMock'
import Home from './screens/Home'
import HomeWithStatusPill from './screens/HomeWithStatusPill'
import Pending from './screens/Pending'
import PendingV2 from './screens/PendingV2'
import PendingDebited from './screens/PendingDebited'
import Failed from './screens/Failed'
import HelpAssistantAllGood from './screens/HelpAssistantAllGood'
import HelpAssistantPending from './screens/HelpAssistantPending'
import HelpAssistantFailed from './screens/HelpAssistantFailed'

const SCREENS = [
  { id: 'home', label: 'Home', Component: Home },
  { id: 'home-with-pill', label: 'Home (pending pill)', Component: HomeWithStatusPill },
  { id: 'pending', label: 'Pending', Component: Pending },
  { id: 'pending-v2', label: 'Pending v2', Component: PendingV2 },
  { id: 'pending-debited', label: 'Pending (debited)', Component: PendingDebited },
  { id: 'pending-success', label: 'Pending → Success', Component: () => <Pending simulateOutcome="success" /> },
  { id: 'pending-failed', label: 'Pending → Failed', Component: () => <Pending simulateOutcome="failed" /> },
  { id: 'failed', label: 'Failed', Component: Failed },
  { id: 'help-allgood', label: 'Help (all good)', Component: HelpAssistantAllGood },
  { id: 'help-pending', label: 'Help (pending)', Component: HelpAssistantPending },
  { id: 'help-failed', label: 'Help (failed)', Component: HelpAssistantFailed },
]

export default function App() {
  const [activeId, setActiveId] = useState('home')
  const active = SCREENS.find((s) => s.id === activeId) ?? SCREENS[0]
  const ActiveScreen = active.Component

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                activeId === s.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex justify-center py-10 px-4">
        <IPhoneMock>
          <ActiveScreen onNavigate={setActiveId} />
        </IPhoneMock>
      </div>
    </div>
  )
}
