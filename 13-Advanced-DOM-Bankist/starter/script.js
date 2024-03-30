'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////
// APPLICATION

// --- Implementing Smooth Scrolling ---------------------------------
btnScrollTo.addEventListener('click', function (e) {
  // const section1Coords = section1.getBoundingClientRect();
  // console.log(section1Coords);

  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (x/y):', window.scrollX, window.scrollY);
  // console.log(
  //   'height/width viewport:',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  ////////////////////////////////////////////////////////
  // Scrolling to section--1

  // Old way of scrolling:
  // window.scrollTo(
  //   section1Coords.left + window.scrollX,
  //   section1Coords.top + window.scrollY
  // );
  // window.scrollTo({
  //   left: section1Coords.left + window.scrollX,
  //   top: section1Coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // New way of scrolling:
  section1.scrollIntoView({ behavior: 'smooth' });
});

// --- Event Delegation: Implementing Page Navigation ----------------
// This is an inefficient way of implementing smooth navigation for each button:
// document.querySelectorAll('.nav__link').forEach(function (btnNavLink) {
//   btnNavLink.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// More efficient way: using event delegation:
// 1. Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. Determine which element caused the event
  // console.log(e.target);
  // Matching strategy to ignore the rest of the elements that don't interest us
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// --- Building a Tabbed Component------------------------------------

tabsContainer.addEventListener('click', function (e) {
  const clickedTab = e.target.closest('.operations__tab');

  // Guard clause
  if (!clickedTab) return;

  // Remove active clases
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );

  // Activate tab
  clickedTab.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// --- Passing Arguments to Event Handlers ---------------------------
const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const currentLink = event.target;
    const siblingLinks = currentLink
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = currentLink.closest('.nav').querySelector('.nav__logo');

    siblingLinks.forEach(link => {
      if (link !== currentLink) link.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing and "argument" into the handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// --- Implementing a Sticky Navigation: The Scroll Event ------------
// Using the scroll event it's pretty bad for performance, since it calculates a new value
// each time the user scrolls even a little bit in the page.

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// --- A Better Way: The Intersection Observer API -------------------
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   // The root is the element that the target is gonna intersect.
//   // If we pass the value of null, the root will correspond to the entire viewport
//   root: null,
//   // The threshold is the percentage of intersection at which the observer callback function
//   // will be called
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// // We pass the target we want to observe
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// --- Revealing Elements on Scroll ----------------------------------
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// --- Lazy Loading Images -------------------------------------------
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace the value of the src attribute with the value of data-src
  entry.target.setAttribute('src', entry.target.dataset.src);

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

// --- Building a Slider Component -----------------------------------
// We put all the funtionality of the slider component in its own namespace
const slider = function () {
  // Selecting the HTML elements
  const slides = document.querySelectorAll('.slide');
  const btnPrev = document.querySelector('.slider__btn--left');
  const btnNext = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  // Functionality for our slider
  let currentSlide = 0;
  const maxSlides = slides.length;

  const nextSlide = function () {
    if (currentSlide === maxSlides - 1) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
    console.log('Next');
  };

  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlides - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
    console.log('Prev');
  };

  const createDots = function () {
    // <button class="dots__dot dots__dot--active" data-slide="0"></button>
    for (let i = 0; i < slides.length; i++) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    }
  };

  const activateDot = function (slideNum = 0) {
    [...dotContainer.children].forEach(dot =>
      dot.classList.remove('dots__dot--active')
    );
    document
      .querySelector(`.dots__dot[data-slide="${slideNum}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slideNum = 0) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - slideNum)}%)`;
    });
  };

  // Sets the default position of the slides and the dots
  const init = () => {
    goToSlide();
    createDots();
    activateDot();
  };
  init();

  // Event handlers
  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;

    currentSlide = Number(e.target.dataset.slide);
    goToSlide(currentSlide);
    activateDot(currentSlide);
  });
};
slider();

//////////////////////////////////////////////////////////////////////
// LECTURES

/* --- Selecting, Creating, and Deleting Elements --------------------

//////////////////////////////////////////////////////////////////////
// Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
// querySelectorAll() returns a NodeList, that doesn't update if one of its elements changes
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// console.log(document.getElementById('section--1'));

// Both getElementsByTagName and getElementsByClassName return a HTMLCollection. An HTMLCollections
// it's a life collections that automatically changes if one of its elements changes in the DOM
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

//////////////////////////////////////////////////////////////////////
// Creating and inserting elements

// We can create new elements easily and rapidly using the insertAdjacentHTML() method.
// This way of creating methods was discussed in the previous section of the course, but now we will
// explore other ways of creating elements programmatically from scratch

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for functionality and analytics.';
message.innerHTML =
  'We use cookies for functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// A HTML element cannot exist in multiple places at the same time, so only the last orden it's followed.
// As a consequence, we can use the prepend and append methods to move around pre-existing DOM elements.
// header.prepend(message); // This is ignored
header.append(message); // This is applied

// If we really want a copy of the same element in a different place, we can use the cloneNode() method
// header.append(message.cloneNode(true));

// The before and after methods insert an HTML element as a sibling of the element where it's called
// header.before(message);
// header.after(message);

//////////////////////////////////////////////////////////////////////
// Deleting elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // This is the ES6 way of doing it:
    message.remove();
    // Before the remove() method was introduced, we would had to do the following:
    // message.parentElement.removeChild(message);
  }); */

