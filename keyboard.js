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

  _createkeys() {
    const fragment = document.createDocumentFragment();
    const keylayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "space"
    ];

    const createiconshtml = (icon_name) =>{
      return "<i claas = materials-icons><i>${icon_name}</i>";
    };

    keylayout.forEach(key => {
      const keyelement = document.createElement("button");
      const inserlinebreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      //add attributes/clasess
      keyelement.setAttribute("type", "button");
      keyelement.classList.add("keyboard-key");
      

      switch(key){
        case "backspace":
          keyelement.classList.add("keyboard-key-wide");
          keyelement.innerHTML = createiconshtml("backspace");

          break;
      }
    });

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
