const { createProxyMiddleware } = require('http-proxy-middleware');
const { API_URL } = require('./config');

// Copied from https://create-react-app.dev/docs/proxying-api-requests-in-development/
// Apparently has to be js because no ts support, yet
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/', // remove base path
      },
    })
  );
};