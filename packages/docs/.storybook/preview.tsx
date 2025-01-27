import type { Preview } from '@storybook/react';

const preview: Preview = {
  // 스토리 실행 결과를 가로채서 추가 작업을 수행
  decorators: [
    Story => {
      const storyResult = Story();
      if (storyResult instanceof HTMLElement) {
        // Vanilla JS DOM 요소를 반환할 경우
        const wrapper = document.createElement('div');
        wrapper.appendChild(storyResult);
        return <div dangerouslySetInnerHTML={{ __html: wrapper.innerHTML }} />;
      }
      return storyResult;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
