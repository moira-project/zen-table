// 간단한 버튼 컴포넌트
export function createButton(label: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = label;
  button.className = 'custom-button';
  button.onclick = () => alert(`${label} button clicked`);
  return button;
}
