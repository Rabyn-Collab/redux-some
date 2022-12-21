import { createSlice } from "@reduxjs/toolkit";
import { getPostFromStorage, postAddtoStorage } from "../localdata";





const initialState = {
  posts: getPostFromStorage()
};


const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postAdd: (state, action) => {
      postAddtoStorage([...state.posts, action.payload]);
      state.posts.push(action.payload);
    }
  }
});

export const { postAdd } = postSlice.actions;

export default postSlice.reducer;
