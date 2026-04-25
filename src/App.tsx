import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Pages/Home'
import Perfil from './components/Pages/Perfil'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App