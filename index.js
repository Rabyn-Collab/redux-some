const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');



mongoose.set("strictQuery", false);

mongoose.connect(
  'mongodb+srv://Rabyn900:moles900@cluster0.sgaqpfh.mongodb.net/Blogs?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {

    app.listen(3000);
  });




app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


app.use(blogRoutes);

