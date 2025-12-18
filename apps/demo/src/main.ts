import { generateDeepLink, detectOS } from 'universal-app-opener';

const urlInput = document.getElementById('urlInput') as HTMLInputElement;
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const outputSection = document.getElementById('outputSection') as HTMLDivElement;
const jsonOutput = document.getElementById('jsonOutput') as HTMLPreElement;
const toggleDeepLinks = document.getElementById('toggleDeepLinks') as HTMLButtonElement;
const deepLinksContent = document.getElementById('deepLinksContent') as HTMLDivElement;
const exampleLinks = document.querySelectorAll('.example-link');

let currentResult: ReturnType<typeof generateDeepLink> | null = null;

function openLink(url: string) {
  const os = detectOS();
  const result = generateDeepLink(url);
  currentResult = result;
  
  let deepLink: string | null = null;
  
  if (os === 'ios' && result.ios) {
    deepLink = result.ios;
  } else if (os === 'android' && result.android) {
    deepLink = result.android;
  }
  
  if (deepLink && (os === 'ios' || os === 'android')) {
    window.location.href = deepLink;
    setTimeout(() => {
      window.location.href = result.webUrl;
    }, 2500);
  } else {
    window.open(result.webUrl, '_blank');
  }
  
  displayResult(result);
}

function displayResult(result: ReturnType<typeof generateDeepLink>) {
  jsonOutput.textContent = JSON.stringify(result, null, 2);
  outputSection.classList.remove('hidden');
}

exampleLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const url = link.getAttribute('data-url');
    if (url) {
      openLink(url);
    }
  });
});

generateBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  
  if (!url) {
    alert('Please enter a URL');
    return;
  }
  
  const result = generateDeepLink(url);
  currentResult = result;
  displayResult(result);
});

toggleDeepLinks.addEventListener('click', () => {
  const isHidden = deepLinksContent.classList.contains('hidden');
  deepLinksContent.classList.toggle('hidden');
  const toggleText = toggleDeepLinks.querySelector('.toggle-text') as HTMLElement;
  const toggleIcon = toggleDeepLinks.querySelector('.toggle-icon') as HTMLElement;
  
  if (isHidden) {
    toggleText.textContent = 'Hide Deep Links';
    toggleIcon.textContent = '▲';
  } else {
    toggleText.textContent = 'Show Deep Links';
    toggleIcon.textContent = '▼';
  }
});

urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});

