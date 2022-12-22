import { createSlice } from "@reduxjs/toolkit";
import { getPostFromStorage, postAddtoStorage, removeFromStorage } from "../localdata";





const initialState = {
  posts: getPostFromStorage(),
  post: {
    title: '',
    detail: ''
  },
  isEdit: null,
  modalShow: false
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
        return post.id === newPost.id ? newPost : post;
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
    toggleModal: (state, action) => {
      state.modalShow = !state.modalShow;
    },
    toggleUpdate: (state, action) => {
      state.isEdit = action.payload;
    }
  }
});

export const { postAdd, postRemove, changePost, resetPost, toggleModal, toggleUpdate, postEdit } = postSlice.actions;

export default postSlice.reducer;
