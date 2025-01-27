import type { StorybookConfig } from '@storybook/react-vite';
import { defineConfig } from 'vite';
import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 * 패키지의 절대 경로를 계산
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  //  Vite 설정 커스텀
  async viteFinal(config) {
    return defineConfig({
      ...config, //  기존 Storybook의 Vite 설정 유지
      resolve: {
        alias: {
          '@': '/src',
        },
      },
    });
  },
};
export default config;
