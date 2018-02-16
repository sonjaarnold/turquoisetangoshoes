'use strict';

// var intersection = require('lodash.intersection');
// var baguetteBox = require('baguettebox.js');
// require Array.from polyfill !!!

var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
var allShoes = Array.from(document.querySelectorAll('.shoe'));
var checked = {};

Array.prototype.forEach.call(allCheckboxes, function (el) {
  el.addEventListener('change', toggleCheckbox);
});

getChecked('size');
getChecked('heel');
getChecked('color');
setVisibility();

baguetteBox.run('.baguette');

function toggleCheckbox(e) {
  getChecked(e.target.name);
  setVisibility();
}

function getChecked(name) {
  checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
    return el.value;
  });
}

function setVisibility() {
  allShoes.map(function (el) {
    var size = checked.size.length ? intersection(Array.from(el.classList), checked.size).length : true;
    var heel = checked.heel.length ? intersection(Array.from(el.classList), checked.heel).length : true;
    var color = checked.color.length ? intersection(Array.from(el.classList), checked.color).length : true;
    if (size && heel && color) {
      el.style.display = 'inline-block';
    } else {
      el.style.display = 'none';
    }
  });
}
