const { createProxyMiddleware } = require('http-proxy-middleware');

// Copied from https://create-react-app.dev/docs/proxying-api-requests-in-development/
// Apparently has to be js because no ts support, yet
module.exports = function(app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/', // remove base path
        },
      })
    );
  }
};