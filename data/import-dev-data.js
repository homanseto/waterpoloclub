const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/courseModel');
const Event = require('../models/eventModel');
const User = require('../models/userModel');

dotenv.config({ path: './config.env' });

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
  })
  .catch((err) => {
    console.log(err);
  });

// Read JSON file
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/courseData.json`, 'utf-8')
);
const events = JSON.parse(
  fs.readFileSync(`${__dirname}/eventsData.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/userData.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Course.create(courses);
    await Event.create(events);
    await User.create(users);
    console.log('data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Course.deleteMany();
    await Event.deleteMany();
    await User.deleteMany();
    console.log('data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
