import './css/reset.css'
import './css/app.css'

import { Outlet } from 'react-router-dom'
import Header from './shared/components/Header.jsx'
import Footer from './shared/components/Footer.jsx'
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
export default App
