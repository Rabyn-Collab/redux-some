const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');

app.listen(3000);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


app.use(blogRoutes);

