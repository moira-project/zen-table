module.exports = {
   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
   parser: '@typescript-eslint/parser',
   plugins: ['@typescript-eslint'],
   env: {
      browser: true,
      es2021: true,
   },
   rules: {
      // 프로젝트에 맞는 규칙 추가
   },
};
