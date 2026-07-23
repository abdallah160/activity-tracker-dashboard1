export default function Sidebar({ stateFunction }) {
    return <aside>
        <button onClick={() => stateFunction('Dashboard')}>Dashboard</button>
        <button onClick={() => stateFunction('Record')}>Record an Activity</button>
    </aside>
}