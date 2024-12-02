import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import MoviePage from './components/MoviePage/MoviePage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Home page */}
                <Route path="/" element={<Home />} />

                {/* Dynamic movie info route */}
                <Route path="/:location/movie/:id" element={<MoviePage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
