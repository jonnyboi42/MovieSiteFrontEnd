import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    movieCart: {
        movie: "",  //Name of the Movie
        tickets: "", // Contains Number of tickets
        location: "", //Contains the Location For the tickets
        price: "" , //Contains total price of the transaction
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        
        setCart: (state, action) => {
            const { movie, tickets, location, price} = action.payload;

            state.movieCart = {
                movie: movie ?? state.movieCart.movie ,
                tickets: tickets ?? state.movieCart.tickets,
                location: location ?? state.movieCart.location,
                price: price ?? state.movieCart.price,
            };
            
        },

    },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;