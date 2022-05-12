import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../slices/cart/cartSlice'
import userReducer from '../slices/user/userSlice'
import bookReducer from '../slices/book/bookSlice'

export default configureStore({
  // let's define our reducers
  reducer: {
    cart: cartReducer,
    // the name "cart" should match the name of the slice!
    user: userReducer,
    book: bookReducer,
  },
})

// this file is just setting up the Redux Store, and this implementation is valid for ANY JS application
// we want now to provide this engine to our REACT application! we have to inform our Components about it

// SLICES
// slices in Redux are store chunks. you can have as many slices as you like.
// every slice/chunk is going to be self-mantained.
// let's create a slice for the cart!
