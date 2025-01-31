/** @description 번들링 과정에서 CSS 파일을 처리하고 최적화하는 추가적인 설정을 정의 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {})
  }
};
