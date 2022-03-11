const Router = require("express")
const path = require('path')
const fs = require('fs')

const router = Router();


router.get("/", (req, res) => {
  const pathName = path.join(__dirname, '../');
  res.sendFile('index.html', { root: pathName });
});

router.get("/api/v1/users", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, '../data/', 'user.json'));
  const userData = JSON.parse(data);
  res.json(userData);
});

router.post("/api/v1/users", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, '../data/', 'user.json'));
  const userData = JSON.parse(data);
  const { body } = req;
  console.log(userData)
  userData.data.push(body);

  fs.writeFile(path.join(__dirname, '../data/', 'user.json'),
    JSON.stringify(userData), () => console.log('Write success'))

  res.json(userData);
});

router.patch("/api/v1/users/:id", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, '../data/', 'user.json'));
  const userData = JSON.parse(data);
  const { body } = req;

  const index = userData.data.findIndex(x => x.uid == req.params.id);

  userData.data[index] = body
  userData.data[index].disabled = "disabled"

  fs.writeFile(path.join(__dirname, '../data/', 'user.json'),
    JSON.stringify(userData), () => console.log('Write success'))

  res.json(userData);
});

router.delete("/api/v1/users/:id", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, '../data/', 'user.json'));
  const userData = JSON.parse(data);
  const { body } = req;

  const index = userData.data.findIndex(x => x.uid == req.params.id);

  userData.data.splice(index, 1);

  fs.writeFile(path.join(__dirname, '../data/', 'user.json'),
    JSON.stringify(userData), () => console.log('Write success'))

  res.json(userData);
});

module.exports = router
