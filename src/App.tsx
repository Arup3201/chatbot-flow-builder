import FlowBuilder from './components/flow-builder'
import NodesPanel from './components/nodes-panel'
import './App.css'

function App() {

  return (
    <div>
      <header></header>
      <main>
        <FlowBuilder />
        <NodesPanel />
      </main>
    </div>
  )
}

export default App
