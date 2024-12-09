// src/store.js
// import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';


import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';


// const store = configureStore({
//     reducer: {
//         movie: movieReducer,
//     },
// });

// export default store;

// Redux Persist configuration
const persistConfig = {
    key: 'root', // Key for the persisted data in localStorage
    version: 1, // Version of the persisted store
    storage, // Storage engine
  };
  
  // Combine reducers (in case you add more reducers in the future)
  const rootReducer = combineReducers({
    movie: movieReducer, // Add the movie reducer
  });
  
  // Wrap the root reducer with persistReducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  // Configure the store with the persisted reducer
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Needed to avoid errors with non-serializable values in Redux Persist
      }),
  });
  
// Export the store and persistor
export const persistor = persistStore(store);
  


export default store;