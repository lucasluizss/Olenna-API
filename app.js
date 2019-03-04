import express from 'express';
import analyzer from 'body-parser';

const app = express();

app.use(analyzer.json());

app.use((req, res, next) => {
  res.status(200).json({
    message: 'Hello World!'
  });
});

export default app;