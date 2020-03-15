const pictures = document.querySelectorAll('.picture span');
const tags = document.querySelectorAll('.tag');
const anchors = document.querySelectorAll('a[href*="#"]');
const popupDiv = document.querySelector('.popup');

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
  });

}
function showItem(direction) {
  sliderItems[currentItem].classList.add('next', direction);
  sliderItems[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });

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

document.querySelector('.chev_right').addEventListener('click', function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

document.querySelector('.iphone_vertical').addEventListener('click', function () {
  let screen = document.querySelector('.iphone_vertical .screen');
  if (screen.classList.contains('black-screen')) {
    screen.classList.remove('black-screen');
    screen.classList.add('screen1');
  } else {
    screen.classList.add('black-screen');
    screen.classList.remove('screen1');
  }
});

document.querySelector('.iphone_horizontal').addEventListener('click', function () {
  let screen = document.querySelector('.iphone_horizontal .screen');
  if (screen.classList.contains('black-screen')) {
    screen.classList.remove('black-screen');
    screen.classList.add('screen2');
  } else {
    screen.classList.add('black-screen');
    screen.classList.remove('screen2');
  }
});

for (let tag of tags) {
  tag.addEventListener('click', function () {
    let pinned = document.querySelector('.pinned');

    if (!this.classList.contains('pinned')) {
      pinned.classList.remove('pinned');
      shufflePictures();
      this.classList.add('pinned');
    }
  });
}

function shufflePictures() {
  for (let picture of pictures) {
    if (picture.classList.contains('bordered')) {
      picture.classList.remove('bordered');
      incrementPictureNumber(picture);
      picture.classList.add('bordered');
    } else {
      incrementPictureNumber(picture);
    }
  }
}

function incrementPictureNumber(picture) {
  let number = picture.classList.item(0).substr(7);
  let newNumber = (12 + parseInt(number)) % 12 + 1;
  let newStyle = picture.classList.item(0).replace(number, newNumber +'');

  picture.classList.remove('picture' + number);
  picture.classList.add(newStyle);
}

for (let picture of pictures) {
  picture.addEventListener('click', function () {
    if (!picture.classList.contains('bordered')) {
      borderPicture(picture);
    } else {
      picture.classList.remove('bordered');
    }
  });
}

function borderPicture(item) {
  for (let picture of pictures) {
    if (picture.classList.contains('bordered')) {
      picture.classList.remove('bordered');
    }
  }
  item.classList.add('bordered');
}

function popup() {
  let subject = document.querySelector('.comment_subject').getAttribute('value');
  let popupSubject = document.querySelector('.popup-subject');
  if (subject != '') {
    popupSubject.setAttribute('value', 'Subject: ' + subject);
  } else {
    popupSubject.setAttribute('value', 'Without subject')
  }

  let description = document.querySelector('.comment_description').getAttribute('value');
  let popupDescription = document.querySelector('.popup-description');
  if (description != '') {
    popupDescription.setAttribute('value', 'Description: ' + description);
  } else {
    popupDescription.setAttribute('value', 'Without description')
  }
  popupDiv.style.display ='block';
}

document.querySelector('.popupOkButton').addEventListener('click', function () {
  closePopup();
});

function closePopup() {
  popupDiv.style.display = 'none';
  document.querySelector('.quote_form').reset();
}