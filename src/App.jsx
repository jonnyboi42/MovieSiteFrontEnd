import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import MoviePage from './pages/MoviePage/MoviePage';
import PurchaseTicketPage from './pages/PurchaseTicketPage/PurchaseTicketPage';
import CheckoutInfoPage from './pages/CheckoutInfoPage/CheckoutInfoPage';
function App() {
    return (
        <Router>
            <Routes>
                {/* Home page */}
                <Route path="/" element={<HomePage />} />

                {/* Purchase Ticket page */}
                <Route path="/purchase" element={<PurchaseTicketPage />} />


                {/* Purchase Ticket page */}
                <Route path="/checkout" element={<CheckoutInfoPage />} />

                {/* Dynamic movie info route */}
                <Route path="/:location/movie/:id" element={<MoviePage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
