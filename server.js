const express = require('express');
const path = require('path');
// everything outside the scope of express are involved here
const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception, shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    // connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   // app.get('*', (req, res) => {
//   //   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   // });
// }

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`The server run at ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandle Rejection, shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
