const challenges = [
  'Select all elements on the farm',
  'Select all cows',
  'Select all wheat plants',
  'Select the pig named "rosie"',
  'Select the duck named "donald"',
  'Select all corn and wheat plants',
  'Select all cows and pigs',
  'Select the pig named "rosie" and the duck named "donald"',
  'Select all ducks on water',
  'Select all pigs that are running on the road',
  'Select all sleepy animals',
  'Select all plants that are ripe',
  'Select all plants that are ripe and all animals that are sleepy',
  'Select all corn plants that are ripe',
  'Select all sheep that are sleepy',
  'Select the duck next to a chicken',
  'Select the chicken next to a pig',
  'Select the cow that is next to the sleepy cow',
  'Select the chicken on the road and the sleepy chicken',
  'Select the ripe wheat plant next to the ripe corn plant',
  'Select the sleepy duck next to the duck named "donald"',
  'Select the duck that is next to "donald" and the sleepy duck',
  'Select the pigs on the road, the pig named "rosie", the sleepy chicken and the chicken next to it',
  'Select the third and fourth elements from the row of corn plants',
];

const storedSelectors = {};

let currentChallenge = 0;

const farm = document.querySelector('#farm');
const selectorLabel = document.querySelector('#selector-label');
const selectorInput = document.querySelector('#selector-input');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

function handleSelectorInputChange() {
  const s = selectorInput.value;

  const selector = s
    .trim()
    .replaceAll('chicken', 'element-chicken')
    .replaceAll('corn', 'element-corn')
    .replaceAll('cow', 'element-cow')
    .replaceAll('duck', 'element-duck')
    .replaceAll('pig', 'element-pig')
    .replaceAll('sheep', 'element-sheep')
    .replaceAll('road', 'area-road')
    .replaceAll('wheat', 'element-wheat')
    .replaceAll('water', 'area-water');

  farm.contentWindow.postMessage({ selector }, '*');
  storedSelectors[`selector${currentChallenge}`] = s;
}

function handleChallengeChange(newChallenge) {
  currentChallenge = newChallenge;

  prevButton.style.display = 'flex';
  nextButton.style.display = 'flex';
  if (newChallenge === 0) {
    prevButton.style.display = 'none';
  }
  if (newChallenge === challenges.length - 1) {
    nextButton.style.display = 'none';
  }

  selectorInput.value = storedSelectors[`selector${currentChallenge}`] || '';
  selectorLabel.innerHTML = `<span>${currentChallenge + 1}</span> ${
    challenges[currentChallenge]
  }`;

  farm.contentWindow.postMessage({ challenge: currentChallenge }, '*');
  handleSelectorInputChange();
}

function handlePrevButtonClick() {
  const newChallenge = currentChallenge - 1;
  if (newChallenge >= 0) {
    handleChallengeChange(newChallenge);
  }
}

function handleNextButtonClick() {
  const newChallenge = currentChallenge + 1;
  if (newChallenge <= challenges.length - 1) {
    handleChallengeChange(newChallenge);
  }
}

selectorInput.addEventListener('keyup', handleSelectorInputChange);

prevButton.addEventListener('click', handlePrevButtonClick);
nextButton.addEventListener('click', handleNextButtonClick);

function init() {
  handleChallengeChange(0);
}

farm.onload = function () {
  init();
};

init();
