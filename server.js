const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//Bring in routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Add Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//DB Connect
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(error => console.log(error));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport.js')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//Production Server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
