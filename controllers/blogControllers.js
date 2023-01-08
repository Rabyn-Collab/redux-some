const { v4: uuidv4 } = require('uuid');
const Blog = require('../models/Blog');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2



module.exports.addBlog = async (req, res) => {
  const { title, detail } = req.body;
  if (!req.files) {
    return res.status(400).json({ status: "No files were uploaded." });
  }

  const file = req.files.image;
  const extensionName = path.extname(file.name);
  const allowedExtension = ['.png', '.jpg', '.jpeg'];

  if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send("Invalid Image");
  }


  // if (fs.existsSync(`./uploads/${file.name}`)) {
  //   return res.status(422).send("Invalid Image");
  // }

  file.mv('./uploads/' + file.name, (err) => {

  })


  try {

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });

    const result = await cloudinary.uploader.upload(req.file.path, { upload_preset: "sample_pics" });


    const newBlog = new Blog({
      title,
      detail,

    });

    await newBlog.save();

    return res.status(201).json({ h: 'hello' });
  } catch (err) {
    res.status(500).json(err);
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