require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.static('public'));
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
