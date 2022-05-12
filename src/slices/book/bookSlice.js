import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// a thunk is a piece of code for performing async logic

// createAsyncThunk DISPATCHES ACTIONS AUTOMATICALLY! with a prefix of (in this case) 'book/getBooks'
// which are they?
// book/getBooks/pending
// book/getBooks/rejected
// book/getBooks/fulfilled

export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (url, thunkAPI) => {
    try {
      console.log('Fetching from the bookSlice!')
      let response = await fetch(url)
      // response is the response object, with the ok property, the status etc.
      if (response.ok) {
        let data = await response.json()
        // data now is the array of 6 books
        return data // this is the successfull outcome!
      } else {
        return thunkAPI.rejectWithValue() // in the case of a problem, we want to REJECT our async function
        // because fetch() doesn't reject ever, because it's a special type of Promise, we have to reject it manually
        // with a method coming from the thunkAPI parameter called rejectWithValue
      }
    } catch (error) {
      return thunkAPI.rejectWithValue()
    }
  }
)

// previously, the actions that got dispatched were changeUsername, addToCart, removeFromCart...
// now, I have getBooks/pending, getBooks/fulfilled or getBooks/rejected

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    stock: [],
    loading: false,
    error: false,
  },
  reducers: {}, // the properties of reducers are doing 2 things: 1) handling the logic (so defining
  // the state you're going to return out of this case, 2) and a method (exported) that you can invoke from other components
  extraReducers: {
    // the properties of extraReducers are doing just 1)
    // this extraReducers thing is mostly used JUST for createAsyncThunk

    // this case will be triggered if book/getBooks/pending is dispatched:
    [getBooks.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      }
    },
    // this case will be triggered if book/getBooks/fulfilled is dispatched:
    [getBooks.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        stock: action.payload,
      }
    },
    // this case will be triggered if book/getBooks/rejected is dispatched:
    [getBooks.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
      }
    },
  },
})

export default bookSlice.reducer
