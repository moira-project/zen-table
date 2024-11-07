import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'], // 각 패키지의 stories 파일을 참조,
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'), // Storybook을 처음 사용하는 개발자나 팀이 쉽게 시작할 수 있도록 도와주는 애드온입니다. 초기 설정, 설명, 가이드 등을 제공합니다.
    getAbsolutePath('@storybook/addon-essentials'), // Storybook의 필수 기능을 묶은 번들, Docs, Controls, Actions, Viewport
    getAbsolutePath('@chromatic-com/storybook'), // Chromatic은 Storybook 기반의 시각적 테스트 및 자동화 도구로, UI 회귀 테스트에 사용
    getAbsolutePath('@storybook/addon-interactions'), // 컴포넌트의 상호작용을 테스트하고 시뮬레이션할 수 있게 도와주는 애드온
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'), // 스토리북은 기본적으로 단일 프레임워크를 쓰도록 설계됨.
    options: {},
  },
};

export default config;
