const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const fileUpload = require('express-fileupload');
const path = require('path');
mongoose.set("strictQuery", false);


mongoose.connect(
  'mongodb+srv://Rabyn900:moles900@cluster0.sgaqpfh.mongodb.net/Blogs?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    app.listen(5000);
  });





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/tmp', express.static(path.join('tmp')))
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload({
  limits: {
    fileSize: 1024 * 1024
  },
  abortOnLimit: true,
  tempFileDir: path.join(__dirname, '/tmp/'),
  useTempFiles: true,
  createParentPath: true
}));




// const token = 'Bearer s;dlskfsd;lfk;lsdfksl;dfk';
// console.log(token.split(' ')[1]);
app.use(blogRoutes);
app.use(userRoutes);

