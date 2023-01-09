const path = require('path');
const fs = require('fs');

module.exports.imageValidate = async (req, res, next) => {

  if (!req.files) {
    return res.status(400).json('please send image');
  }

  const file = req.files.image;
  const extensionName = path.extname(file.name);
  const filesList = ['.png', '.jpg', '.jpeg'];

  if (!filesList.includes(extensionName)) {
    return res.status(422).json({ status: 'invalid image' });
  }

  // if (fs.existsSync(`./uploads/${file.name}`)) {
  //   return res.status(422).send("image already exist");
  // }

  file.mv('./uploads/' + file.name, (err) => {
    if (err) {
      return res.status(422).json({ status: 'something went wrong' });
    }
  })
  next();

}


