module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 커밋 메시지의 타입(type)이 지정된 목록에 포함되어야 한다는 규칙
    'type-enum': [
      2, // 2는 "에러" 수준을 의미하며, 규칙 위반 시 커밋이 실패함
      'always', // 이 규칙이 항상 적용됨을 의미
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'refactor', // 리팩토링 (기능 추가가 아닌 코드 수정)
        'style', // 코드 스타일 변경 (예: 공백, 세미콜론 등)
        'docs', // 문서 추가/수정/삭제
        'build', // 빌드 시스템 수정 (npm, yarn 등)
        'test', // 테스트 추가/수정/삭제
        'perf', // 성능 개선
        'chore', // 이외 기타 작업
      ],
    ],
    // 커밋 메시지 제목에 마침표(.)가 붙지 않도록 강제
    'subject-full-stop': [1, 'never', '.'], // 1은 경고 수준, 제목 끝에 마침표 금지

    // 커밋 메시지의 헤더(타입과 제목)의 길이를 50자로 제한
    'header-max-length': [1, 'always', 50], // 1은 경고 수준, 제목은 50자 이하로 제한

    // 커밋 메시지의 본문에서 각 줄의 최대 길이를 72자로 제한
    'body-max-line-length': [1, 'always', 72], // 1은 경고 수준, 본문에서 각 줄은 72자 이하로 제한

    // 커밋 메시지의 타입이 소문자여야 함
    'type-case': [2, 'always', 'lower-case'], // 2는 에러 수준, 타입은 항상 소문자로 작성

    // 커밋 메시지에서 scope(괄호 안의 내용)를 비워두도록 강제
    'scope-empty': [1, 'always'], // 1은 경고 수준, scope는 항상 비워둠
    'references-empty': [2, 'never'], // 이슈 번호가 반드시 포함되도록 강제
  },
};
