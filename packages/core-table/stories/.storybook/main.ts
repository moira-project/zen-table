import type { StorybookConfig } from '@storybook/html-vite';
import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: '@storybook/html-vite', // Vanilla JS에 맞는 프레임워크 설정
    options: {},
  },
};

export default config;
