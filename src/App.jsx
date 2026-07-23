import { useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import DefaultView from "./DefaultView";
function App() {
  const [viewState, setViewState] = useState('Default');
  let viewItem;
  if (viewState == 'Default') {
    viewItem = <DefaultView />

  }
  else if (viewState == 'Dashboard') {
    viewItem = <h1>Dashboard</h1>

  }
  else {
    viewItem = <h1>Record</h1>


  }

  return (
    <>
      <Header />
      <div id="body-elements">
        <Sidebar stateFunction={setViewState} />
        {viewItem}

      </div>



    </>
  )
}

export default App
