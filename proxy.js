const cors_anywhere = require('cors-anywhere');

const proxy = cors_anywhere.createServer({
  originWhitelist: [], // Allow all origins
});

const port = process.env.PORT || 8080;

proxy.listen(port, () => {
  console.log(`CORS Anywhere server is running on port ${port}`);
});
