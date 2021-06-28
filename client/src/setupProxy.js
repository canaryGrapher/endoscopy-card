const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://endoscopy.encodable.tech',
      changeOrigin: true,
      headers: {
        "Connection": "keep-alive"
      },
    })
  );
};