/* --- Styles, Attributes and Classes --------------------------------

//////////////////////////////////////////////////////////////////////
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// The style attribute only returns inline styles, not styles defined in the CSS file
console.log(message.style.color); // <empty string>
console.log(message.style.backgroundColor); // rgb(55, 56, 61)

// If we really want to get the style of an element, we can use the getComputedStyle() function
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//////////////////////////////////////////////////////////////////////
// Attributes
const logo = document.querySelector('.nav__logo');

// Getting the value of standar attributes
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// This doesn't work because designer attribute is a custom attribute
// console.log(logo.designer);
// Instead, we should use the getAttribute() method to get the value of a custom property
console.log(logo.getAttribute('designer'));

// We can also set the values of different attributes
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // Logs the absolute path
console.log(logo.getAttribute('src')); // Logs the relative path

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // Absolute path
console.log(link.getAttribute('href')); // Relative path

//////////////////////////////////////////////////////////////////////
// Data Attributes
console.log(logo.dataset.versionNumber);

//////////////////////////////////////////////////////////////////////
// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// We can also do this, but we shouldn't because it would override the other classes
// logo.className = 'jonas'; */

/* --- Types of Events and Event Handlers ----------------------------
const h1 = document.querySelector('h1');

// Modern way of attaching an event listener to an object:
// Using addEventListener is better, because:
//  - It allows us to add multiple event listeners to the same event.
//  - It allows us to remove an event handler in case we don't need it anymore.
const logWhenH1 = function () {
  // It fires an event every time the mouse enters an element (it's similar to how :hover in CSS works)
  console.log('addEventListener: Great! You are reading a heading!');

  // We can remove the event handler after using it so it just fires once
  // h1.removeEventListener('mouseenter', logWhenH1);
};

h1.addEventListener('mouseenter', logWhenH1);
// We can also remove the event handler after other type of actions occur
// setTimeout(() => {
//   console.log('Three seconds have passed!');
//   h1.removeEventListener('mouseenter', logWhenH1);
// }, 3000);

// Old way of attaching an event listener: element.on[nameOfEvent]
// h1.onclick = function () {
//   console.log('onclick: Great! You are clicking a heading!');
// }; */

/* --- Event Propagation in Practice ---------------------------------
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const random8BitNumber = () => randomInt(0, 255);

const randomColor = () =>
  `rgb(${random8BitNumber()},${random8BitNumber()},${random8BitNumber()})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log(
    `LINK
      target: ${e.target.className}
      currentTarget: ${e.currentTarget.className}`
  );

  // The 'this' keyword inside an event handler is always equal to the currentTarget of the event
  // console.log(this === e.currentTarget); // true

  // To stop the bubbling from continuing, we can use the stopPropagation() method (but in practice
  // this is not recommended)
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(
    `CONTAINER
      target: ${e.target.className}
      currentTarget: ${e.currentTarget.className}`
  );
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(
    `NAV
      target: ${e.target.className}
      currentTarget: ${e.currentTarget.className}`
  );
}); */

/* --- DOM Traversing ------------------------------------------------
const h1 = document.querySelector('h1');

//////////////////////////////////////////////////////////////////////
// Going downwards: selecting child elements.

// Selects all children elements with the specified class, no matter how deeply nested they are
console.log(h1.querySelectorAll('.highlight'));
// Selects all the child nodes of the element, which also includes other things present in the HTML document like
// comments and text (this is not usually used)
console.log(h1.childNodes);
// Selects all the REAL direct children of an element (but not deeply nested children). Returns a live HTMLCollection
// that updates automatically if something changes in the DOM
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

//////////////////////////////////////////////////////////////////////
// Going upwards: selecting parent elements.
console.log(h1.parentNode);
console.log(h1.parentElement);

// The closest() method traverses the element and its parents (heading toward the document root) until it finds a
// node that matches the specified CSS selector.
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//////////////////////////////////////////////////////////////////////
// Going sideways: selecting sibling elements.

// JavaScript only allows us to select the previous or next sibling element/node:
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// If we want to select all the siblings of an element, we need to do this:
console.log(h1.parentElement.children);
// Having all sibling elements on a HTMLCollection, we can work with them like this:
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
}); */

/* --- Lifecycle DOM Events ------------------------------------------
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded!', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// }); */
