import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedLocation: null, //Tracks the currently selected location
    selectedMovie: "",
    selectedMovieId: "",
    cart: [] // Tracks Tickets Added To Cart

};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        //location management
        setLocation: (state,action) =>{
            state.selectedLocation = action.payload;
        },

        //Set Selected movie
        setMovie:(state, action) =>{
            state.selectedMovie = action.payload;
        },

        setMovieId: (state, action) =>{
            state.selectedMovieId = action.payload;
        }
    }
})


export const { setLocation, setMovie, setMovieId} = movieSlice.actions;
export default movieSlice.reducer;