import './css/reset.css'
import './css/app.css'

import { Outlet } from 'react-router-dom'
import Header from './shared/components/Header.jsx'
import Footer from './shared/components/Footer.jsx'
function App() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Argent Bank - Home Page</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body>
        <Header />
        <Outlet />
        <Footer />
      </body>
    </html>
  )
}
export default App
