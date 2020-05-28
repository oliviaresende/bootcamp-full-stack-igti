'use strict';

window.addEventListener('load', () => {
  document.querySelector(".redRange").addEventListener('input', redInput);
  document.querySelector(".greenRange").addEventListener('input', greenInput);
  document.querySelector(".blueRange").addEventListener('input', blueInput);
});

const redInput = (e) => {
  document.querySelector(".redText").value = e.target.value;
  color();
}

const greenInput = (e) => {
  document.querySelector(".greenText").value = e.target.value;
  color()
}

const blueInput = (e) => {
  document.querySelector(".blueText").value = e.target.value;
  color();
}

const color = () => {
  document.querySelector(".square").style.backgroundColor = `rgb(
    ${document.querySelector(".redText").value},
    ${document.querySelector(".greenText").value},
    ${document.querySelector(".blueText").value}
    )`;
}