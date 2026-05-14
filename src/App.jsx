import { useState } from 'react'
import IPhoneMock from './components/IPhoneMock'
import Home from './screens/Home'
import Pending from './screens/Pending'
import Failed from './screens/Failed'

const SCREENS = [
  { id: 'home', label: 'Home', Component: Home },
  { id: 'pending', label: 'Pending', Component: Pending },
  { id: 'pending-success', label: 'Pending → Success', Component: () => <Pending simulateOutcome="success" /> },
  { id: 'pending-failed', label: 'Pending → Failed', Component: () => <Pending simulateOutcome="failed" /> },
  { id: 'failed', label: 'Failed', Component: Failed },
]

export default function App() {
  const [activeId, setActiveId] = useState('home')
  const active = SCREENS.find((s) => s.id === activeId) ?? SCREENS[0]
  const ActiveScreen = active.Component

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="font-semibold text-slate-900 mr-4">
            super<span className="text-indigo-600">.money</span>{' '}
            <span className="text-slate-400 font-normal text-sm">prototype</span>
          </div>
          <div className="flex gap-2 overflow-x-auto">
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
        </div>
      </nav>

      <div className="flex justify-center py-10 px-4">
        <IPhoneMock>
          <ActiveScreen />
        </IPhoneMock>
      </div>
    </div>
  )
}
