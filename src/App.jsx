import { useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import DefaultView from "./DefaultView";
import Dashboard from "./Dashboard";
import RecordActivity from "./RecordActivity";
function App() {
  const [viewState, setViewState] = useState('Default');

  let viewItem;

  if (viewState == 'Default') {
    viewItem = <DefaultView />

  }
  else if (viewState == 'Dashboard') {
    viewItem = <Dashboard />
  }
  else {
    viewItem = <RecordActivity />
  }
  return (
    <>
      <Header />
      <div id="body-elements">
        <Sidebar stateFunction={setViewState} viewState={viewState} />
        {viewItem}
      </div>
    </>
  )
}

export default App
