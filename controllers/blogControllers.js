const { v4: uuidv4 } = require('uuid');
const Blog = require('../models/Blog');





module.exports.addBlog = async (req, res) => {
  const { title, detail } = req.body;

  try {
    const newBlog = new Blog({
      title,
      detail
    });

    await newBlog.save();

    return res.status(201).json(newBlog);
  } catch (err) {
    console.log(err);
  }




}



















const posts = [
  {

    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  }
];


// module.exports.getAllBlogs = (req, res) => {
//   return res.status(200).json(posts);
// }


// module.exports.getSingleBlog = (req, res) => {
//   const id = req.params.id;
//   const post = posts.find((p) => p.id === Number(id));
//   return res.status(200).json(post);
// }


// module.exports.addBlog = (req, res) => {
//   const { title, body } = req.body;
//   const newBlog = {
//     title,
//     body,
//     id: uuidv4()
//   };
//   posts.push(newBlog);
//   return res.status(200).json(newBlog);
// }