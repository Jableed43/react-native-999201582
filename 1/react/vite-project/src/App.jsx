import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Componente funcional
function App({Component, nombre}) {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Hola mi nombre es: { nombre }</h2>
      { Component && <Component fontColor={"green"} />}
      { Component && <Component fontColor={"blue"}/>}
      { Component && <Component fontColor={"pink"}/>}
      { Component && <Component fontColor={"orange"}/>}
      { Component && <Component fontColor={"red"}/>}
      { Component && <Component fontColor={"violet"}/>}
      { Component && <Component fontColor={"yellow"}/>}
      { Component && <Component fontColor={"gray"}/>}
      { Component && <Component fontColor={"cyan"}/>}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
