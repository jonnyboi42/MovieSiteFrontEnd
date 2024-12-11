import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedLocation: null, //Tracks the currently selected location
    selectedMovie: "",
    selectedMovieId: "",
    selectedMovieTicketPrice: "",
    selectedMovieShowTime: "",
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
        },

        setSelectedMovieTicketPrice: (state, action) =>{
            state.selectedMovieTicketPrice = action.payload;
        },
        setSelectedMovieTime: (state, action)=>{
            state.selectedMovieShowTime = action.payload;
        }
    }
})


export const { setLocation, setMovie, setMovieId, setSelectedMovieTicketPrice, setSelectedMovieTime} = movieSlice.actions;
export default movieSlice.reducer;