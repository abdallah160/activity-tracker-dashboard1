export default function Sidebar({ stateFunction, viewState }) {
    return <aside>
        <button onClick={() => stateFunction('Dashboard')} className={viewState == 'Dashboard' ? 'clicked-button' : ''}>Dashboard</button>
        <button onClick={() => stateFunction('Record')} className={viewState == 'Record' ? 'clicked-button' : ''}>Record an Activity</button>
    </aside>
}