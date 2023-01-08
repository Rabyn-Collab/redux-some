const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const fileUpload = require("express-fileupload");
const path = require("path");

mongoose.set("strictQuery", false);

mongoose.connect(
  'mongodb+srv://Rabyn900:moles900@cluster0.sgaqpfh.mongodb.net/Blogs?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    app.listen(3000);
  });




app.use('/uploads', express.static(path.join('uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload({
  limits: {
    fileSize: 1024 * 1024 // 1 MB
  },
  abortOnLimit: true
}));



app.use(blogRoutes);

