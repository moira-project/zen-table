// VanillaButton.stories.js
export default {
  title: 'Vanilla/Button', // 스토리 제목
};

export const Primary = () => {
  const button = document.createElement('button');
  button.innerText = 'Click Me!';
  button.onclick = () => alert('Button clicked!');
  return button;
};
