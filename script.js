const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

let sliderItems = document.querySelectorAll('.slider_item');
let currentItem = 0;
let isEnabled = true;

function moveItem(i) {
  currentItem = (i + sliderItems.length) % sliderItems.length;
}

function hideItem(direction) {
  isEnabled = false;
  sliderItems[currentItem].classList.add(direction);
  sliderItems[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  })
}

function showItem(direction) {
  sliderItems[currentItem].classList.add('next', direction);
  sliderItems[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  })
}

function prevItem(i) {
  hideItem('to-right');
  moveItem(i - 1);
  showItem('from-left');
}

function nextItem(i) {
  hideItem('to-left');
  moveItem(i + 1);
  showItem('from-right');
}

document.querySelector('.chev_left').addEventListener('click', function () {
  if (isEnabled) {
    prevItem(currentItem);
  }
});

document.querySelector('.chev_right').addEventListener('click', function (el) {
  if (isEnabled) {
    nextItem(currentItem);
  }
});