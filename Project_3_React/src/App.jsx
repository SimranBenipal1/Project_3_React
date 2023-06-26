import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './components/home/Home';
import { Dashboard } from './components/dashboard/Dashboard';
import { Error } from './components/error/Error';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
