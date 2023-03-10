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