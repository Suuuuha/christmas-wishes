const app = require('/server.js');

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log(`Christmas Magic is happening on port ${PORT}!`);
});
