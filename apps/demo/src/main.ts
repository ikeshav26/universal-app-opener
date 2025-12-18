import { generateDeepLink } from 'universal-app-opener';

const urlInput = document.getElementById('urlInput') as HTMLInputElement;
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const outputSection = document.getElementById('outputSection') as HTMLDivElement;
const jsonOutput = document.getElementById('jsonOutput') as HTMLPreElement;
const iosBtn = document.getElementById('iosBtn') as HTMLButtonElement;
const androidBtn = document.getElementById('androidBtn') as HTMLButtonElement;

let currentResult: ReturnType<typeof generateDeepLink> | null = null;

generateBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  
  if (!url) {
    alert('Please enter a URL');
    return;
  }
  
  const result = generateDeepLink(url);
  currentResult = result;
  
  jsonOutput.textContent = JSON.stringify(result, null, 2);
  outputSection.classList.remove('hidden');
  
  iosBtn.disabled = !result.ios;
  androidBtn.disabled = !result.android;
});

iosBtn.addEventListener('click', () => {
  if (currentResult?.ios) {
    window.location.href = currentResult.ios;
  }
});

androidBtn.addEventListener('click', () => {
  if (currentResult?.android) {
    window.location.href = currentResult.android;
  }
});

urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});

