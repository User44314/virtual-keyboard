const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    //main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    //setup main elements
    this.elements.main.classList.add("keyboard", "1keyboard-hidden");
    this.elements.keysContainer.classList.add("keyboard-keys");

    //add dom
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  },

  _triggerEvent(handlerName) {
    console.log("event triggered event name:" + handlerName);
  },
  _toggleCapsLock() {
    console.log("caps lock toggled");
  },

  open(initiaValue, oninput, onclose) {

  },

  clolse() {

  }

};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});