import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedLocation: null, // Tracks the currently selected location
    category: "Now Playing", // Tracks the current category of movies (e.g., "Now Playing" or "Coming Soon")

    selectedMovie: {
        id: "",
        name: "",
        ticketPrice: 0,
        showTime: "",
        director: "",
        runtime: "",
    },
    cart: [], // Tracks Tickets Added To Cart
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        // Location management
        setLocation: (state, action) => {
            state.selectedLocation = action.payload;
        },

        //Category Management 
        setCategory: (state, action) =>{
            state.category = action.payload;
        },

        // Update selected movie details
        setSelectedMovie: (state, action) => {
            const { id, name, ticketPrice, showTime, director, runtime } = action.payload;
            state.selectedMovie = {
                id: id ?? state.selectedMovie.id,
                name: name ?? state.selectedMovie.name,
                ticketPrice: ticketPrice ?? state.selectedMovie.ticketPrice,
                showTime: showTime ?? state.selectedMovie.showTime,
                director: director ?? state.selectedMovie.director,
                runtime: runtime ?? state.selectedMovie.runtime,
            };
        },
    },
});

export const { setLocation, setCategory, setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
