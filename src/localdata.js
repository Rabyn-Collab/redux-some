

export const postAddtoStorage = (post) => {
  localStorage.setItem('post', JSON.stringify(post));
}

export const removeFromStorage = (post) => {
  localStorage.setItem('post', JSON.stringify(post));
}


export const getPostFromStorage = () => {
  const result = localStorage.getItem('post')
  return result ? JSON.parse(result) : [];
}