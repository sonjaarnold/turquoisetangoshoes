if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

var allChooseLangButtons = document.querySelectorAll('.choose-lang button');
var allLanguagesTexts = document.querySelectorAll('.language');

if (localStorage.getItem('language') !== null) {
  hideAllLangsShowCurrent(localStorage.getItem('language'));
}

allChooseLangButtons.forEach(function (el) {
  return el.addEventListener('click', handleChooseLangButtonClick);
});

function handleChooseLangButtonClick(e) {
  console.log(e.currentTarget);
  hideAllLangsShowCurrent(e.currentTarget.value);
  localStorage.setItem('language', e.currentTarget.value);
}

function hideAllLangsShowCurrent(currentLanguage) {
  allLanguagesTexts.forEach(function (el) {
    return el.style.display = 'none';
  });
  document.querySelector('.' + currentLanguage).style.display = 'block';
}
