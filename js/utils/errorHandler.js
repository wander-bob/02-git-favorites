import * as elements from './elements.js';

export function displayError(message){
  elements.errorScreen.classList.remove('hide');
  elements.errorScreen.querySelector('h1').innerText = message;
  setTimeout(() => {
    elements.errorScreen.classList.add('hide');
  }, 1500);
};