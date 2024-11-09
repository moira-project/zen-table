// Button.ts
export function createButton(label: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = label;
  button.className = 'custom-button';
  button.style.padding = '10px 20px';
  button.style.fontSize = '16px';
  button.style.cursor = 'pointer';

  button.onclick = () => {
    alert(`${label} button clicked`);
  };

  return button;
}
export default {
  title: 'CoreTable/Button',
  argTypes: {
    label: { control: 'text' },
  },
};

interface TemplateArgs {
  label: string;
}

const Template = ({ label }: TemplateArgs) => {
  return createButton(label);
};

export const Default = Template.bind({});
Default.args = {
  label: 'Click me',
};
