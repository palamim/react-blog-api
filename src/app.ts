import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import postsRouter from './routes/posts';

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
