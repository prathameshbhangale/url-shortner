// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: '',
  email: '',
  role: '',
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, role } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
      state.role = role;
    },

    setToken: (state,action) =>{
        state.token = action.payload;
    },

    setName: (state,action) =>{
        state.username = action.payload;
    },

    clearUser: (state) => {
      state.id = null;
      state.username = '';
      state.email = '';
      state.role = '';
      state.token = null;
    },
  },
});

export const { setUser, clearUser,setToken ,setName} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
