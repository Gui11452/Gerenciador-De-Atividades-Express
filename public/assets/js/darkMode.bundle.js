/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./frontend/js/darkMode.js ***!
  \*********************************/
(function () {
  var btnDark = document.querySelector('#btn-dark');
  var btnDarkPath = document.querySelector('#btn-dark path');
  var btnLight = document.querySelector('#btn-light');
  var btnLightPath = document.querySelector('#btn-light path');
  var tagHtml = document.querySelector('html');
  var nomeVariavel = localStorage.getItem('darkMode');
  var elementoJS = JSON.parse(nomeVariavel);
  if (elementoJS) {
    var elementoJSON = JSON.stringify(true);
    localStorage.setItem('darkMode', elementoJSON);
    btnDark.classList.add('hidden');
    btnLight.classList.remove('hidden');
    tagHtml.classList.add('dark');
  } else {
    var _elementoJSON = JSON.stringify(false);
    localStorage.setItem('darkMode', _elementoJSON);
    btnDark.classList.remove('hidden');
    btnLight.classList.add('hidden');
    tagHtml.classList.remove('dark');
  }
  document.addEventListener('click', function (e) {
    var el = e.target;
    if (el == btnDark || el == btnDarkPath) {
      var _elementoJSON2 = JSON.stringify(true);
      localStorage.setItem('darkMode', _elementoJSON2);
      btnDark.classList.add('hidden');
      btnLight.classList.remove('hidden');
      tagHtml.classList.add('dark');
    } else if (el == btnLight || el == btnLightPath) {
      var _elementoJSON3 = JSON.stringify(false);
      localStorage.setItem('darkMode', _elementoJSON3);
      btnDark.classList.remove('hidden');
      btnLight.classList.add('hidden');
      tagHtml.classList.remove('dark');
    }
  });
})();
/******/ })()
;
//# sourceMappingURL=darkMode.bundle.js.map