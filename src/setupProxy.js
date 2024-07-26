const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "http://localhost:3001", // 백엔드 서버 주소
      target: "http://192.168.42.142:3001", // 백엔드 서버 주소
      changeOrigin: true,
      cookieDomainRewrite: "localhost", // 프록시가 쿠키 도메인을 localhost로 재작성하도록 설정
    })
  );
};
