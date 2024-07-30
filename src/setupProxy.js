const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001",
      // target: "http://www.pinjun.xyz:3001", // 백엔드 서버 주소
      // target: "http://192.168.42.142:3001", // 백엔드 서버 주소
      changeOrigin: true,

      pathRewrite: {
        '^/api': '', // '/api' 경로를 제거하고 백엔드 서버로 전달
      },
      // cookieDomainRewrite: "www.pinjun.xyz", // 프록시가 쿠키 도메인을 localhost로 재작성하도록 설정
      cookieDomainRewrite: "localhost",

    })
  );
};
