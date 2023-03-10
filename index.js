const express = require('express');
const app = express();
const path = require('path');
const home = require("./routes/home");

app.use(express.static('public'))
app.use("/home", home);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.listen(process.env.PORT || 3000);

module.exports = app;


// // Import packages
// const express = require("express");
// const home = require("./routes/home");

// // Middlewares
// const app = express();
// app.use(express.json());

// // Routes
// app.use(express.static('public'))
// app.use("/home", home);

// // index.js
// app.get('/', (req, res) => {
//   res.sendFile('index.html', {root: path.join(__dirname, 'public')});
// })

// // connection
// const port = process.env.PORT || 80;
// app.listen(port, () => console.log('Listening to port:', port));

// module.exports = app;