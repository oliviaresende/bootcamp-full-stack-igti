'use strict';

window.addEventListener('load', () => {
  document.querySelector(".red").addEventListener('input', redInput);
  document.querySelector(".green").addEventListener('input', greenInput);
  document.querySelector(".blue").addEventListener('input', blueInput);
});

const redInput = (e) => {
  document.querySelector(".redtext").value = e.target.value;
  color();
}

const greenInput = (e) => {
  document.querySelector(".greentext").value = e.target.value;
  color()
}

const blueInput = (e) => {
  document.querySelector(".bluetext").value = e.target.value;
  color();
}

const color = () => {
  document.querySelector(".square").style.backgroundColor = `rgb(
    ${document.querySelector(".redtext").value},
    ${document.querySelector(".greentext").value},
    ${document.querySelector(".bluetext").value}
    )`;
}