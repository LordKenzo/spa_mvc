
const express = require('express');
const app = express();

const staticFileMiddleware = express.static('./public');
app.use(staticFileMiddleware);

app.use(staticFileMiddleware);

app.get('/users/1.json', (req, res) => {
  res.json({
    name: 'Lorenzo Franceschini'
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Spa MVC listening on port ${port}!`);
});