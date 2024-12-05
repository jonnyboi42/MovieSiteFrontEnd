import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import MoviePage from './pages/MoviePage/MoviePage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Home page */}
                <Route path="/" element={<HomePage />} />

                {/* Dynamic movie info route */}
                <Route path="/:location/movie/:id" element={<MoviePage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
