import { createSlice } from "@reduxjs/toolkit";
import { getPostFromStorage, postAddtoStorage, removeFromStorage } from "../localdata";





const initialState = {
  posts: getPostFromStorage(),
  post: {
    title: '',
    detail: ''
  },
  isEdit: null,
  showModal: false
};


const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postAdd: (state, action) => {
      postAddtoStorage([...state.posts, action.payload]);
      state.posts.push(action.payload);
    },
    postRemove: (state, action) => {
      state.posts.splice(action.payload, 1);
      removeFromStorage(state.posts);
    },
    postEdit: (state, action) => {
      const { newPost } = action.payload;
      state.posts = state.posts.map((post) => {
        return post.id === newPost.id ? newPost : post
      });
      postAddtoStorage(state.posts);
    },
    changePost: (state, action) => {

      state.post = action.payload;

    },
    resetPost: (state, action) => {
      state.post = {
        title: '',
        detail: ''
      };
    },
    isEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    modalShow: (state, action) => {
      state.showModal = !state.showModal;
    }

  }
});

export const { postAdd, postRemove, modalShow, isEdit, resetPost, changePost, postEdit } = postSlice.actions;

export default postSlice.reducer;
