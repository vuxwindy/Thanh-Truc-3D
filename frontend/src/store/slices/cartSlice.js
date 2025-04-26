import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartItems, addToCart, updateCartItem, removeFromCart, clearCart } from '../../services/cart.service';

// Async thunks
export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartItems();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await addToCart(productId, quantity);
      // Refresh cart after adding item
      dispatch(fetchCartItems());
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateItem',
  async ({ cartItemId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateCartItem(cartItemId, quantity);
      // Refresh cart after updating
      dispatch(fetchCartItems());
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async (cartItemId, { rejectWithValue, dispatch }) => {
    try {
      const response = await removeFromCart(cartItemId);
      // Refresh cart after removing
      dispatch(fetchCartItems());
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCartItems = createAsyncThunk(
  'cart/clearItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCart();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  total: 0,
  count: 0,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.count = action.payload.count;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear cart
      .addCase(clearCartItems.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
        state.count = 0;
      });
  }
});

export default cartSlice.reducer;