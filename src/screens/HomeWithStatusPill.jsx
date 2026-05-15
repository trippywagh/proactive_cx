import Home from './Home'
import StatusPill from '../components/StatusPill'

export default function HomeWithStatusPill({ onNavigate }) {
  return (
    <div className="relative h-full">
      <Home />
      <div className="absolute bottom-[88px] left-6 right-6 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <StatusPill onTap={() => onNavigate?.('pending')} />
        </div>
      </div>
    </div>
  )
}
