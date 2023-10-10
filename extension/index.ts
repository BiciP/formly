// @ts-ignore
import html from "./formly.html"
import css from "./index.css"

type EVENT = 'load'

(function () {
  const wrapper = document.createElement('div')
  wrapper.className = 'formly-wrapper'
  wrapper.innerHTML = html

  const style = document.createElement('style')
  style.innerHTML = css

  document.head.appendChild(style)
  document.body.appendChild(wrapper)

  initializeButton()

  emitEvent('load') // Only emit when we have finished loading :)
})()

function emitEvent(eventName: EVENT) {
  let payload = {
    eventName,
    origin: location.origin
  }

  let request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3000', true);
  request.setRequestHeader('Content-Type', 'text/plain');

  request.send(JSON.stringify(payload));

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log('request.readyState === 4')
      // options && options.callback && options.callback()
    }
  }
}

function initializeButton() {
  let button = document.querySelector(".formly-wrapper button.formly-bubble")
  button?.addEventListener('click', () => {
    console.log('click')
  })
}