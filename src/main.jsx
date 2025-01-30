
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Redux Provider
import store from './redux/store.js'; // Import your Redux store

import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/HomePage/homepage.css';
import './components/Movies/movies.css';
import './assets/styles/styles.css';
import './components/Navbar/navbar.css';
import './components/Jumbo/jumbo.css';
import './components/MovieInfo/movieinfo.css';
import './components/Showtimes/showtimes.css';
import './components/PurchaseTickets/purchasetickets.css'
import './components/MediaQueries/mediaqueries.css';
import './components/CheckoutInfo/checkoutinfo.css';
import App from './App.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap your app in Provider */}
      <App />
    </Provider>
  </StrictMode>
);