module.exports = {
  env: {
    browser: true, // 브라우저 환경에서 사용할 전역 변수(window, document 등)를 허용
    es2021: true, // 최신 ECMAScript 2021 기능 사용 허용
    node: true, // Node.js 환경에서 사용할 전역 변수(require, module 등)를 허용
  },
  parser: '@typescript-eslint/parser', // TypeScript 코드를 분석하기 위해 @typescript-eslint/parser를 사용
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // JSX 구문을 인식할 수 있도록 설정하여 React 파일을 처리할 수 있게 함
    },
  },
  settings: {
    'import/resolver': {
      typescript: {}, // TypeScript에서 tsconfig.json 파일의 경로 설정을 참고하여 import 경로를 올바르게 해석
    },
    react: {
      version: 'detect', // 프로젝트에서 사용하는 React 버전을 자동으로 감지하여 적절한 린트 규칙을 적용
    },
  },
  extends: [
    'eslint:recommended', // 기본적인 JavaScript 린트 규칙을 활성화
    'plugin:@typescript-eslint/recommended', // TypeScript 권장 린트 규칙을 활성화
    'plugin:react/recommended', // React 권장 린트 규칙을 활성화
    'plugin:react-hooks/recommended', // React Hooks 사용 시 권장 린트 규칙 활성화
    'prettier', // Prettier 설정과 충돌할 수 있는 규칙을 비활성화하여 코드 포맷팅 규칙을 Prettier에 맞춤
  ],
  plugins: [
    '@typescript-eslint', // TypeScript 관련 린트 규칙을 추가하기 위한 플러그인
    'react', // React 관련 린트 규칙을 추가하기 위한 플러그인
    'react-hooks', // React Hooks 관련 린트 규칙을 추가하기 위한 플러그인
    'prettier', // Prettier와 ESLint 통합을 위한 플러그인
  ],
};
