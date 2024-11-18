import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Home/home.css'
import './components/MovieCarousel/movcarousel.css'
import './assets/styles/styles.css'
import './components/Navbar/navbar.css'
import './components/Jumbo/jumbo.css'
import './components/MediaQueries/mediaqueries.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
