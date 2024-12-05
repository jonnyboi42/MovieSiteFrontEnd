import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedLocation: null, //Tracks the currently selected location
    cart: [] // Tracks Tickets Added To Cart

};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        //location management
        setLocation: (state,action) =>{
            state.selectedLocation = action.payload
        }
    }
})


export const { setLocation } = movieSlice.actions;
export default movieSlice.reducer;