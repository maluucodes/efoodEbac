import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Pages/Home'
import Perfil from './components/Pages/Perfil'
import Footer from './components/Footer'
import { store } from './store'
import { Provider } from 'react-redux'
import Cart from './components/Cart'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil/:id" element={<Perfil />} />
        </Routes>
        <Footer />
        <Cart />
      </BrowserRouter>
    </Provider>
  )
}

export default App