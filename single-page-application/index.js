const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./routes/user.js')

const app = express()
const port = 3000
const assets = path.join(__dirname, '/assets/');

app.use(bodyParser.json());

app.use("/", routes);
app.use('/assets', express.static(assets));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
