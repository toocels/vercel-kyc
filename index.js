// Import packages
const express = require("express");
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use(express.static('public'))
app.use("/home", home);

// index.js
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

// connection
const port = process.env.PORT || 80;
app.listen(port, () => console.log('Listening to port:', port));

module.exports = app;