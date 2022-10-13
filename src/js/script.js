"use strict";

const header = document.querySelector(".container");
const hiddenSection = document.querySelector(".first-sec");
const imgOptionsCon = document.querySelector(".options-con");
const hiddenOptionsp = document.querySelectorAll(".options-p");
const options = document.querySelectorAll(".options");
const secFourImgs = document.querySelectorAll(".imgsec-4");
const onlineResumeBuilder = document.querySelector(".sec-2-online-resume");
const twoPercentPeople = document.querySelector(".sec-2-word");
const lastWordSecTwo = document.querySelector(".words");
const secondSec = document.querySelector(".second-sec");
const headerNav = document.querySelector(".header-nav");

//----------------- load first header text --------------------------- //
let onlineResumeText = "ONLINE RESUME BUILDER ";

const mystr = "ONLINE RESUME BUILDER ";

let textlength = 0;
let textLengthForRemoval = onlineResumeText.length;

const loadText = function () {
  onlineResumeBuilder.innerHTML =
    onlineResumeText.substring(0, textlength++) + "<span>&nbsp;</span>";

  if (
    textlength++ <= onlineResumeText.length &&
    onlineResumeBuilder.textContent.length !== 0
  )
    setTimeout(loadText, 400);

  if (textlength === onlineResumeText.length) {
    const thisInterval = setInterval(() => {
      onlineResumeBuilder.innerHTML =
        onlineResumeText.slice(0, textlength--) + "<span>&nbsp;</span>";

      if (textlength === 0) {
        clearInterval(thisInterval);
        setTimeout(loadText, 400);
      }
    }, 400);
  }
};
loadText();

//----------------- observer to make sticky header --------------------------- //

const callback = function (entry) {
  const [event] = entry;
  if (event.isIntersecting === false) headerNav.classList.add("sticky");
  else headerNav.classList.remove("sticky");
};

let theOptions = {
  root: null,
  threshold: 0.0,
};
const observer = new IntersectionObserver(callback, theOptions);

observer.observe(header);

const showHiddenSection = function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".show-first-sec");
  if (!clicked) return;
  hiddenSection.classList.toggle("hidden");
};

const hidHiddenSection = function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".show-first-sec");
  if (!clicked) return;
  hiddenSection.classList.add("hidden");
};

const switchImgs = function (event) {
  const othersClicked = event.target.closest(".options");

  if (!othersClicked) return;

  const dataSet = othersClicked.getAttribute("data-set");

  [...hiddenOptionsp].forEach((e) => {
    e.classList.add("hidden-p");
  });

  [...options].forEach((e) => {
    e.classList.add("options-background");
    e.classList.remove("options-background-2");
  });

  [...secFourImgs].forEach((e) => e.classList.add("hid-img"));

  document.querySelector(`.sec-4-img-${dataSet}`).classList.remove("hid-img");

  othersClicked.classList.remove("options-background");
  othersClicked.classList.add("options-background-2");
  othersClicked.querySelector(".options-p").classList.remove("hidden-p");
};

//----------- call functions ---------------------------- //
headerNav.addEventListener("click", showHiddenSection);
// headerNav.addEventListener("click", hidHiddenSection);
// hiddenSection.addEventListener("mouseover", showHiddenSection);

imgOptionsCon.addEventListener("click", switchImgs);
