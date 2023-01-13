const Blog = require('../models/Blog');
const User = require('../models/User');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

module.exports.getAllBlogs = async (req, res) => {
  const userId = req.userId;
  try {
    const response = await Blog.find().sort({ createdAt: -1 });

    // const response = await Blog.findOne({ _id: '63bb9e5a5d76def120cd3214' });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}


module.exports.getUserBlogs = async (req, res) => {
  const userId = req.userId;
  try {
    //  const response = await User.findOne({ _id: userId }, { 'blogs': 1 }).populate('blogs', 'title detail');
    const response = await User.findOne({ _id: userId }, { 'blogs': 1 }).populate('blogs');
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}


module.exports.addBlog = async (req, res) => {
  const { title, detail, } = req.body;
  const userId = req.userId;

  if (!req.files) {
    return res.status(400).json('please send image');
  }

  const file = req.files.image;

  const extensionName = path.extname(file.name);
  const filesList = ['.png', '.jpg', '.jpeg'];

  if (!filesList.includes(extensionName)) {
    res.status(422).json({ status: 'invalid image' });
  }

  file.mv(`./tmp/${file.name}`, (err) => {

  })

  cloudinary.config({
    cloud_name: 'dx5eyrlaf',
    api_key: '316226597746222',
    api_secret: 'YbnHayJ00pMZjzCnVFrois70iKc'
  });

  const result = await cloudinary.uploader.upload(`./tmp/${file.name}`, { upload_preset: 'sample_pics' });
  // fs.unlink(`./uploads/${file.name}`, (err) => {

  // })
  try {
    const newBlog = new Blog({
      title,
      detail,
      imageUrl: result.secure_url,
      public_id: result.public_id,
      author: userId
    });
    await newBlog.save();
    const user = await User.findOne({ _id: userId });
    user.blogs.push(newBlog);
    await user.save();

    return res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }




}



module.exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, detail, imageId } = req.body;
    if (imageId) {
      cloudinary.config({
        cloud_name: 'dx5eyrlaf',
        api_key: '316226597746222',
        api_secret: 'YbnHayJ00pMZjzCnVFrois70iKc'
      });

      await cloudinary.uploader.destroy(imageId);

      const file = req.files.image;

      await file.mv(`./tmp/${file.name}`, (err) => {

      })
      // if (fs.existsSync(`./uploads/${file.name}`)) {
      //   return res.status(400).json('image already exist');
      // }



      const result = await cloudinary.uploader.upload(`./tmp/${file.name}`, { upload_preset: 'sample_pics' });
      const response = await Blog.findByIdAndUpdate({ _id: id }, {
        title,
        detail,
        imageUrl: result.secure_url,
        public_id: result.public_id,
      });
      return res.status(200).json('successfully updated');


    } else {
      const response = await Blog.findByIdAndUpdate({ _id: id }, {
        title,
        detail,
      });
      return res.status(200).json('successfully updated');
    }


  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}




module.exports.removeBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { imageId } = req.body;
    const userId = req.userId;
    if (imageId) {
      cloudinary.config({
        cloud_name: 'dx5eyrlaf',
        api_key: '316226597746222',
        api_secret: 'YbnHayJ00pMZjzCnVFrois70iKc'
      });
      await cloudinary.uploader.destroy(imageId);
      const blog = await Blog.findOne({ _id: id });
      const user = await User.findOne({ _id: userId })
      user.blogs.pull(blog);
      await user.save();
      await Blog.findByIdAndDelete({ _id: id });
      return res.status(200).json('successfully removed');
    } else {
      return res.status(401).json('imageId is required');
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
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