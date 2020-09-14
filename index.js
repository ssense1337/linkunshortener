const express = require('express');
const bypass = require('./bypass');
const app = express()
const port = process.env.PORT || 3000;
var bypasser = require('./bypass');

app.get('/api', (req, res) => {
    var urltobypass = req.query.url;

    res.end(bypasser.bypass(urltobypass))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})