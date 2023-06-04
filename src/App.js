import './css/reset.css'
import './css/app.css'

import { Outlet } from 'react-router-dom'
import Header from './shared/components/Header.jsx'
import Footer from './shared/components/Footer.jsx'
import { ConnexionProvider } from './shared/context/connexion.js'

function App() {
  return (
    <ConnexionProvider>
      <Header />
      <Outlet />
      <Footer />
    </ConnexionProvider>
  )
}
export default App
